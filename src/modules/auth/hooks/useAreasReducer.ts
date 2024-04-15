import { useCallback, useReducer } from 'react';

type ActivityReducerAction =
  | {
      type: 'add';
      item?: string;
    }
  | {
      type: 'remove';
      index: number;
    }
  | {
      type: 'change';
      index: number;
      item: string;
    }
  | {
      type: 'clear';
    };

interface ActivityReducerState {
  activities: string[];
}

function activityReducer(
  state: ActivityReducerState,
  action: ActivityReducerAction
): ActivityReducerState {
  switch (action.type) {
    case 'add':
      return {
        activities: [...state.activities, action.item || ''],
      };
    case 'remove':
      return {
        activities: state.activities.filter(
          (_, index) => action.index !== index
        ),
      };
    case 'change':
      return {
        activities: state.activities.map((element, index) =>
          action.index === index ? action.item : element
        ),
      };
    case 'clear':
      return {
        activities: [],
      };
    default:
      return state;
  }
}

export function useAreasReducer(subareas?: string[], initializer?: any) {
  const [state, dispatch] = useReducer(
    activityReducer,
    {
      activities: subareas || [],
    },
    () => ({ activities: initializer() })
  );

  const removeElement = useCallback(
    (i: number) => () => {
      dispatch({ type: 'remove', index: i });
    },
    [dispatch]
  );

  return { state: state.activities, dispatch, removeElement };
}
