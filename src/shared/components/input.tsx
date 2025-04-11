import React, { HTMLInputTypeAttribute, useMemo } from 'react';

import { ChevronsUpDownIcon } from 'lucide-react';
import {
  ControllerRenderProps,
  FieldError,
  FieldPath,
  FieldValues,
  PathValue,
  UseFormReturn,
} from 'react-hook-form';
import PhoneInput, { Country } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input as InputComponent } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';

// t(errors:invalid_enum_value)
// t(errors:invalid_type)
// t(errors:invalid_string)

type InputProps<
  Type extends
    | 'textArea'
    | 'select'
    | 'custom'
    | 'radioGroup'
    | HTMLInputTypeAttribute,
  AssignedFormFields extends FieldValues,
> = {
  type: Type;
  label?: string;
  form: UseFormReturn<AssignedFormFields>;
  fieldName: FieldPath<AssignedFormFields>;
  inputClass?: string;
  divClass?: string;
  labelClass?: string;
  required?: boolean;
  error?: FieldError;
  helperText?: string;
  hiddenLabel?: boolean;
  placeholder?: string;
} & (Type extends 'select'
  ? {
      items: {
        label: string;
        value: string;
      }[];
    }
  : Type extends 'radioGroup'
    ? {
        items: {
          label: string;
          value: PathValue<AssignedFormFields, FieldPath<AssignedFormFields>>;
        }[];
      }
    : Type extends 'tel'
      ? { country?: Country }
      : Type extends HTMLInputTypeAttribute
        ? {
            maxLength?: number;
            autoComplete?: string;
          }
        : {});

function buildSelect<T extends FieldValues>(props: InputProps<'select', T>) {
  return (field: ControllerRenderProps<T>) => (
    <Select
      onValueChange={field.onChange}
      defaultValue={field.value}
    >
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder={props.placeholder} />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {props.items.map(({ value, label }) => (
          <SelectItem
            key={value}
            value={value}
          >
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function buildTextArea<T extends FieldValues>(
  props: InputProps<'textArea', T>
) {
  return (field: ControllerRenderProps<T>) => (
    <Textarea
      id={props.fieldName}
      placeholder={props.placeholder}
      {...field}
    />
  );
}

function buildInput<T extends FieldValues>(
  props: InputProps<HTMLInputTypeAttribute, T>
) {
  return (field: ControllerRenderProps<T>) => (
    <InputComponent
      {...field}
      type={props.type}
      id={props.fieldName}
    />
  );
}

function buildTelInput<T extends FieldValues>(props: InputProps<'tel', T>) {
  return (field: ControllerRenderProps<T>) => (
    <PhoneInput
      defaultCountry={props.country}
      value={field.value}
      international={true}
      withCountryCallingCode={true}
      onChange={(value) => {
        field.onChange({ target: { value } });
      }}
    />
  );
}

function buildSwitchInput<T extends FieldValues>() {
  return (field: ControllerRenderProps<T>) => (
    <div className="">
      <Switch
        checked={field.value}
        onCheckedChange={field.onChange}
      />
    </div>
  );
}

function buildRadioGroup<T extends FieldValues>(
  props: InputProps<'radioGroup', T>
) {
  return (field: ControllerRenderProps<T>) => (
    <RadioGroup
      onValueChange={field.onChange}
      defaultValue={field.value}
    >
      {props.items.map((item) => (
        <FormItem
          key={`${props.fieldName}-${item.value}`}
          className="relative flex w-fit cursor-pointer items-center justify-center rounded-md border-2 border-primary px-4 py-2 text-primary has-[*:checked]:bg-primary has-[*:checked]:!text-white"
        >
          <FormControl>
            <RadioGroupItem value={item.value} />
          </FormControl>
          <FormLabel>{item.label}</FormLabel>
        </FormItem>
      ))}
    </RadioGroup>
  );
}

type InputTypes =
  | 'textArea'
  | 'select'
  | 'groupedSelect'
  | 'radioGroup'
  | 'custom'
  | 'switch'
  | HTMLInputTypeAttribute;

function Input<F extends InputTypes, T extends FieldValues>(
  props: InputProps<F, T>
) {
  let inputElement = useMemo(() => {
    switch (props.type) {
      case 'textArea':
        return buildTextArea(props as InputProps<'textArea', T>);
      case 'select':
        return buildSelect(props as InputProps<'select', T>);
      case 'radioGroup':
        return buildRadioGroup(props as InputProps<'radioGroup', T>);
      case 'tel':
        return buildTelInput(props as InputProps<'tel', T>);
      case 'switch':
        return buildSwitchInput<T>();
      default:
        return buildInput({
          ...props,
          inputClass: [props.inputClass, 'w-full'].join(' '),
        } as InputProps<HTMLInputTypeAttribute, T>);
    }
  }, [props]);

  return (
    <FormField
      control={props.form.control}
      name={props.fieldName}
      render={({ field }) => (
        <FormItem>
          {!!props.label && !props.hiddenLabel && (
            <FormLabel>
              {props.label} {props.required && ' *'}
            </FormLabel>
          )}
          <FormControl>{inputElement(field)}</FormControl>
          {props.helperText !== undefined && (
            <FormDescription>{props.helperText}</FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    ></FormField>
  );
}

export default Input;
