import React, { useState } from 'react';
import {
    Avatar,
    Container,
    CssBaseline,
    makeStyles,
    Typography,
    FormControlLabel,
    Checkbox,
    Button,
    Grid,
    Box,
} from '@material-ui/core';
import {
    LockOutlined
} from '@material-ui/icons'
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { FormControl } from '../../component';
import CopyRight from '../../component/CopyRight';
import AppAlert, { AppSeverity } from '../../component/AppAlert';
import { component_reducer } from '../../module';
import { useDispatch } from 'react-redux';
import { authService } from '../../service';
import { checkStatus } from '../../module/util';
import { save_auth_information } from '../../util/storage';
import { LoadingProgress } from '../../component/AppButton';

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
    phonenumber: 'phonenumber',
    password: 'password'
}

const initialValues = {
    phonenumber: '',
    password: ''
}

const validationSchema = Yup.object({
    phonenumber: Yup.string().min(7).max(13).required(),
    password: Yup.string().min(6).max(16).required()
})

export default function Signin() {
    const classes = useStyles();

    const [loading, setLoading] = useState(false);

    /**
     * TODO: optimize code later
     */
    const startLoading = () => setLoading(true);
    const stopLoading = () => setTimeout(() => {
        setLoading(false)
    }, 1500);

    const [showPassword, setShowPassword] = useState(INPUT_NAME.password)

    const dispatch = useDispatch();

    const history = useHistory();

    const handleSubmit = async (data) => {

        startLoading();

        try {
            let response = await authService.login(data);
            if (checkStatus(response)) {
                const body = await response.data;
                if (!body.user && body.access_token) {
                    history.replace('/reset-password', {
                        token: body.access_token,
                        first_time_login: true
                    });

                    stopLoading();
                    return;
                }
                if (body?.user) {

                    history.replace('/')

                    save_auth_information(body);

                    dispatch(component_reducer.set_alert_box_content({
                        type: AppSeverity.success,
                        message: `Welcome back ${body?.user?.name || 'admin'}`
                    }))
                }
                else
                    dispatch(component_reducer.set_alert_box_content({
                        type: AppSeverity.error,
                        message: 'Oops, something goes wrong!'
                    }))
            }
            else {
                dispatch(component_reducer.set_alert_box_content({
                    type: AppSeverity.error,
                    message: response.errors[0]?.msg,
                }))
            }

            stopLoading();

        } catch (error) {

            stopLoading();
            dispatch(component_reducer.set_alert_box_content({
                type: AppSeverity.error,
                message: error.message || (Array.isArray(error.errors) && error.errors[0]?.msg) || 'Oops! something went wrong',
            }))
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlined />
                </Avatar>
                <Typography component={"h1"} variant={"h5"}>
                    Sign In
                </Typography>
            </div>
            <AppAlert />
            <Formik
                validationSchema={validationSchema}
                initialValues={initialValues}
                onSubmit={handleSubmit}
            >
                {
                    formik => (
                        <Form onKeyDown={(e) => {
                            if ((e.key).toLowerCase() === 'enter') {
                                formik.submitForm()
                            }
                        }}>
                            <Box col={12}>
                                <FormControl
                                    name={INPUT_NAME.phonenumber}
                                    label={'Phone Number'}
                                />
                            </Box>
                            <Box col={12} my={2}>
                                <FormControl
                                    name={INPUT_NAME.password}
                                    label={'Password'}
                                    type={showPassword}
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            color="primary"
                                            checked={!Boolean(showPassword)}
                                            onClick={() => setShowPassword(showPassword ? '' : INPUT_NAME.password)}
                                        />}
                                    label="show password"
                                />
                            </Box>

                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                size="medium"
                                onClick={formik.submitForm}
                                disabled={loading}
                            >
                                <LoadingProgress
                                    loading={loading}
                                    label={'Sign In'}
                                />
                            </Button>
                        </Form>
                    )
                }
            </Formik>
            <Box mt={3}></Box>
            <Grid container>
                <Grid item xs>
                    <RouterLink to="/forget-password" variant="body2" >
                        Forget password?
                    </RouterLink>
                </Grid>
            </Grid>
            <Box mt={8}>
                <CopyRight />
            </Box>
        </Container>
    )
}