import {
  FormControl,
  InputLabel,
  ListSubheader,
  MenuItem,
  Select,
} from '@mui/material';
import React, { HTMLInputTypeAttribute, useMemo } from 'react';
import {
  FieldError,
  FieldValues,
  Path,
  RegisterOptions,
  SetFieldValue,
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
  helperText?: string;
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
          items: { key: string; label: string; className?: string }[];
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
              setValue: SetFieldValue<FormFields>;
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
  const options = useMemo(
    () =>
      Object.entries(props.groupedItems).map(([group, items]) => (
        <>
          {/* <ListSubheader>{group}</ListSubheader> */}
          {items.map(({ key, label }) => (
            <MenuItem
              key={key}
              value={key}
            >
              {label}
            </MenuItem>
          ))}
        </>
      )),
    [props.groupedItems]
  );
  return (
    <FormControl size="small">
      <InputLabel>{props.label}</InputLabel>
      <Select
        {...registerReturn}
        id={props.fieldName}
        className={props.inputClass}
        required={props.required}
        value={props.value}
        label={props.label}
      >
        {options}
      </Select>
    </FormControl>
  );
}

function buildSelect<T extends FieldValues>(
  props: InputProps<'select', T>,
  registerReturn: UseFormRegisterReturn
) {
  const options = useMemo(
    () =>
      props.items.map(({ key, label, className }) => (
        <MenuItem
          key={key}
          value={key}
          className={className}
        >
          {label}
        </MenuItem>
      )),
    [props.items]
  );
  return (
    <FormControl size="small">
      <InputLabel>{props.label}</InputLabel>
      <Select
        {...registerReturn}
        id={props.fieldName}
        className={props.inputClass}
        required={props.required}
        value={props.value}
        label={props.label}
      >
        {options}
      </Select>
    </FormControl>
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

const radioGroupInvalidProps = [...internalProps, 'type', 'items', 'error'];
function buildRadioGroup<T extends FieldValues>(
  props: InputProps<'radioGroup', T>,
  setValue: SetFieldValue<T>
) {
  const allowedProps = Object.fromEntries(
    Object.entries(props).filter(
      ([k, _]) => !radioGroupInvalidProps.includes(k)
    )
  );
  return (
    <div className="flex flex-row flex-wrap gap-4 items-stretch md:items-center justify-center mb-4">
      {props.items.map((item, i) => (
        <div
          className="relative w-fit rounded-md ring-2 ring-primary
        text-primary has-[:checked]:bg-primary has-[:checked]:text-white
        flex items-center justify-center py-2 px-4"
          key={item.value}
        >
          <input
            className="absolute h-full w-full cursor-pointer opacity-0"
            {...allowedProps}
            type="radio"
            value={item.value}
            id={props.fieldName + item.label}
            name={props.fieldName}
            onClick={() => setValue(props.fieldName, item.value)}
          />
          <label htmlFor={props.fieldName + item.label}>{item.label}</label>
        </div>
      ))}
    </div>
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
          (props as InputProps<'radioGroup', T>).setValue
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
      {props.helperText !== undefined && props.error === undefined && (
        <p className="text-xs">{props.helperText}</p>
      )}
      {props.error !== undefined && (
        <p className="text-red-500">{t(props.error.message || '')}</p>
      )}
    </div>
  );
}

export default Input;
