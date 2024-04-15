import React, { HTMLInputTypeAttribute, useMemo } from 'react';
import {
  FieldError,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
  UseFormRegisterReturn,
} from 'react-hook-form';

type InputProps<
  Type extends
    | 'textArea'
    | 'select'
    | 'groupedSelect'
    | 'custom'
    | HTMLInputTypeAttribute,
  FormFields extends FieldValues,
> = {
  label: string;
  register: UseFormRegister<FormFields>;
  fieldName: Path<FormFields>;
  inputClass?: string;
  divClass?: string;
  labelClass?: string;
  required?: boolean;
  error?: FieldError;
} & RegisterOptions &
  (Type extends 'textArea'
    ? {
        type: 'textArea';
        rows?: number;
        maxLength: number;
      }
    : Type extends 'select'
      ? {
          type: 'select';
          items: { key: string; label: string }[];
        }
      : Type extends 'groupedSelect'
        ? {
            type: 'groupedSelect';
            groupedItems: { [k: string]: { key: string; label: string }[] };
          }
        : Type extends 'custom'
          ?
              | {
                  type: 'custom';
                  component: React.FunctionComponent<
                    | {
                        register: UseFormRegister<FormFields>;
                        fieldName: Path<FormFields>;
                      }
                    | { [k: string]: any }
                  >;
                }
              | { [k: string]: any }
          : Type extends HTMLInputTypeAttribute
            ? {
                maxLength?: number;
                type: HTMLInputTypeAttribute;
                autoComplete?: string;
              } & React.DetailedHTMLProps<
                React.InputHTMLAttributes<HTMLInputElement>,
                HTMLInputElement
              >
            : {});

const internalProps = [
  'label',
  'register',
  'fieldName',
  'inputClass',
  'divClass',
  'labelClass',
  'required',
];
function buildGroupedSelect<T extends FieldValues>(
  props: InputProps<'groupedSelect', T>,
  registerReturn: UseFormRegisterReturn
) {
  return (
    <select
      {...registerReturn}
      id={props.fieldName}
      className={props.inputClass}
      required={props.required}
      defaultValue=""
    >
      <option
        value=""
        unselectable="on"
      >
        {props.label}
      </option>
      {Object.entries(props.groupedItems).map(([group, items]) => (
        <optgroup
          key={group}
          label={group}
        >
          {items.map(({ key, label }) => (
            <option
              key={key}
              value={key}
            >
              {label}
            </option>
          ))}
        </optgroup>
      ))}
    </select>
  );
}

function buildSelect<T extends FieldValues>(
  props: InputProps<'select', T>,
  registerReturn: UseFormRegisterReturn
) {
  return (
    <select
      {...registerReturn}
      id={props.fieldName}
      className={props.inputClass}
      required={props.required}
      defaultValue=""
    >
      <option
        value=""
        unselectable="on"
      >
        {props.label}
      </option>
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

function buildTextArea<T extends FieldValues>(
  props: InputProps<'textArea', T>,
  registerReturn: UseFormRegisterReturn
) {
  return (
    <textarea
      id={props.fieldName}
      className={props.inputClass}
      rows={props.rows || 3}
      required={props.required}
      {...registerReturn}
    />
  );
}

function buildInput<T extends FieldValues>(
  props: InputProps<HTMLInputTypeAttribute, T>,
  registerReturn: UseFormRegisterReturn
) {
  const allowedProps = Object.fromEntries(
    Object.entries(props).filter(([k, _]) => !internalProps.includes(k))
  );
  return (
    <input
      className={props.inputClass}
      {...allowedProps}
      id={props.fieldName}
      {...registerReturn}
    />
  );
}

function Input<T extends FieldValues>(
  props:
    | InputProps<'textArea', T>
    | InputProps<'select', T>
    | InputProps<'groupedSelect', T>
    | InputProps<'custom', T>
    | InputProps<HTMLInputTypeAttribute, T>
) {
  const registerReturn = useMemo(
    () => props.register(props.fieldName, props),
    [props]
  );
  const inputElement = useMemo(() => {
    switch (props.type) {
      case 'textArea':
        return buildTextArea(
          props as InputProps<'textArea', T>,
          registerReturn
        );
      case 'select':
        return buildSelect(props as InputProps<'select', T>, registerReturn);
      case 'groupedSelect':
        return buildGroupedSelect(
          props as InputProps<'groupedSelect', T>,
          registerReturn
        );
      case 'custom':
        const CustomElement = (props as InputProps<'custom', T>).component;
        return <CustomElement {...props} />;
      default:
        return buildInput(
          props as InputProps<HTMLInputTypeAttribute, T>,
          registerReturn
        );
    }
  }, [props]);

  return (
    <div
      className={['flex flex-col gap-2 text-left', props.divClass].join(' ')}
    >
      <label
        htmlFor={props.fieldName}
        className={props.labelClass}
      >
        {props.label}
        {props.required && ' *'}
      </label>
      {inputElement}
      {props.error !== undefined && (
        <p className="text-red-500 font-bold">{props.error.message}</p>
      )}
    </div>
  );
}

export default Input;
