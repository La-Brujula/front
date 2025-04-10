import RefList from '@shared/constants/inductiveReferents.json';

import { Button } from '@/shared/components/button';
import { EnumGender } from '@/shared/types/genders';
import { getTitle } from '@shared/utils/areaUtils';
import { useCallback, useMemo, useReducer } from 'react';
import { useTranslation } from 'react-i18next';
import { TextSelectField } from '@/shared/components/textSelect';
import { IconButton } from '@mui/material';
import { DeleteOutlined } from '@mui/icons-material';

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
        .map(([name, id], i) => ({
          id: 'activityMap' + i,
          name,
          activity: id,
        })),
    [RefList]
  );

  return (
    <div className="w-full">
      <TextSelectField
        placeholder={t(placeholder)}
        items={refToId}
        setValue={setValue}
        onSelect={(item) => {
          setValue(item.activity);
        }}
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
    <div className="col-span-full grid md:grid-cols-2 items-start justify-stretch text-left gap-4 w-full">
      {!!validActivities && validActivities.length > 0 ? (
        validActivities.length === 1 ? (
          <div className="grid grid-cols-[2rem_1fr] gap-2 items-center">
            <IconButton
              onClick={clearInput}
              className="!p-2"
            >
              <DeleteOutlined />
            </IconButton>
            <p>{validActivities[0].label}</p>
          </div>
        ) : (
          validActivities?.map(({ key: activity, label }, i) => (
            <Button
              onClick={setActivity(activity)}
              color={i % 2 === 0 ? 'primary' : 'secondary'}
              variant="filled"
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
