import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { HTMLInputTypeAttribute, useMemo } from 'react';
import {
  FieldError,
  FieldPath,
  FieldValues,
  Path,
  PathValue,
  UseFormRegister,
  UseFormRegisterReturn,
  UseFormSetValue,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import PhoneInput, { Country } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

// t(errors:invalid_enum_value)
// t(errors:invalid_type)
// t(errors:invalid_string)

type InputProps<
  Type extends
    | 'textArea'
    | 'select'
    | 'groupedSelect'
    | 'custom'
    | 'radioGroup'
    | HTMLInputTypeAttribute,
  AssignedFormFields extends FieldValues,
> = {
  type: Type;
  label: string;
  register: UseFormRegister<AssignedFormFields>;
  fieldName: FieldPath<AssignedFormFields>;
  inputClass?: string;
  divClass?: string;
  labelClass?: string;
  required?: boolean;
  error?: FieldError;
  helperText?: string;
  hiddenLabel?: boolean;
} & (Type extends 'textArea'
  ? React.TextareaHTMLAttributes<HTMLTextAreaElement>
  : Type extends 'select'
    ? {
        items: { key: string; label: string; className?: string }[];
      } & React.SelectHTMLAttributes<HTMLSelectElement>
    : Type extends 'groupedSelect'
      ? {
          value: string;
          groupedItems: { [k: string]: { key: string; label: string }[] };
        }
      : Type extends 'radioGroup'
        ? {
            items: {
              label: string;
              value: PathValue<
                AssignedFormFields,
                FieldPath<AssignedFormFields>
              >;
            }[];
            setValue: UseFormSetValue<AssignedFormFields>;
          }
        : Type extends 'custom'
          ?
              | {
                  component: React.FunctionComponent<
                    | {
                        register: UseFormRegister<AssignedFormFields>;
                        fieldName: Path<AssignedFormFields>;
                      }
                    | { [k: string]: any }
                  >;
                }
              | { [k: string]: any }
          : Type extends 'tel'
            ? { country?: Country; value?: string }
            : Type extends HTMLInputTypeAttribute
              ? {
                  maxLength?: number;
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
  'setValue',
];
function buildGroupedSelect<T extends FieldValues>(
  props: InputProps<'groupedSelect', T>,
  registerReturn: UseFormRegisterReturn
) {
  return (
    <FormControl size="small">
      <InputLabel>{props.label}</InputLabel>
      <Select
        {...registerReturn}
        id={props.fieldName}
        className={props.inputClass}
        value={props.value}
        label={props.label}
      >
        {Object.entries(props.groupedItems).map(([group, items]) => (
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
        ))}
      </Select>
    </FormControl>
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
      defaultValue=""
    >
      <option
        value=""
        disabled
      >
        Selecciona una opción
      </option>
      {props.items.map(({ key, label, className }) => (
        <option
          key={key}
          value={key}
          className={className}
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
      rows={props.rows ?? 3}
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
  registerReturn: UseFormRegisterReturn
) {
  return (
    <div className="flex flex-row flex-wrap gap-4 items-stretch md:items-center justify-center">
      {props.items.map((item) => {
        return (
          <div
            key={`${props.fieldName}-${item.value}`}
            className="has-[*:checked]:bg-primary has-[*:checked]:!text-white relative w-fit rounded-md border-2 border-primary text-primary cursor-pointer flex items-center justify-center py-2 px-4"
          >
            <input
              {...props.register(props.fieldName, {
                required: props.required,
                onChange: (ev) => {
                  props.setValue(props.fieldName, ev.target.value, {
                    shouldDirty: true,
                    shouldTouch: true,
                    shouldValidate: true,
                  });
                },
              })}
              id={`${props.fieldName}-${item.value}`}
              type="radio"
              className="absolute w-full h-full cursor-pointer opacity-0"
              value={item.value}
            />
            <span>{item.label}</span>
          </div>
        );
      })}
    </div>
  );
}

type InputTypes =
  | 'textArea'
  | 'select'
  | 'groupedSelect'
  | 'radioGroup'
  | 'custom'
  | HTMLInputTypeAttribute;

function Input<F extends InputTypes, T extends FieldValues>(
  props: InputProps<F, T>
) {
  const { t } = useTranslation('errors');

  const registerReturn = useMemo(
    () => props.register(props.fieldName),
    [props.register, props.fieldName, props.required]
  );

  let inputElement = useMemo(() => {
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
          registerReturn
        );
      case 'custom':
        const CustomElement = (props as InputProps<'custom', T>).component;
        return <CustomElement {...props} />;
      case 'tel':
        return (
          <PhoneInput
            defaultCountry={(props as InputProps<'tel', T>)?.country}
            {...props}
            {...registerReturn}
            value=""
            international={true}
            withCountryCallingCode={true}
            onChange={(value) => {
              registerReturn.onChange({ target: { value } });
            }}
          />
        );
      default:
        return buildInput(
          {
            ...props,
            inputClass: [props.inputClass, 'w-full'].join(' '),
          } as InputProps<HTMLInputTypeAttribute, T>,
          registerReturn
        );
    }
  }, [props, registerReturn]);

  return (
    <div
      className={['flex flex-col gap-2 text-left', props.divClass].join(' ')}
    >
      {!props.hiddenLabel && (
        <label
          htmlFor={props.fieldName}
          className={[
            props.labelClass,
            props.required !== true && ' opacity-80 font-normal',
            props.error !== undefined && ' text-red-500',
          ].join(' ')}
        >
          {props.label}
          {props.required && ' *'}
        </label>
      )}
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
