import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import RefreshIcon from '@material-ui/icons/RefreshOutlined'
import { Box } from '@material-ui/core';

import { AppButton, ButtonType, Table } from '../../../component';
import { TableColumns } from '../../../component/Table';

import { Action_Roles } from '../../../module/action.system'
import { useTranslation } from 'react-i18next';

const UserRole = (props) => {

    const dispatch = useDispatch();
    const {t} = useTranslation();

    useEffect(() => {
        dispatch(Action_Roles.action_fetch_roles())
    }, [dispatch])

    /**
     * fresh
     */
    const refresh_data = () => dispatch(Action_Roles.action_fetch_roles(true, true))

    return (
        <div>
            <AppButton
                color={ButtonType.color.primary}
                size={'small'}
                onClick={refresh_data}
            >
                <RefreshIcon fontSize={"small"} />&nbsp;{t('refresh')}
            </AppButton>
            <Box mt={2}>
                <Table.CommonTable
                    columns={TableColumns.column_system.COLUMN_USER_ROLE}
                    rows={props.roles}
                />
            </Box>
        </div>
    );
}

export default UserRole;