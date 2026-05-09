'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faCircle, faUser } from '@fortawesome/free-solid-svg-icons';
import { io } from 'socket.io-client';
import toast from 'react-hot-toast';

let socket;

export default function ChatRoom({ onClose }) {
  const t = useTranslations();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [onlineUsers, setOnlineUsers] = useState(0);
  const messagesEndRef = useRef(null);
  const [username] = useState(`User_${Math.random().toString(36).substr(2, 5)}`);

  useEffect(() => {
    socketInitializer();
    return () => {
      if (socket) socket.disconnect();
    };
  }, []);

  const socketInitializer = async () => {
    await fetch('/api/chat/socket');
    
    socket = io({
      path: '/api/chat/socket',
    });

    socket.on('connect', () => {
      console.log('Connected to chat');
    });

    socket.on('message', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on('onlineUsers', (count) => {
      setOnlineUsers(count);
    });
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const messageData = {
      sender: username,
      message: newMessage,
      timestamp: new Date().toISOString(),
    };

    socket.emit('sendMessage', messageData);
    setNewMessage('');
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-primary-500 text-white p-4 flex items-center justify-between">
        <div>
          <h3 className="font-heading font-bold">{t('chat.title')}</h3>
          <div className="flex items-center gap-2 text-sm text-white/80">
            <FontAwesomeIcon icon={faCircle} className="text-green-400 text-xs" />
            <span>{onlineUsers} {t('chat.online')}</span>
          </div>
        </div>
        <button onClick={onClose} className="text-white/80 hover:text-white">
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 && (
          <p className="text-center text-stone-400 py-8">
            {t('chat.no_messages')}
          </p>
        )}
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex gap-2 ${msg.sender === username ? 'justify-end' : ''}`}
          >
            {msg.sender !== username && (
              <div className="w-8 h-8 bg-stone-200 rounded-full flex items-center justify-center">
                <FontAwesomeIcon icon={faUser} className="text-stone-500 text-xs" />
              </div>
            )}
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                msg.sender === username
                  ? 'bg-primary-500 text-white'
                  : 'bg-stone-100'
              }`}
            >
              <p className="text-xs font-medium mb-1">
                {msg.sender === username ? 'You' : msg.sender}
              </p>
              <p className="text-sm">{msg.message}</p>
              <p className="text-xs mt-1 opacity-70">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={sendMessage} className="p-4 border-t border-stone-200">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder={t('chat.type_message')}
            className="input-field flex-1"
          />
          <button type="submit" className="btn-primary px-4">
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </div>
      </form>
    </div>
  );
}