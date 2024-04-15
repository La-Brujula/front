// t('errors:AE01')
// t('errors:AE02')
// t('errors:AE03')
// t('errors:AE04')
// t('errors:AE05')
// t('errors:AE06')
// t('errors:AE07')
// t('errors:AE08')
// t('errors:AE09')
// t('errors:AE10')
// t('errors:AE11')
// t('errors:PE01')
// t('errors:PE02')
// t('errors:PE03')
// t('errors:PE04')
// t('errors:AE05')
// t('errors:AE06')

import { Translation } from 'react-i18next';

export function translateError(errorCode: string) {
  return <Translation ns="errors">{(t) => t(errorCode)}</Translation>;
}
