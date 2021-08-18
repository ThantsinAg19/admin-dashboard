import * as service from '.';

export async function getUserRoles(refresh = false) {
    return await service.httpService.get('/user-roles/get-all' + (refresh ? '/refresh' : ''));
}

export async function updatePermission(data) {
    return await service.httpService.post('/user-roles/update-permission', data)
}