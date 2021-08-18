import {
    axiosInstance as httpService,
    authInstance as httpAuth,
} from './httpService';

import * as userService from './service.user';
import * as roleService from './service.userrole';
import * as authService from './service.auth';
import * as optionService from './service.option';

const getPaginationQuery = () => {
    const query = new URLSearchParams(window.location.search)

    return query.toString();
}

const setTotalToLocation = (total = 0) => {
    const query = new URLSearchParams(window.location.search);

    query.set('total', total);

    window.history.replaceState(null, null, `?${query.toString()}`)

}

export {
    httpService,
    httpAuth,
    userService,
    roleService,
    authService,
    optionService,
    
    /**
     * util for table pagination
     */
    getPaginationQuery,
    setTotalToLocation
}