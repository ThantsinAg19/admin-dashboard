import { httpService, httpAuth } from ".";

export async function login(data) {
    return httpService.post('/users/login', data);
}

export async function forget_password(data) {
    return httpService.post('/users/forget-password', data);
}

export async function validate_opt_code_to_reset(data) {
    return httpService.post('/users/validate-otp-code-to-reset-password', data)
}

export async function reset_password(accesstoken, data) {

    httpAuth.interceptors.request.use(config => {
        config.headers['x-access-token'] = accesstoken
        return config;
    })

    return httpAuth.post('/users/reset-password', data)

}