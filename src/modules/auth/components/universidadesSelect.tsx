import { FieldValues, Path, UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import Input from '@/shared/components/input';

import universidades from '@shared/constants/universidades.json';

export function UniversidadesSelect<T extends FieldValues>(props: {
  form: UseFormReturn<T>;
  fieldName: Path<T>;
  placeholder?: string;
  label?: string;
}) {
  const { t } = useTranslation('auth');
  return (
    <Input
      type="select"
      fieldName={props.fieldName}
      form={props.form}
      label={props.label}
      items={universidades.map((uni) => ({ value: uni, label: uni }))}
      placeholder={props.placeholder || t('Seleccione una opción')}
    />
  );
}
