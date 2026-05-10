

import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_change_me';

// ==================== PASSWORDS ====================
export async function hashPassword(password) {
  const salt = await bcrypt.genSalt(12);
  return bcrypt.hash(password, salt);
}

export async function comparePassword(password, hashedPassword) {
  return bcrypt.compare(password, hashedPassword);
}

// ==================== TOKENS ====================
export function generateToken(payload, role) {
  return jwt.sign(
    { 
      ...payload,
      role,
      iat: Math.floor(Date.now() / 1000),
    }, 
    JWT_SECRET, 
    { expiresIn: '7d' }
  );
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

// ==================== MIDDLEWARE ====================
export function getTokenFromRequest(request) {
  const authHeader = request.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }
  return null;
}

export function authenticateUser(request) {
  const token = getTokenFromRequest(request);
  if (!token) return null;
  
  const decoded = verifyToken(token);
  return decoded;
}

// ==================== RÔLES ====================
export const ROLES = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  PRESIDENT: 'PRESIDENT',
  ADMIN: 'ADMIN',
  MEMBER: 'MEMBER',
  VISITOR: 'VISITOR',
};

// Hiérarchie des rôles (du plus puissant au moins puissant)
export const ROLE_HIERARCHY = [
  ROLES.SUPER_ADMIN,
  ROLES.PRESIDENT,
  ROLES.ADMIN,
  ROLES.MEMBER,
  ROLES.VISITOR,
];

export function hasMinimumRole(userRole, requiredRole) {
  const userIndex = ROLE_HIERARCHY.indexOf(userRole);
  const requiredIndex = ROLE_HIERARCHY.indexOf(requiredRole);
  return userIndex <= requiredIndex;
}

// Vérifier si un utilisateur peut accéder à une ressource
export function canAccess(userRole, requiredRoles) {
  const roles = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles];
  return roles.some(role => hasMinimumRole(userRole, role));
}

// ==================== GUARDS ====================
export function requireAuth(request) {
  const user = authenticateUser(request);
  if (!user) {
    throw new Error('AUTH_REQUIRED');
  }
  return user;
}

export function requireRole(request, allowedRoles) {
  const user = requireAuth(request);
  const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
  
  if (!roles.includes(user.role)) {
    throw new Error(`ACCESS_DENIED: Required role: ${roles.join(' or ')}`);
  }
  
  return user;
}

export function requireMinimumRole(request, requiredRole) {
  const user = requireAuth(request);
  
  if (!hasMinimumRole(user.role, requiredRole)) {
    throw new Error(`ACCESS_DENIED: Minimum role required: ${requiredRole}`);
  }
  
  return user;
}

// ==================== PERMISSIONS ====================
export const PERMISSIONS = {
  [ROLES.SUPER_ADMIN]: [
    'manage_users', 'manage_roles', 'manage_articles', 'manage_activities',
    'manage_events', 'manage_comments', 'manage_chat', 'manage_settings',
    'view_dashboard', 'view_reports', 'publish_official', 'delete_content',
    'moderate_all', 'manage_system', 'manage_media', 'manage_security',
  ],

  [ROLES.PRESIDENT]: [
    'publish_official', 'manage_activities', 'manage_events',
    'view_dashboard', 'view_reports', 'manage_members', 'participate_chat',
    'manage_institution', 'read_all', 'manage_media',
  ],

  [ROLES.ADMIN]: [
    'manage_articles', 'manage_activities', 'manage_events',
    'moderate_comments', 'manage_media', 'manage_community',
    'participate_chat', 'read_all', 'create_content',
  ],

  [ROLES.MEMBER]: [
    'read_content', 'write_comments', 'participate_chat',
    'update_profile', 'interact_content', 'view_public',
  ],

  [ROLES.VISITOR]: [
    'view_public', 'read_content',
  ],
};

export function hasPermission(userRole, permission) {
  const rolePermissions = PERMISSIONS[userRole] || [];
  return rolePermissions.includes(permission);
}

export function requirePermission(request, permission) {
  const user = authenticateUser(request);
  if (!user) {
    throw new Error('AUTH_REQUIRED');
  }
  
  if (!hasPermission(user.role, permission)) {
    throw new Error(`PERMISSION_DENIED: ${permission}`);
  }
  
  return user;
}

// ==================== REDIRECTIONS PAR RÔLE ====================
export function getDashboardRoute(role) {
  const dashboardRoutes = {
    [ROLES.SUPER_ADMIN]: '/admin/super-admin',
    [ROLES.PRESIDENT]: '/admin/super-admin',
    [ROLES.ADMIN]: '/admin/executive',
    [ROLES.MEMBER]: '/admin/volunteer',
    [ROLES.VISITOR]: '/',
  };
  
  return dashboardRoutes[role] || '/';
}
