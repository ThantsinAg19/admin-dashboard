import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import {
    AddCircleOutline as AddIcon
} from '@material-ui/icons';

import { Formik } from 'formik';

import { AppButton, AppGrid, ButtonType, FormControl, Table, Types } from '../../../component';
import { Action_User_Management } from '../../../module/action.system';
import { component_reducer, Option_Action } from '../../../module';
import { Dialog, DialogActions, DialogContent, DialogTitle, Grid } from '@material-ui/core';
import { userService } from '../../../service';
import { checkStatus } from '../../../module/util';
import { useTranslation } from 'react-i18next';

const INPUT_NAME = {
    name: 'name',
    phonenumber: 'phonenumber',
    role: 'role',
    branch: 'branch',
    address: 'address',
}

const initialValues = {
    name: '',
    phonenumber: '',
    role: '',
    branch: '',
    address: '',
}

const validationSchema = Yup.object({
    name: Yup.string().min(3).required(),
    phonenumber: Yup.string().min(7).max(13).required(),
    role: Yup.string().required(),
    branch: Yup.string().required(),
    address: Yup.string().min(5).required()
})

const User = (props) => {

    const [open, setOpen] = useState(false);

    const closeDialog = () => setOpen(false);
    const openDialog = () => setOpen(true);

    const dispatch = useDispatch();
    const {t} = useTranslation();

    useEffect(() => {
        dispatch(Action_User_Management.action_fetch_user_list())

        dispatch(Option_Action.action_fetch_branch_option())

        dispatch(Option_Action.action_fetch_userrole_option())
    }, [dispatch])

    const create_new_user = async (data, { resetForm }) => {
        try {
            let response = await userService.createUser(data);
            if (checkStatus(response)) {
                dispatch(Action_User_Management.action_fetch_user_list(true));

                closeDialog();
                resetForm();
                dispatch(component_reducer.set_snack_bar_content({
                    message: 'successfully_created',
                    type: 'success'
                }))
            }
            else {
                dispatch(component_reducer.set_snack_bar_content({
                    message: response.errors[0]?.message,
                    type: 'error'
                }))
            }
        } catch (error) {
            dispatch(component_reducer.set_snack_bar_content({
                message: error?.message || error?.error?.message || error?.errors[0]?.msg,
                type: 'error'
            }))
        }
    }

    return (
        <div>
            <AppButton
                variant={ButtonType.variant.contained}
                color={ButtonType.color.primary}
                onClick={openDialog}
            >
                <AddIcon />
                {t('add')}
            </AppButton>
            <Table.CommonTable
                columns={Table.HEADER_COLUMN.USERS}
                rows={props.userlist}
            />
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={create_new_user}
            >
                {
                    formik => (
                        <Dialog
                            open={open}
                            onClose={closeDialog}
                            aria-labelledby="create-user"
                            maxWidth="sm"
                            fullWidth={true}
                            disableBackdropClick={true}
                            disableEscapeKeyDown={true}
                        >
                            <DialogTitle id="create-user">
                                {t('system_user_management.add_new_user')}
                            </DialogTitle>
                            <DialogContent>
                                <Grid container spacing={1}>
                                    <AppGrid.InputGrid col={6}>
                                        <FormControl
                                            name={INPUT_NAME.name}
                                            label={t('system_user_management.name')}
                                        />
                                    </AppGrid.InputGrid>
                                    <AppGrid.InputGrid col={6}>
                                        <FormControl
                                            name={INPUT_NAME.phonenumber}
                                            label={t('system_user_management.phonenumber')}
                                        />
                                    </AppGrid.InputGrid>
                                    <AppGrid.InputGrid col={6}>
                                        <FormControl
                                            name={INPUT_NAME.branch}
                                            label={t('system_user_management.branch')}
                                            control={Types.select}
                                            options={props.branch || []}
                                        />
                                    </AppGrid.InputGrid>
                                    <AppGrid.InputGrid col={6}>
                                        <FormControl
                                            name={INPUT_NAME.role}
                                            label={t('system_user_management.role')}
                                            control={Types.select}
                                            options={props.roles || []}
                                        />
                                    </AppGrid.InputGrid>
                                    <AppGrid.InputGrid col={6}>
                                        <FormControl
                                            name={INPUT_NAME.address}
                                            label={t('system_user_management.address')}
                                            control={Types.textarea}
                                        />
                                    </AppGrid.InputGrid>
                                </Grid>
                            </DialogContent>
                            <DialogActions>
                                <AppButton
                                    onClick={closeDialog}
                                    color={ButtonType.color.secondary}
                                >
                                    {t('cancel')}
                                </AppButton>
                                <AppButton
                                    onClick={formik.submitForm}
                                    color={ButtonType.color.primary}
                                >
                                    {t('submit')}
                                </AppButton>
                            </DialogActions>
                        </Dialog>
                    )
                }
            </Formik>
        </div>
    );
}

export default User;