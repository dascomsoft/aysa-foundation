

import { useTranslations } from 'next-intl';

export default function ActivitiesPage() {
  const t = useTranslations();
  
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-heading font-bold mb-8">
          {t('activities.title')}
        </h1>
        <p className="text-stone-600">
          {t('activities.no_activities')}
        </p>
      </div>
    </div>
  );
}
