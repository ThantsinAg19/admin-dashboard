import React, { useState } from 'react';
import {
    Avatar,
    Container,
    CssBaseline,
    makeStyles,
    Typography,
    Button,
    Box,
    Link,
    Grid
} from '@material-ui/core';
import {
    LockOutlined
} from '@material-ui/icons'
import * as Yup from 'yup';
import { Formik } from 'formik';
import { FormControl } from '../../component';
import { useHistory } from 'react-router-dom';
import CopyRight from '../../component/CopyRight';
import { authService } from '../../service';
import { useDispatch } from 'react-redux';
import { component_reducer } from '../../module';
import { checkStatus } from '../../module/util';
import { AppSeverity } from '../../component/AppAlert';
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
}

const initialValues = {
    phonenumber: '',
}

const validationSchema = Yup.object({
    phonenumber: Yup.string().min(7).max(13).required()
})

export default function ForgetPassword() {
    const classes = useStyles();

    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);

    /**
     * TODO: optimize code later
     */
    const startLoading = () => setLoading(true);
    const stopLoading = () => setLoading(false);

    /**
     * go back
     */
    const history = useHistory();

    /**
     * go back to SignIn
     */
    const goBackToSignIn = () => {
        history.replace('/sign-in')
    }

    /**
     * continue to OTP code
     */

    const handleSubmit = async (data) => {
        startLoading();
        
        try {
            const response = await authService.forget_password(data);
            
            if (checkStatus(response)) {
                history.push('/verify-opt-code', {
                    phonenumber: data.phonenumber
                })
            }
            stopLoading();
        } catch (error) {
            dispatch(component_reducer.set_alert_box_content({
                type: AppSeverity.error,
                message: error.message || (Array.isArray(error.errors) && error.errors[0]?.msg) || 'Oops! something went wrong',
            }))
            stopLoading();
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
                    Forget Password?
                </Typography>
            </div>
            <Formik
                validationSchema={validationSchema}
                initialValues={initialValues}
                onSubmit={handleSubmit}
            >
                {
                    formik => (
                        // <Form onKeyDown={(e) => {
                        //     if ((e.key).toLowerCase() === 'enter') {
                        //         formik.submitForm()
                        //     }
                        // }}>
                        <>
                            <Box col={12} my={2}>
                                <FormControl
                                    name={INPUT_NAME.phonenumber}
                                    label={'Phone Number'}
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
                                <LoadingProgress
                                    loading={loading}
                                    label={'Continue'}
                                />
                            </Button>
                            {/* </Form> */}
                        </>
                        
                )
                }
            </Formik>
            <Box mt={3}></Box>
            <Grid item xs>
                <Link onClick={goBackToSignIn} variant="body2" >
                    Back to Sign in
                </Link>
            </Grid>
            <Box mt={8}>
                <CopyRight />
            </Box>
        </Container>
    )
}