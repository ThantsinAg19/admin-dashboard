import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
    Avatar,
    CssBaseline,
    makeStyles,
    Typography,
    Button,
    Grid,
    Box,
    Link,
    Container
} from '@material-ui/core';
import {
    LockOutlined
} from '@material-ui/icons'
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { useHistory, useLocation } from 'react-router-dom';

import { FormControl } from '../../component';
import CopyRight from '../../component/CopyRight';
import { validate_opt_code_to_reset } from '../../service/service.auth';
import { checkStatus } from '../../module/util';
import { component_reducer } from '../../module';
import { AppSeverity } from '../../component/AppAlert';
// import AuthLang from '../../component/AuthLang';

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
    otp_code: 'otp_code'
}

const initialValues = {
    otp_code: '',
}

const validationSchema = Yup.object({
    otp_code: Yup.string().length(6).required()
})

function OTPinput() {
    const classes = useStyles();

    const history = useHistory();

    const dispatch = useDispatch();

    const location = useLocation();

    const { phonenumber } = location.state || {}

    /**
     * for loading after submitting 
     */
    const [, setIsLoading] = useState(false);

    const start_loading = () => setIsLoading(true);

    const stop_loading = () => setIsLoading(false);

    /**
     * go back to SignIn
     */
    const goBackToForgetPassword = () => {
        history.replace('/forget-password')
    }

    /**
     * continue to OTP code
     */

    const handleSubmit = async (data) => {
        try {
            start_loading();
            const response = await validate_opt_code_to_reset({
                otp_code: data.otp_code,
                phonenumber: phonenumber
            });

            if (checkStatus(response)) {
                const body = await response.data

                if (body['access_token']) {

                    dispatch(component_reducer.set_alert_box_content({
                        type: AppSeverity.success,
                        message: 'Success, please reset password!'
                    }))

                    setTimeout(() => {
                        stop_loading();
                        history.push('/reset-password', {
                            token: body['access_token']
                        })
                    }, 500)

                }
                else {
                    dispatch(component_reducer.set_alert_box_content({
                        type: AppSeverity.error,
                        message: 'Invalid access token!. Please try again'
                    }))
                    stop_loading();
                }
            }

        } catch (error) {
            stop_loading();
            dispatch(component_reducer.set_alert_box_content({
                type: AppSeverity.error,
                message: error.error || error.message ||
                    (Array.isArray(error.errors) && error.errors[0]?.msg) || 'Oops! something went wrong',
            }))
        }
    }

    useEffect(() => {
        if (!phonenumber)
            dispatch(component_reducer.set_alert_box_content({
                type: AppSeverity.error,
                message: 'Phone number is missing!'
            }))
    }, [dispatch, phonenumber]);

    return (
        <Container component={"main"} maxWidth={"xs"}>
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlined />
                </Avatar>
                <Typography component={"h1"} variant={"h5"}>
                    OPT Code
                </Typography>
            </div>
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
                            <Box col={12} my={2}>
                                <FormControl
                                    name={INPUT_NAME.otp_code}
                                    label={'OPT CODE'}
                                />
                            </Box>

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                size="medium"
                                onClick={formik.submitForm}
                            >
                                Continue
                            </Button>
                        </Form>
                    )
                }
            </Formik>
            <Box mt={3}></Box>
            <Grid container>
                <Grid item xs>
                    <Link onClick={goBackToForgetPassword}>
                        Change phone number ?
                    </Link>
                </Grid>
                <Grid item>
                    <Link href="#" variant="body2">
                        Send again.
                    </Link>
                </Grid>
            </Grid>
            <Box mt={8}>
                <CopyRight />
            </Box>
        </Container>
    )
}

export default OTPinput