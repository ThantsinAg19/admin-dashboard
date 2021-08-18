import {
    set_error_message,
    set_user_role,
    start_loading
} from "../reducer/reducer.system";
import { roleService } from '../../service';
import { checkStatus } from "../util";

export const action_fetch_roles = (force = false, refresh = false) => {
    return async (dispatch, getState) => {
        dispatch(start_loading());
        try {

            let response = null
            const role_list = getState()?.system?.user_roles || []
            if (!force && Array.isArray(role_list) && role_list.length > 0) {
                return;
            }

            response = await roleService.getUserRoles(refresh)

            if (checkStatus(response)) {
                const body = await response.data
                dispatch(set_user_role(body));
            }
            else dispatch(set_error_message(response.statusText))

        } catch (error) {
            dispatch(set_error_message(error.message));
        }
    }
}