import { httpService } from '.';

export async function OptionCountry(){
    return await httpService.get('/country/get-option');
}

/**
 * Region
 */
export async function OptionRegion() {
    return await httpService.get('/region/get-options')
}

/**
 * District
 */
export async function OptionDistrict(region_id) {
    return await httpService.get(`/district/get-option/${region_id}`)
}

/**
 * Township
 */
export async function OptionTownship(district_id) {
    return await httpService.get(`/townships/getoption?district=${district_id}`)
}

/**
 * Branch
 */
export async function OptionBranch() {
    return await httpService.get(`/branch/get-option`)
}

/**
 * user role option
 */
export async function OptionUserRole() {
    return await httpService.get('/user-roles/get-option')
}

