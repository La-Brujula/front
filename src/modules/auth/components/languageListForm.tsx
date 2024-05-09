import { lang, proficiency } from '@/shared/types/languages';
import { DeleteOutline } from '@mui/icons-material';
import CloseOutlined from '@mui/icons-material/CloseOutlined';
import { Tooltip } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import languages from '@shared/constants/languages.json';
import { ChangeEvent, useEffect, useReducer } from 'react';
import { FieldValues, Path, SetFieldValue } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface language {
  id: number;
  type: 'select' | 'custom';
  lang: lang | 'other';
  proficiency: proficiency;
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
      item: { lang: lang } | { proficiency: proficiency };
    }
  | {
      type: 'switchType';
      id: number;
      newType: 'select' | 'custom';
    }
  | {
      type: 'rebase';
      state: language[];
    };

function reducer(state: language[], action: ReducerAction): language[] {
  const newArray = !!state ? state.slice() : [];
  switch (action.type) {
    case 'add':
      newArray.splice(newArray.length, 0, {
        id: Math.random(),
        type: 'select',
        lang: 'en',
        proficiency: 'basic',
      });
      return newArray;
    case 'remove':
      if (action.id === undefined) throw 'Missing id';
      return newArray.filter((v) => v.id !== action.id);
    case 'change':
      if (action.id === undefined) throw 'Missing id';
      if (action.item === undefined) throw 'Missing item';
      return newArray.map((item) => {
        if (item.id !== action.id) {
          return { ...item };
        }
        const newItem = { ...item, ...action.item };
        return {
          ...newItem,
          type: languages.includes(newItem.lang) ? 'select' : 'custom',
        };
      });
    case 'rebase':
      if (action.state === undefined) return [];
      return action.state;
    default:
      return state;
  }
}

export function LanguageListForm<T extends FieldValues>(props: {
  setValue: SetFieldValue<T>;
  fieldName: Path<T>;
  defaultState?: { lang: lang; proficiency: proficiency }[];
}) {
  const { t } = useTranslation('auth');
  const [state, dispatch] = useReducer(
    reducer,
    (props.defaultState || [{ lang: 'es', proficiency: 'native' }]).map(
      (v) => ({
        id: Math.random(),
        type: languages.includes(v.lang) ? 'select' : 'custom',
        ...v,
      })
    ) as language[]
  );

  const updateValue =
    (i: number, property: 'lang' | 'proficiency') =>
    (ev: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
      dispatch({
        type: 'change',
        id: i,
        item:
          property == 'lang'
            ? { lang: ev.currentTarget.value as lang }
            : { proficiency: ev.currentTarget.value as proficiency },
      });
    };

  useEffect(() => {
    props.setValue(
      props.fieldName,
      state.map((v) => ({ lang: v.lang, proficiency: v.proficiency }))
    );
  });

  return (
    <div className="col-span-2">
      <>
        {!!state &&
          state.map((value: language, i: number) => (
            <div
              key={value.id}
              className="mb-8"
            >
              <div className="mb-4 flex flex-col md:flex-row gap-4">
                <div className="flex flex-col gap-4 w-full">
                  {value.type == 'select' ? (
                    <select
                      onChange={updateValue(value.id, 'lang')}
                      className="w-full"
                      value={value.type === 'select' ? value.lang : 'other'}
                    >
                      <option value="">{t('Otro')}</option>
                      {languages.map((defLang) => (
                        <option
                          value={defLang}
                          key={defLang}
                        >
                          {t(defLang, { ns: 'languages' })}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div className="flex flex-row gap-4">
                      <input
                        type="text"
                        onChange={updateValue(value.id, 'lang')}
                        placeholder={t('Escribe aquí el nombre de tu idioma')}
                        className="grow"
                        value={value.lang}
                      />
                      <IconButton
                        onClick={() =>
                          dispatch({
                            type: 'change',
                            id: value.id,
                            item: { lang: 'es' },
                          })
                        }
                      >
                        <Tooltip title={t('Volver a lista')}>
                          <DeleteOutline />
                        </Tooltip>
                      </IconButton>
                    </div>
                  )}
                </div>
                {state.length > 1 && (
                  <IconButton
                    onClick={() =>
                      dispatch({
                        type: 'remove',
                        id: value.id,
                      })
                    }
                  >
                    <Tooltip title={t('Borrar')}>
                      <CloseOutlined />
                    </Tooltip>
                  </IconButton>
                )}
              </div>
              <div className="grow">
                <div className="flex flex-row flex-wrap gap-4 items-stretch md:items-center justify-center mb-4">
                  {(
                    [
                      'basic',
                      'intermediate',
                      'advanced',
                      'native',
                    ] as proficiency[]
                  ).map((proficiency) => (
                    <div
                      key={value.id + proficiency}
                      className={[
                        'flex flex-col gap-2 text-left',
                        'relative w-fit rounded-md ring-2 ring-primary',
                        'text-primary has-[:checked]:bg-primary has-[:checked]:text-white',
                        'flex items-center justify-center py-2 px-4',
                      ].join(' ')}
                    >
                      <label>{t(proficiency)}</label>
                      <input
                        checked={value.proficiency === proficiency}
                        onChange={updateValue(value.id, 'proficiency')}
                        className="absolute h-full w-full cursor-pointer opacity-0"
                        type="radio"
                        value={proficiency}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        <div
          className="cursor-pointer mt-6 px-4 py-2 bg-secondary text-white
        rounded-md mx-auto w-fit"
          onClick={() => dispatch({ type: 'add' })}
        >
          {t('Agregar otro idioma')}
        </div>
      </>
    </div>
  );
}
