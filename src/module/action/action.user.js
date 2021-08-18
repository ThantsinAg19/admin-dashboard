import {
    set_error_message,
    set_user_role,
    start_loading
}from "../reducer/reducer.user"
import { userService } from '../../service'
import { checkStatus } from "../util";
import { wipe_login_data } from "../../util/storage";

export const action_GetPermission = () => {
    return async (dispatch, getState) => {
        dispatch(start_loading());
        try {
            const response = await userService.getPermission();
            if (checkStatus(response)) {
                const body = await response.data
                dispatch(set_user_role(body));
            }
            else {
                alert('Please Login again');
                wipe_login_data();
                dispatch(set_error_message(response.statusText))
            }

        } catch (error) {
            alert('Please Login again', error);
            wipe_login_data();
            dispatch(set_error_message(error.message));
        }
    }
}