import { HTMLInputTypeAttribute, useReducer } from 'react';

import { XIcon } from 'lucide-react';
import { FieldValues, Path, PathValue, UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';
import Input from '@/shared/components/input';

type ReducerAction =
  | {
      type: 'add';
      field: string;
    }
  | {
      type: 'remove';
      field: string;
    }
  | {
      type: 'rebase';
      state: string[];
    };

const reducer = (state: string[], action: ReducerAction): string[] => {
  const newArray = !!state ? state.slice() : [];
  switch (action.type) {
    case 'add':
      newArray.splice(newArray.length, 0, action.field);
      return newArray;
    case 'remove':
      if (action.field === undefined) throw 'Missing field';
      return newArray.filter((item) => item != action.field);
    case 'rebase':
      if (action.state === undefined) return [];
      return action.state;
  }
};

export function StringArrayForm<T extends FieldValues>(props: {
  fieldName: Path<T>;
  form: UseFormReturn<T>;
  inputType: HTMLInputTypeAttribute;
  label: string;
}) {
  const { t } = useTranslation('auth');

  const [state, dispatch] = useReducer(
    reducer,
    Object.keys(props.form.getValues()).filter(
      (field) => field.includes(props.fieldName + '.') ?? ['']
    )
  );

  return (
    <div className="flex flex-col gap-2">
      {state?.map((field: string, i) => (
        <div
          key={field}
          className="flex flex-col items-center gap-2 md:flex-row"
        >
          <Input
            type={props.inputType}
            form={props.form}
            label={props.label}
            fieldName={field as Path<T>}
          />
          {state.length > 1 && (
            <Button
              size="icon"
              variant="destructive"
              aria-label={t('Borrar')}
              onClick={(ev) => {
                ev.preventDefault();
                dispatch({
                  type: 'remove',
                  field,
                });
              }}
            >
              <XIcon />
            </Button>
          )}
        </div>
      ))}
      <Button
        variant="secondary"
        className="mx-auto"
        onClick={(ev) => {
          ev.preventDefault();
          props.form.setValue(
            `${props.fieldName}.${state.length}` as Path<T>,
            '' as PathValue<T, Path<T>>
          );
        }}
      >
        {t('Agregar otro {{label}}', { replace: { label: props.label } })}
      </Button>
    </div>
  );
}
