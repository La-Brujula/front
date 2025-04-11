import {
  ChangeEvent,
  HTMLInputTypeAttribute,
  useEffect,
  useReducer,
} from 'react';

import { XIcon } from 'lucide-react';
import {
  FieldValues,
  Path,
  PathValue,
  UseFormReturn,
  UseFormSetValue,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import Input from '@/shared/components/input';

interface ReducerItem {
  id: number;
  value: string;
}

type ReducerAction =
  | {
      type: 'add';
    }
  | {
      type: 'remove';
      id: number;
    }
  | {
      type: 'change';
      id: number;
      value: string;
    }
  | {
      type: 'rebase';
      state: ReducerItem[];
    };

const reducer = (
  state: ReducerItem[],
  action: ReducerAction
): ReducerItem[] => {
  const newArray = !!state ? state.slice() : [];
  switch (action.type) {
    case 'add':
      newArray.splice(newArray.length, 0, { id: Math.random(), value: '' });
      return newArray;
    case 'remove':
      if (action.id === undefined) throw 'Missing id';
      return newArray.filter((item) => item.id != action.id);
    case 'change':
      if (action.id === undefined) throw 'Missing id';
      if (action.value === undefined) throw 'Missing value';
      return newArray.map((item) => {
        if (item.id !== action.id) {
          return item;
        }
        return { ...item, value: action.value };
      });
    case 'rebase':
      if (action.state === undefined) return [];
      return action.state;
  }
};

export function StringArrayForm<T extends FieldValues>(props: {
  name: Path<T>;
  setValue: UseFormSetValue<T>;
  defaultState?: PathValue<T, Path<T>>;
  inputType: HTMLInputTypeAttribute;
  label: string;
}) {
  const { t } = useTranslation('auth');

  const [state, dispatch] = useReducer(
    reducer,
    (props.defaultState || ['']).map((value) => ({
      id: Math.random(),
      value: value,
    }))
  );

  const updateValue =
    (i: number) => (ev: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
      dispatch({
        type: 'change',
        id: i,
        value: ev.currentTarget.value || '',
      });
    };

  return (
    <div className="flex flex-col gap-2">
      {state?.map((item: ReducerItem, i) => (
        <div
          key={item.id}
          className="flex flex-col items-center gap-2 md:flex-row"
        >
          <input
            className="flex w-full flex-col gap-4"
            type={props.inputType}
            onChange={updateValue(item.id)}
            value={item.value}
          />
          {state.length > 1 && (
            <Button
              size="icon"
              aria-label={t('Borrar')}
              onClick={() =>
                dispatch({
                  type: 'remove',
                  id: item.id,
                })
              }
            >
              <XIcon />
            </Button>
          )}
        </div>
      ))}
      <div
        className="mx-auto w-fit cursor-pointer rounded-md bg-secondary px-4 py-2 text-white"
        onClick={() => dispatch({ type: 'add' })}
      >
        {t('Agregar otro {{label}}', { replace: { label: props.label } })}
      </div>
    </div>
  );
}
