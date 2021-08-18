import * as common from './type';

export const initialState = [];

/**
 * @param reducer
 */

const Index =  (state = initialState, action) => {
    switch (action.type) {
        case common.ADD_TAB:
            if (state.includes(action.payload)) {
                return state;
            } else {
                return [...state, action.payload];
            }
        case common.DEL_TAB:
            return state.filter(tab => tab !== action.payload);
        default:
            return state;
    }
}

export const addTab = (tab) => {
    return {
        type: common.ADD_TAB,
        payload: tab
    }
}

export const delTab = (tab) => {
    return {
        type: common.DEL_TAB,
        payload: tab
    }
}

export default Index;