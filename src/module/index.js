
import { combineReducers } from 'redux';
/** To make reducer persistance */
import { persistReducer } from 'redux-persist'
/** To store local storage */
import storage from 'redux-persist/lib/storage';

import tabbar from './reducer/reducer.tabbar';
import user from './reducer/reducer.user';

import system,
    * as system_reducer from './reducer/reducer.system';

import component,
    * as component_reducer from './reducer/reducer.components';

/**
 * actions
 */
import * as User_Action from './action/action.user';
import * as System_Action from './action.system';
import * as Option_Action from './action/action.option';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['tabbar']
}

const rootReducer = combineReducers({
    user: user,
    component: component,
    system: system,
    tabbar: tabbar,

});

export default persistReducer(persistConfig, rootReducer);

export {

    User_Action,
    System_Action,
    Option_Action,
    /**
     * reducers
     */
    component_reducer,
    system_reducer,
}