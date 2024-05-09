import { FieldValues, Path, UseFormRegister } from 'react-hook-form';
import Input from './input';

export function ButtonSelect<T extends FieldValues>(props: {
  register: UseFormRegister<T>;
  fieldName: Path<T>;
  items: { value: any; label: string }[];
  buttonDivClass?: string;
}) {
  return (
    <div
      className={[
        'flex flex-row flex-wrap gap-4',
        'items-stretch md:items-center justify-center mb-4',
        props.buttonDivClass,
      ].join(' ')}
    >
      {props.items.map(({ value, label }) => (
        <Input
          key={value}
          type="radio"
          register={props.register}
          fieldName={props.fieldName}
          value={value}
          label={label}
          divClass="relative w-fit rounded-md ring-2 ring-primary
          text-primary has-[:checked]:bg-primary has-[:checked]:text-white
          flex items-center justify-center py-2 px-4"
          inputClass="absolute h-full w-full cursor-pointer opacity-0"
        />
      ))}
    </div>
  );
}
