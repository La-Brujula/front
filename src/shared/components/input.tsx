import { HTMLInputTypeAttribute } from 'react';
import { UseFormRegister } from 'react-hook-form';

export function Input(props: {
  type: 'textarea' | HTMLInputTypeAttribute;
  label: string;
  register: UseFormRegister<any>;
  fieldname: string;
  autocomplete?: string;
  inputClass?: string;
  divClass?: string;
  labelClass?: string;
}) {
  const {
    type,
    label,
    register,
    fieldname,
    autocomplete,
    inputClass,
    divClass,
    labelClass,
  } = props;
  return (
    <div className={['flex flex-col gap-2', divClass].join(' ')}>
      <label
        htmlFor={fieldname}
        className={labelClass}
      >
        {label}
      </label>
      {type == 'textarea' ? (
        <textarea
          {...register(fieldname)}
          id={fieldname}
          autoComplete={autocomplete}
          className={inputClass}
          rows={3}
        />
      ) : (
        <input
          className={inputClass}
          type={type}
          {...register(fieldname)}
          id={fieldname}
          autoComplete={autocomplete}
        />
      )}
    </div>
  );
}
