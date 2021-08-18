import {
    start_loading,
    stop_loading,

    set_branch_list,
    set_district_list,
    set_region_list,
    set_township_list,
    set_role_option,
    set_country_list,
} from '../reducer/reducer.option'
import { optionService } from '../../service';
import { checkStatus } from '../util';
import { component_reducer } from '..';

/**
 * branch option list
 */
export const action_fetch_branch_option = (force = false) => {
    return async (dispatch, getState) => {
        const branch = getState()?.option.branch_list || []
        if (!force && Array.isArray(branch) && branch.length > 0) {
            return;
        }
        dispatch(start_loading());
        try {
            const response = await optionService.OptionBranch();
            if (checkStatus(response)) {
                const body = await response.data;
                dispatch(set_branch_list(body))
            }
            else dispatch(stop_loading())
        } catch (error) {
            console.log(error)
            dispatch(stop_loading())
        }
    }
}

/**
 * 
 */
export const action_fetch_country_option = (force = false) => {
    return async (dispatch, getState) => {
        const result = getState()?.option.country_list || []

        if (!force && Array.isArray(result) && result.length > 0) {
            return;
        }

        try {
            const response = await optionService.OptionCountry();
            if (checkStatus(response)) {
                const body = await response.data;
                dispatch(set_country_list(body))
            }
        } catch (error) {
            console.log(error)
        }
    }
}

/**
 * region option list
 */
export const action_fetch_region_option = (force = false) => {
    return async (dispatch, getState) => {
        const region = getState()?.option.region_list || []
        if (!force && Array.isArray(region) && region.length > 0) {
            return;
        }
        dispatch(start_loading());
        try {
            const response = await optionService.OptionRegion();
            if (checkStatus(response)) {
                const body = await response.data;
                dispatch(set_region_list(body))
            }
            else dispatch(stop_loading())
        } catch (error) {
            console.log(error)
            dispatch(stop_loading())
        }
    }
}

/**
 * district option list
 */
export const action_fetch_district_option = (region) => {
    return async (dispatch, getState) => {
        dispatch(start_loading());
        dispatch(set_district_list([]))
        dispatch(set_township_list([]))
        if (region)
            try {
                const response = await optionService.OptionDistrict(region);
                if (checkStatus(response)) {
                    const body = await response.data;
                    dispatch(set_district_list(body))
                }
                else dispatch(stop_loading())
            } catch (error) {
                console.log(error)
                dispatch(stop_loading())
            }
    }
}

/**
 * township option list
 */
export const action_fetch_township_option = (district) => {
    return async (dispatch, getState) => {
        dispatch(start_loading());
        dispatch(set_township_list([]))
        if (district)
            try {
                const response = await optionService.OptionTownship(district);
                if (checkStatus(response)) {
                    const body = await response.data;
                    dispatch(set_township_list(body))
                }
                else dispatch(stop_loading())
            } catch (error) {
                console.log(error)
                dispatch(stop_loading())
            }
    }
}

/**
 * user role option
 */
export const action_fetch_userrole_option = (force = false) => {
    return async (dispatch, getState) => {
        const user_role_list = getState()?.option.user_role_list || []
        if (!force && Array.isArray(user_role_list) && user_role_list.length > 0) {
            return;
        }
        dispatch(start_loading());
        try {
            const response = await optionService.OptionUserRole();
            if (checkStatus(response)) {
                const body = await response.data;
                dispatch(set_role_option(body));
            }
            else dispatch(stop_loading())
        } catch (error) {
            console.log(error)
            dispatch(stop_loading());
        }
    }
}


/**
 * position
 */
 export const action_fetch_position_option = (force = false) => {
    return async (dispatch, getState) => {
        try {
            const list = getState?.option?.position || []

            if(!force && Array.isArray(list) && list.length > 0){
                return;
            }

           
        } catch (error) {
            console.log(error);
            dispatch(component_reducer.set_snack_bar_content({
                message: error.message,
                type: 'error'
            }))
        }
    }
}
