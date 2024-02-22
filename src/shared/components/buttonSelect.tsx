import { useState } from 'react';
import { UseFormGetValues, UseFormSetValue } from 'react-hook-form';

export const ButtonSelect = ({
  fieldName,
  values,
  labels,
  setValue,
  getValue,
  classname,
  itemClassname,
  onClick,
}: {
  fieldName: string;
  values: any[];
  labels: string[];
  setValue: UseFormSetValue<any>;
  getValue: UseFormGetValues<any>;
  classname?: string;
  itemClassname?: string;
  onClick?: (ev: any) => void;
}) => {
  const [currValue, forceRerender] = useState(getValue(fieldName));

  return (
    <div
      className={[
        'flex flex-col md:flex-row flex-wrap gap-4',
        'items-stretch md:items-center justify-center mb-4',
        classname,
      ].join(' ')}
    >
      {values.map((value, i) => (
        <div
          key={value}
          className={[
            'outline outline-primary outline-1 px-8 py-4 rounded-lg cursor-pointer',
            itemClassname,
            currValue == value
              ? 'bg-primary text-white'
              : 'bg-transparent text-primary',
          ].join(' ')}
          onClick={
            (onClick !== undefined &&
              ((ev) => {
                onClick(ev);
                forceRerender(value);
              })) ||
            ((ev) => {
              setValue(fieldName, value, {
                shouldDirty: true,
                shouldTouch: true,
                shouldValidate: true,
              });
              ev.preventDefault();
              forceRerender(value);
            })
          }
        >
          {labels[i]}
        </div>
      ))}
    </div>
  );
};
