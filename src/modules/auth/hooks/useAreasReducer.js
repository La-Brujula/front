import { useReducer } from "react";

const activityReducer = (state, action) => {
    let shadowState = state.map(a => a);
    switch (action.type) {
        case 'add':
            return [...shadowState, action.item];
        case 'remove':
            if (action.index === undefined) throw 'Missing index';
            shadowState = [...shadowState.slice(0, action.index), ...shadowState.slice(action.index + 1)];
            return [...shadowState];
        case 'change':
            if (action.index === undefined) throw 'Missing index';
            if (action.item === undefined) throw 'Missing item';
            shadowState.splice(action.index, 1, action.item);
            return [...shadowState];
        case 'clear':
            return [];
    }
};

const removeElementFunc = (dispatch) => (i) => () => {
    dispatch({ type: 'remove', index: i });
}

export function useAreasReducer(subareas) {
    const [state, dispatch] = useReducer(
        activityReducer,
        subareas || [undefined]
    );
    const removeElement = removeElementFunc(dispatch)

    return { state, dispatch, removeElement }
}