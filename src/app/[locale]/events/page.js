

import { useTranslations } from 'next-intl';

export default function EventsPage() {
  const t = useTranslations();
  
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-heading font-bold mb-8">
          {t('common.events')}
        </h1>
        <p className="text-stone-600">
          Aucun événement pour le moment.
        </p>
      </div>
    </div>
  );
}
