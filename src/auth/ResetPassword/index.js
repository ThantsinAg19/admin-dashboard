import React, { useState } from 'react';
import {
    Avatar,
    Container,
    CssBaseline,
    makeStyles,
    Typography,
    Button,
    Box,
    Grid,
    FormControlLabel,
    Checkbox,
    CircularProgress
} from '@material-ui/core';
import {
    LockOutlined
} from '@material-ui/icons'
import { useHistory, useLocation } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { Link as RouterLink } from 'react-router-dom';
import { FormControl } from '../../component';
import CopyRight from '../../component/CopyRight';
import { useDispatch } from 'react-redux';
import { component_reducer } from '../../module';
import AppAlert, { AppSeverity } from '../../component/AppAlert';
import { authService } from '../../service';
import { checkStatus } from '../../module/util';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1)
    },
    submit: {
        marginTop: theme.spacing(3, 0, 2)
    },
}))

const INPUT_NAME = {
    password: 'password',
    confirm_password: 'confirm_password'
}

const initialValues = {
    password: '',
    confirm_password: ''
}

const validationSchema = Yup.object({
    password: Yup.string().min(6).max(16).required(),
    confirm_password: Yup.string().min(6).max(16)
        .oneOf([Yup.ref(INPUT_NAME.password), null], 'Invalid Password')
        .required()
})

export default function ResetPassword() {
    const classes = useStyles();

    const [showPassword, setShowPassword] = useState(INPUT_NAME.password)

    const location = useLocation();
    const history = useHistory();

    const dispatch = useDispatch();

    /**
     * for loading after submitting 
     */
    const [isLoading, setIsLoading] = useState(false);

    const start_loading = () => setIsLoading(true);

    const stop_loading = () => setIsLoading(false);

    const { token, } = location.state || {}

    const handleSubmit = async (data) => {
        try {
            if (!token || !data) {
                dispatch(component_reducer.set_alert_box_content({
                    type: AppSeverity.error,
                    message: 'Something went wrong !'
                }))
                stop_loading();
                return;
            }

            const response = await authService.reset_password(token, data);

            if (checkStatus(response)) {

                dispatch(component_reducer.set_alert_box_content({
                    type: AppSeverity.success,
                    message: 'Successfully changed password.\nPlease Login again.'
                }))

                stop_loading();

                setTimeout(() => {
                    history.push('/sign-in')
                }, 1500)
            }

            else {
                dispatch(component_reducer.set_alert_box_content({
                    type: AppSeverity.error,
                    message: response.errors[0]?.msg || 'Error',
                }))
            }

            stop_loading();

        } catch (error) {
            stop_loading();
            dispatch(component_reducer.set_alert_box_content({
                type: AppSeverity.error,
                message: error.error || error.message ||
                    (Array.isArray(error.errors) && error.errors[0]?.msg) || 'Oops! something went wrong',
            }))
        }

    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={ classes.paper }>
                <Avatar className={ classes.avatar }>
                    <LockOutlined />
                </Avatar>
                <Typography component={ "h1" } variant={ "h5" }>
                    Change Password
                </Typography>
            </div>
            <AppAlert />
            <Formik
                validationSchema={ validationSchema }
                initialValues={ initialValues }
                onSubmit={ (e) => {
                    start_loading();
                    setTimeout(() => {
                        handleSubmit(e)
                    }, 500)
                } }
            >
                {
                    formik => (
                        <Form onKeyDown={ (e) => {
                            if ((e.key).toLowerCase() === 'enter') {
                                formik.submitForm()
                            }
                        } }>
                            <Box col={ 12 }>
                                <FormControl
                                    name={ INPUT_NAME.password }
                                    label={ 'Password' }
                                    type={ showPassword }
                                />
                            </Box>
                            <Box col={ 12 } my={ 2 }>
                                <FormControl
                                    name={ INPUT_NAME.confirm_password }
                                    label={ 'Confirm password' }
                                    type={ showPassword }
                                />

                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            color="primary"
                                            checked={ !Boolean(showPassword) }
                                            onClick={ () => setShowPassword(showPassword ? '' : INPUT_NAME.password) }
                                        /> }
                                    label="show password"
                                />
                            </Box>

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={ classes.submit }
                                size="medium"
                                onClick={ formik.submitForm }
                            >
                                {
                                    isLoading ?
                                        <CircularProgress color={ "inherit" } size={ 20 } />
                                        :
                                        `Change Password`
                                }
                            </Button>
                        </Form>
                    )
                }
            </Formik>
            <Box mt={ 3 }></Box>
            <Grid container>
                <Grid item xs>
                    <RouterLink to="/sign-in" variant="body2" >
                        Back to Sign In
                    </RouterLink>
                </Grid>
            </Grid>
            <Box mt={ 8 }>
                <CopyRight />
            </Box>
        </Container>
    )
}