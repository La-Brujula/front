import React from 'react';

import { useTranslation } from 'react-i18next';

// t('timeout exceeded')
// t('Network Error')

export function ErrorMessage(props: { message: string }) {
  const { t } = useTranslation('errors');
  return (
    <div className="w-full max-w-[100vw] rounded-md bg-amber-300 px-8 py-4">
      <p className="w-full text-sm font-bold text-black">{t(props.message)}</p>
    </div>
  );
}

export default React.memo(ErrorMessage);
