import { useCallback, useMemo, useReducer } from 'react';

import { TrashIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';
import { TextSelectField } from '@/shared/components/textSelect';
import { EnumGender } from '@/shared/types/genders';

import RefList from '@shared/constants/inductiveReferents.json';
import { getTitle } from '@shared/utils/areaUtils';

type ReducerAction =
  | {
      type: 'clear';
    }
  | {
      type: 'select';
      activity: string;
    }
  | {
      type: 'rebase';
      state: string[];
    };

function reducer(
  state: string[] | undefined,
  action: ReducerAction
): string[] | undefined {
  switch (action.type) {
    case 'clear':
      return undefined;
    case 'select':
      if (action.activity === undefined) throw 'Missing activity';
      return [action.activity];
    case 'rebase':
      if (action.state === undefined) return [];
      return action.state;
    default:
      return state;
  }
}

export function CustomActivityLookupField({
  setValue,
  placeholder = 'Buscar tu actividad',
}: {
  setValue: (value: string) => void;
  placeholder?: string;
}) {
  const { t } = useTranslation('auth');

  const refToId = useMemo(
    () =>
      RefList &&
      Object.entries(RefList)
        .filter((a) => !!a && a[1].length > 6)
        .map(([label, id], i) => ({
          label,
          value: id,
        })),
    [RefList]
  );

  return (
    <div className="w-full">
      <TextSelectField
        placeholder={t(placeholder)}
        items={refToId}
        setValue={setValue}
      />
    </div>
  );
}

export const AreaForms = ({
  defaultValue,
  gender,
  changeListener,
  removeElement,
  placeholder = 'Buscar tu actividad',
}: {
  defaultValue: string;
  gender: EnumGender;
  removeElement: () => void;
  changeListener: (value: string) => void;
  placeholder?: string;
}) => {
  const [state, dispatch] = useReducer(
    reducer,
    defaultValue !== '' ? [defaultValue] : undefined
  );

  const validActivities = useMemo(
    () =>
      !!state
        ? (state
            .map(
              (activity) =>
                getTitle(activity, gender) && {
                  key: activity,
                  label: getTitle(activity, gender),
                }
            )
            .filter((v) => !!v) as {
            key: string;
            label: string;
          }[])
        : [],
    [state, gender]
  );

  const setActivities = useCallback(
    (activities: string) => {
      dispatch({ type: 'rebase', state: [...activities.split(' ')] });
    },
    [dispatch]
  );

  const clearInput = useCallback(() => {
    dispatch({ type: 'clear' });
    removeElement();
  }, [dispatch, removeElement]);

  const setActivity = useCallback(
    (activity: string) => () => {
      dispatch({ type: 'select', activity });
      changeListener(activity);
    },
    [dispatch]
  );

  return (
    <div className="col-span-full grid w-full items-start justify-stretch gap-4 text-left md:grid-cols-2">
      {!!validActivities && validActivities.length > 0 ? (
        validActivities.length === 1 ? (
          <div className="grid grid-cols-[2rem_1fr] items-center gap-2">
            <Button
              onClick={clearInput}
              className="!p-2"
              variant="destructive"
            >
              <TrashIcon />
            </Button>
            <p>{validActivities[0].label}</p>
          </div>
        ) : (
          validActivities?.map(({ key: activity, label }, i) => (
            <Button
              onClick={setActivity(activity)}
              color={i % 2 === 0 ? 'primary' : 'secondary'}
              className="w-full"
              key={activity}
            >
              {label}
            </Button>
          ))
        )
      ) : (
        <CustomActivityLookupField
          setValue={setActivities}
          placeholder={placeholder}
        />
      )}
    </div>
  );
};

export default AreaForms;
