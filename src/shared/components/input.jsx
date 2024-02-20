export function Input({
  type,
  label,
  register,
  fieldname,
  autocomplete,
  inputClass,
  divClass,
  labelClass,
}) {
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
