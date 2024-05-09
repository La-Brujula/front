import React, { HTMLInputTypeAttribute, useMemo } from 'react';
import {
  FieldError,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
  UseFormRegisterReturn,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';

type InputProps<
  Type extends
    | 'textArea'
    | 'select'
    | 'groupedSelect'
    | 'custom'
    | 'radioGroup'
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
        : Type extends 'radioGroup'
          ? {
              type: 'radioGroup';
              items: { label: string; value: string }[];
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
function buildRadioGroup<T extends FieldValues>(
  props: InputProps<'radioGroup', T>,
  register: UseFormRegister<T>
) {
  const allowedProps = Object.fromEntries(
    Object.entries(props).filter(
      ([k, _]) => k == 'type' || !internalProps.includes(k)
    )
  );
  return (
    <fieldset className="flex flex-row flex-wrap gap-4 items-stretch md:items-center justify-center mb-4">
      {props.items.map((item) => (
        <div
          className="relative w-fit rounded-md ring-2 ring-primary
        text-primary has-[:checked]:bg-primary has-[:checked]:text-white
        flex items-center justify-center py-2 px-4"
        >
          <input
            className="absolute h-full w-full cursor-pointer opacity-0"
            {...allowedProps}
            type="radio"
            value={item.value}
            id={props.fieldName + item.label}
            {...register(props.fieldName)}
          />
          <label htmlFor={item.value}>{item.label}</label>
        </div>
      ))}
    </fieldset>
  );
}

function Input<T extends FieldValues>(
  props:
    | InputProps<'textArea', T>
    | InputProps<'select', T>
    | InputProps<'groupedSelect', T>
    | InputProps<'radioGroup', T>
    | InputProps<'custom', T>
    | InputProps<HTMLInputTypeAttribute, T>
) {
  const { t } = useTranslation('errors');
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
      case 'radioGroup':
        return buildRadioGroup(
          props as InputProps<'radioGroup', T>,
          props.register
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
        className={
          props.labelClass ||
          '' + (props.error !== undefined && ' text-red-500')
        }
      >
        {props.label}
        {props.required && ' *'}
      </label>
      {inputElement}
      {props.error !== undefined && (
        <p className="text-red-500">{t(props.error.message || '')}</p>
      )}
    </div>
  );
}

export default Input;
