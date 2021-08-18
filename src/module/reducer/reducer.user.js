import * as common from './type'

const types = {
    SET_USER_ROLE: 'SET_USER_ROLE',
    REMOVE_USER_ROLE: 'REMOVE_USER_ROLE'
}

export const initialState = {
    isLoading: false,
    errorMessage: '',

    userinfo: null,
    role: '',
    permission: [],

}
/**
 * @param reducer
 */
// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
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
        case types.SET_USER_ROLE:
            console.log(action)
            return {
                ..._getCommonState(state),
                role: action.role,
                permission: action.permission
            }
        default:
            return state
    }
}

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
export const set_user_role = (role) => ({
    type: types.SET_USER_ROLE,
    role: role.rolename || '',
    permission: role.permission || []
})

