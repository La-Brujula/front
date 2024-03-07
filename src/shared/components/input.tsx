import React, {
  HTMLInputTypeAttribute,
  ReactElement,
  ReactNode,
  useMemo,
} from 'react';
import { UseFormRegister } from 'react-hook-form';

type InputProps<
  Type extends 'textArea' | 'select' | 'custom' | HTMLInputTypeAttribute,
> = {
  label: string;
  register: UseFormRegister<any>;
  fieldName: string;
  inputClass?: string;
  divClass?: string;
  labelClass?: string;
  required?: boolean;
} & (Type extends 'textArea'
  ? {
      type: 'textArea';
      rows?: number;
    }
  : Type extends 'select'
    ? {
        type: 'select';
        items: { key: string; label: string }[];
      }
    : Type extends 'custom'
      ? {
          type: 'custom';
          component: React.JSX.Element;
        }
      : Type extends HTMLInputTypeAttribute
        ? {
            type: HTMLInputTypeAttribute;
            autoComplete?: string;
          }
        : {});

function buildSelect(props: InputProps<'select'>) {
  return (
    <select
      {...props.register(props.fieldName, { required: props.required })}
      id={props.fieldName}
      className={props.inputClass}
      required={props.required}
    >
      {props.items.map(({ key, label }) => (
        <option
          key={key}
          value={key}
        >
          {label}
        </option>
      ))}
    </select>
  );
}

function buildTextArea(props: InputProps<'textArea'>) {
  return (
    <textarea
      {...props.register(props.fieldName, { required: props.required })}
      id={props.fieldName}
      className={props.inputClass}
      rows={props.rows || 3}
      required={props.required}
    />
  );
}

function buildInput(props: InputProps<HTMLInputTypeAttribute>) {
  return (
    <input
      className={props.inputClass}
      type={props.type}
      {...props.register(props.fieldName, { required: props.required })}
      id={props.fieldName}
      autoComplete={props.autoComplete}
    />
  );
}

export function Input(
  props:
    | InputProps<'textArea'>
    | InputProps<'select'>
    | InputProps<'custom'>
    | InputProps<HTMLInputTypeAttribute>,
) {
  const inputElement: ReactNode = useMemo(() => {
    switch (props.type) {
      case 'textArea':
        return buildTextArea(props as InputProps<'textArea'>);
      case 'select':
        return buildSelect(props as InputProps<'select'>);
      case 'custom':
        return (props as InputProps<'custom'>).component;
      default:
        return buildInput(props);
    }
  }, [props]);

  return (
    <div className={['flex flex-col gap-2', props.divClass].join(' ')}>
      <label
        htmlFor={props.fieldName}
        className={props.labelClass}
      >
        {props.label}
        {props.required && ' *'}
      </label>
      {inputElement}
    </div>
  );
}
