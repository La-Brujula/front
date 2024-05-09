import CloseOutlined from '@mui/icons-material/CloseOutlined';
import { IconButton, Tooltip } from '@mui/material';
import {
  ChangeEvent,
  HTMLInputTypeAttribute,
  useEffect,
  useReducer,
} from 'react';
import { FieldValues, Path, PathValue, UseFormSetValue } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

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

  useEffect(() => {
    props.setValue(
      props.name,
      state.map((i) => i.value) as PathValue<T, Path<T>>
    );
  }, [state]);

  useEffect(() => {
    if (props.defaultState === null) return;
    dispatch({
      type: 'rebase',
      state: props.defaultState?.map((v: string) => ({
        id: Math.random(),
        value: v,
      })),
    });
  }, [props.defaultState]);

  return (
    <div className="flex flex-col gap-2">
      {state?.map((item: ReducerItem) => (
        <div
          key={item.id}
          className="flex flex-col md:flex-row gap-2 items-center"
        >
          <input
            className="flex flex-col gap-4 w-full"
            type={props.inputType}
            onChange={updateValue(item.id)}
            value={item.value}
          />
          {state.length > 1 && (
            <IconButton
              aria-label={t('Borrar')}
              onClick={() =>
                dispatch({
                  type: 'remove',
                  id: item.id,
                })
              }
            >
              <Tooltip
                title={t('Borrar')}
                arrow
              >
                <CloseOutlined />
              </Tooltip>
            </IconButton>
          )}
        </div>
      ))}
      <div
        className="cursor-pointer px-4 py-2 bg-secondary text-white
        rounded-md mx-auto w-fit"
        onClick={() => dispatch({ type: 'add' })}
      >
        {t('Agregar otro {{label}}', { replace: { label: props.label } })}
      </div>
    </div>
  );
}
