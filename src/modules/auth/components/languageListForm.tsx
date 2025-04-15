import { ChangeEvent, useEffect, useReducer } from 'react';

import { TrashIcon, XIcon } from 'lucide-react';
import {
  FieldValues,
  Path,
  PathValue,
  SetFieldValue,
  UseFormReturn,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { TJobOpening, TJobPosting } from '@/modules/jobs/types/searchParams';
import Input from '@/shared/components/input';
import { PROFICIENCY, lang, proficiency } from '@/shared/types/languages';
import { TProfileUpdateForm } from '@/shared/types/user';

import languages from '@shared/constants/languages.json';

interface language {
  i: number;
  lang: string;
  proficiency: proficiency;
}

type ReducerAction =
  | {
      type: 'add';
    }
  | {
      type: 'remove';
      i: number;
    }
  | {
      type: 'switchType';
      i: number;
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
        i: state.length,
        lang: '',
        proficiency: 'basic',
      });
      return newArray;
    case 'remove':
      if (action.i === undefined) throw 'Missing id';
      return newArray.filter((v) => v.i !== action.i);
    case 'rebase':
      if (action.state === undefined) return [];
      return action.state;
    default:
      return state;
  }
}

export function LanguageListForm<
  T extends TProfileUpdateForm | TJobOpening,
>(props: { form: UseFormReturn<T>; allowNull?: boolean }) {
  const { t } = useTranslation('auth');
  const [state, dispatch] = useReducer(
    reducer,
    (
      props.form.getValues().languages ?? [
        { lang: 'es', proficiency: 'native' },
      ]
    ).map((v, i) => ({
      i,
      ...v,
    }))
  );

  return (
    <>
      {!!state &&
        state.map((value: language, i: number) => (
          <div
            key={value.i}
            className="mb-8"
          >
            <div className="mb-4 flex flex-col gap-4 md:flex-row">
              <div className="flex w-full flex-col gap-4">
                <Input
                  type="select"
                  fieldName={`languages.${i}.lang` as Path<T>}
                  form={props.form}
                  label={t('Idioma')}
                  items={languages.map((defLang) => ({
                    value: defLang,
                    label: t(defLang, { ns: 'languages' }),
                  }))}
                />
              </div>
              {(state.length > 1 || props.allowNull) && (
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() =>
                    dispatch({
                      type: 'remove',
                      i: value.i,
                    })
                  }
                >
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <XIcon />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{t('Borrar')}</p>
                    </TooltipContent>
                  </Tooltip>
                </Button>
              )}
            </div>
            <div className="grow">
              <Input
                type="radioGroup"
                fieldName={`languages.${i}.proficiency` as Path<T>}
                form={props.form}
                items={PROFICIENCY.map((proficiency) => ({
                  value: proficiency as PathValue<T, Path<T>>,
                  label: t(proficiency),
                }))}
              />
            </div>
          </div>
        ))}
      <Button
        variant="secondary"
        className="mx-auto"
        onClick={() => dispatch({ type: 'add' })}
      >
        {t('Agregar otro idioma')}
      </Button>
    </>
  );
}
