import React from 'react';
import { useTranslation } from 'react-i18next';

export function ErrorMessage(props: { message: string }) {
  console.log(props.message);

  const { t } = useTranslation('errors');
  return (
    <div className="bg-amber-300 px-8 py-4 rounded-md w-full max-w-[100vw]">
      <p className="w-full text-sm text-black font-bold">{t(props.message)}</p>
    </div>
  );
}

export default React.memo(ErrorMessage);
