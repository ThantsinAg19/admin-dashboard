import { httpService } from ".";

export async function login(data) {
    return httpService.post('/users/login', data);
}

export async function getPermission() {
    return await httpService.get(`/user-roles/get-role`);
}

/**
 * user list in system
 */
export async function getUserList({
    role,
    branch,
    refresh = false
}) {
    let query = `/users/get-all-user${refresh ? '-refresh' : ''}?`

    if (role) query += `role=${role}`;
    if (branch) query += (role && '&') + `branch=${branch}`;

    return await httpService.get(query);
}

export async function createUser(data) {
    return await httpService.post('/users/create', data)
}

/**
 * fetch delivery  list only
 */
export async function getDeliveryList({
    branch,
}) {
    let query = "/users/get-delivery-list?"
    if (branch) query += `branch=${branch}`;

    return await httpService.get(query);
}