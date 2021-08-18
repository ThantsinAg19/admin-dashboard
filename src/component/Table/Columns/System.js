import React from 'react';
import {
    ActionUpdate,
    Delete,
} from '../TableCellAction'

export const USERS = [
    {
        field: '_id',
        header: 'system_user_management._id',
        check: false,
    },
    {
        field: 'name',
        header: 'system_user_management.name',
        check: true,
    },
    {
        field: 'phonenumber',
        header: 'system_user_management.phonenumber',
        check: true,
    },
    {
        field: 'branch.name',
        header: 'system_user_management.branch',
        check: true,
    },
    {
        field: 'role.rolename',
        header: 'system_user_management.role',
        check: true,
    },
    {
        field: 'createdAt',
        header: 'system_user_management.created_at',
        check: true,
    },
    {
        field: 'is_verified',
        header: 'system_user_management.verified',
        check: true,
        content: data => data.is_verified ? <b style={{ color: 'green' }}>yes</b> : <b style={{ color: 'red' }}>no</b>

    },
    {
        field: 'updatedAt',
        header: 'system_user_management.updated_at',
        check: false,
    },
    {
        field: 'update',
        header: 'system_user_management.-',
        check: true,
        content: data => <ActionUpdate {...data} />
    },
    {
        field: 'delete',
        header: 'system_user_management.-',
        check: false,
        content: data => {
            const props = {
                ...data,
                name: data?.expresstype?.name,
            }
            return (
                <Delete {...props} />
            )
        }
    },
]


export const COLUMN_USER_ROLE = [
    {
        field: '_id',
        header: 'ID',
        check: false,
    },
    {
        field: 'rolename',
        header: 'system_role_management.name',
        check: true,
    },
    {
        field: 'createdAt',
        header: 'created_at',
        check: true,

    },
    {
        field: 'updatedAt',
        header: 'updated_at',
        check: true,
    },
    {
        field: 'update',
        header: '-',
        check: true,
        content: (data, index) =>
            <ActionUpdate
                data={data}
                index={index}
                route="update-role"
            />
    },
    {
        field: 'delete',
        header: '-',
        check: true,
        content: data => <Delete {...data} />
    }
]