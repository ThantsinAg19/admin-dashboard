const ACCESS_TOKEN = 'access-token';
// const REFRESH_TOKEN = 'refresh-token';

const USER_INFO = 'userinfo';
const USER_ID = 'userId';
const USER_ROLE = 'user-role';

/**
 * STORE DATA
 */
export const save_auth_information = (data) => {
    if (!data?.access_token) return;
    window.localStorage.setItem(ACCESS_TOKEN, data?.access_token)
    window.localStorage.setItem(USER_INFO, JSON.stringify(data?.user || {}))
    window.location.reload();
}

export const wipe_login_data = () => {
    window.localStorage.clear();
    // window.location.replace('/');
    window.location.reload();
}

/**
 * GET DATA
 * 
 */

const getLocalStorage = (key) => {
    return localStorage.getItem(key)
}

export const GET_STORED_ACCESS_TOKEN = getLocalStorage(ACCESS_TOKEN);
export const GET_STORED_USER_ID = getLocalStorage(USER_ID);
export const GET_STORED_USER_ROLE = getLocalStorage(USER_ROLE);
export const GET_STORED_USER_INFO = JSON.parse(getLocalStorage(USER_INFO)) || {}; 
