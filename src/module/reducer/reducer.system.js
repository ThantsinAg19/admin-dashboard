import * as common from './type';
import _ from 'lodash'

const types = {
    SET_ROLE_LIST: 'SET_ROLE_LIST',
    SET_USER_LIST: 'SET_USER_LIST',

    UPDATE_USER_ROLE: 'UPDATE_USER_ROLE',
}

export const initialState = {
    isLoading: false,
    errorMessage: '',
    user_roles: [],
    user_list: [],
}

/**
 * reducer
 */
const Index =  (state = initialState, action) => {
    switch (action.type) {
        case common.START_LOADING:
            return {
                ..._getCommonState(state),
                isLoading: true
            }
        case common.STOP_LOADING:
            return {
                ..._getCommonState(state),
                isLoading: false
            }
        case common.SET_ERROR_MESSAGE:
            return {
                ..._getCommonState(state),
                errorMessage: action.payload
            }
        case types.SET_ROLE_LIST:
            return {
                ..._getCommonState(state),
                user_roles: action.payload
            }
        case types.SET_USER_LIST:
            return {
                ..._getCommonState(state),
                user_list: action.payload
            }

        /**
         * update user role by index of user_role list
         */
        case types.UPDATE_USER_ROLE:
            const temp = _.cloneDeep(state.user_roles);

            temp[action.index] = action.payload;
            return {
                ..._getCommonState(state),
                user_roles: temp
            }
        default:
            return state
    }
}

export default Index;

const _getCommonState = (state) => ({
    ...state,
    isLoading: false,
    errorMessage: ''
})



/**
 * action
 */

export const start_loading = () => ({
    type: common.START_LOADING
})

export const stop_loading = () => ({
    type: common.STOP_LOADING
})

export const set_error_message = (message = '') => ({
    type: common.SET_ERROR_MESSAGE,
    payload: message
})

export const set_user_role = (roles = []) => ({
    type: types.SET_ROLE_LIST,
    payload: roles
})

export const set_user_list = (list = []) => ({
    type: types.SET_USER_LIST,
    payload: list
})

export const update_user_role_by_idx = (role, idx) => ({
    type: types.UPDATE_USER_ROLE,
    payload: role,
    index: idx
})
