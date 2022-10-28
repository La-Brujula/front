export const ButtonSelect = ({ fieldName, values, labels , setValue, getValue }) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-center mb-4">
      {values.map((value, i) => (
        <button
          key={value}
          className={[
            'outline outline-primary outline-1 px-8 py-4 rounded-lg cursor-pointer',
            getValue(fieldName) == value
              ? 'bg-primary text-white'
              : 'bg-transparent text-primary',
          ].join(' ')}
          onClick={(ev) => {
            setValue(fieldName, value, {
              shouldDirty: true,
              shouldTouch: true,
              shouldValidate: true,
            });
            ev.preventDefault();
          }}
        >
          {labels[i]}
        </button>
      ))}
    </div>
  );
};
