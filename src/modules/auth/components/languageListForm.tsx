import { lang, proficiency } from '@/shared/types/languages';
import CloseOutlined from '@mui/icons-material/CloseOutlined';
import { ButtonSelect } from '@shared/components/buttonSelect';
import languages from '@shared/constants/languages.json';
import { ChangeEvent, useEffect, useReducer } from 'react';
import { UseFormGetValues, UseFormSetValue } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface language {
  lang: lang;
  proficiency: proficiency;
}

interface ReducerAction {
  type: 'add' | 'remove' | 'change' | 'rebase';
  index?: number;
  item?: { lang: lang } | { proficiency: proficiency };
  state?: language[];
}

const reducer = (state: language[], action: ReducerAction): language[] => {
  const newArray = !!state ? state.slice() : [];
  switch (action.type) {
    case 'add':
      newArray.splice(newArray.length, 0, {
        lang: 'es',
        proficiency: 'basic',
      });
      return newArray;
    case 'remove':
      if (action.index === undefined) throw 'Missing index';
      newArray.splice(action.index, 1);
      return newArray;
    case 'change':
      if (action.index === undefined) throw 'Missing index';
      if (!action.item) throw 'Missing item';
      return newArray.map((item, index) => {
        if (index !== action.index) {
          return { ...item };
        }
        return {
          ...item,
          ...action.item,
        };
      });
    case 'rebase':
      if (action.state === undefined) return [];
      return action.state;
  }
};

export const LanguageListForm = ({
  name,
  setValue,
  getValues,
  defaultState,
}: {
  name: string;
  setValue: UseFormSetValue<any>;
  getValues: UseFormGetValues<any>;
  defaultState?: { lang: lang; proficiency: proficiency }[];
}) => {
  const { t } = useTranslation('auth');
  const [state, dispatch] = useReducer(reducer, [
    { lang: 'es', proficiency: 'native' },
  ]);

  const updateValue =
    (i: number, property: 'lang' | 'proficiency') =>
    (ev: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
      dispatch({
        type: 'change',
        index: i,
        item:
          property == 'lang'
            ? { lang: ev.currentTarget.value as lang }
            : { proficiency: ev.currentTarget.value as proficiency },
      });
    };

  useEffect(() => {
    setValue(name, state);
  }, [state]);

  useEffect(() => {
    if (!defaultState) return;
    dispatch({ type: 'rebase', state: defaultState });
  }, [defaultState]);

  return (
    <div className="col-span-2">
      <>
        {!!state &&
          state.map(
            (lang: { lang: lang; proficiency: proficiency }, i: number) => (
              <div
                key={lang.lang}
                className="mb-8"
              >
                <div className="mb-4 flex flex-col md:flex-row gap-4">
                  <div className="flex flex-col gap-4 w-full">
                    <select
                      onChange={updateValue(i, 'lang')}
                      className="w-full"
                      value={lang.lang}
                    >
                      <option value="other">{t('Otro')}</option>
                      {languages.map((defLang) => (
                        <option
                          value={defLang}
                          key={defLang}
                        >
                          {t(defLang)}
                        </option>
                      ))}
                    </select>
                    {!languages.includes(lang.lang) && (
                      <input
                        type="text"
                        onChange={updateValue(i, 'lang')}
                        placeholder={t('Escribe aquí el nombre de tu idioma')}
                      />
                    )}
                  </div>
                  {state.length > 1 && (
                    <button
                      onClick={() =>
                        dispatch({
                          type: 'remove',
                          index: i,
                        })
                      }
                    >
                      <CloseOutlined />
                    </button>
                  )}
                </div>
                <div className="grow">
                  <ButtonSelect
                    fieldName={'languages[' + i + '].proficiency'}
                    values={['basic', 'intermediate', 'advanced', 'native']}
                    labels={[
                      'Básico',
                      'Intermedio',
                      'Avanzado',
                      'Lengua Materna',
                    ]}
                    onClick={updateValue(i, 'proficiency')}
                    setValue={setValue}
                    getValue={getValues}
                  />
                </div>
              </div>
            ),
          )}
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
};
