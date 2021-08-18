import {
    set_error_message,
    set_user_list,
    start_loading
} from "../reducer/reducer.system";
import { userService } from '../../service';
import { checkStatus } from "../util";

export const action_fetch_user_list = (force = false) => {
    return async (dispatch, getState) => {
        dispatch(start_loading());

        const user_list = getState()?.system?.user_list || []

        if(!force && Array.isArray(user_list) && user_list.length > 0) return;

        try {
            const response = await userService.getUserList({});

            if (checkStatus(response)) {
                const body = await response.data
                dispatch(set_user_list(body.docs));
            }
            else dispatch(set_error_message(response.statusText))

        } catch (error) {
            dispatch(set_error_message(error.message));
        }
    }
}