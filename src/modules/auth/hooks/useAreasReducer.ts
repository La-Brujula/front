import { useCallback, useReducer } from 'react';

interface ActivityReducerAction {
  type: 'add' | 'remove' | 'change' | 'clear';
  item?: string;
  index?: number;
}

function activityReducer(
  state: string[],
  action: ActivityReducerAction,
): string[] {
  let shadowState = state.map((a) => a);
  switch (action.type) {
    case 'add':
      if (action.item === undefined) throw 'Missing item';
      return [...shadowState, action.item];
    case 'remove':
      if (action.index === undefined) throw 'Missing index';
      shadowState = [
        ...shadowState.slice(0, action.index),
        ...shadowState.slice(action.index + 1),
      ];
      return [...shadowState];
    case 'change':
      if (action.index === undefined) throw 'Missing index';
      if (action.item === undefined) throw 'Missing item';
      shadowState.splice(action.index, 1, action.item);
      return [...shadowState];
    case 'clear':
      return [];
  }
}

export function useAreasReducer(subareas?: string[]) {
  const [state, dispatch] = useReducer(activityReducer, subareas || []);

  const removeElement = useCallback(
    (i: number) => () => {
      dispatch({ type: 'remove', index: i });
    },
    [dispatch],
  );

  return { state, dispatch, removeElement };
}
