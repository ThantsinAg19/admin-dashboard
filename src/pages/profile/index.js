import React from 'react';

import * as Yup from 'yup';
import { Formik } from 'formik';
import { Grid, makeStyles, Paper } from '@material-ui/core';
import { AppButton, AppGrid, ButtonType, FormControl } from "../../component";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: 18,
        border: '1px solid #ECECEC',
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0,
        marginBottom: 10,
        marginTop: 32,
    },
    img_border:{
        border: '2px solid gray',
        borderRadius: 4,
    },
    image: {
        marginTop: 32,
        padding: 18
    },
    app_button: {
        margin: '12px 8px',
    }
}))

const INPUT_NAME = {
    name: 'name',
    phone_number: 'receiving_branch',
    user_role: 'user_role',
}

const initial_state = {
    name: '',
    phone_number: '',
    user_role: '',
}

const validationSchema = Yup.object({
    name: Yup.string(),
    phone_number: Yup.string(),
    user_role: Yup.string(),
})

const Index =(props) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Formik
                initialValues={initial_state}
                validationSchema={validationSchema}
                enableReinitialize={true}
            >
                {
                    formik => {
                        return (
                            <Grid container spacing={1} justify="flex-start">
                                <Grid item lg={6} xl={6}>
                                    <Paper className={classes.paper}>
                                        <Grid container spacing={1}>
                                            <AppGrid.InputGrid col={12}>
                                                <FormControl
                                                    name={INPUT_NAME.name}
                                                    label='Name'
                                                />
                                            </AppGrid.InputGrid>
                                            <AppGrid.InputGrid col={12}>
                                                <FormControl
                                                    name={INPUT_NAME.phone_number}
                                                    label='Phone Number'
                                                />
                                            </AppGrid.InputGrid>
                                            <AppGrid.InputGrid col={12}>
                                                <FormControl
                                                    name={INPUT_NAME.user_role}
                                                    label='User role'
                                                />
                                            </AppGrid.InputGrid>
                                        </Grid>
                                    </Paper>
                                </Grid>
                                <Grid item lg={6} xl={6}>
                                    <div className={classes.image}>
                                        <Grid item lg={12}>
                                            <img
                                                className={classes.img_border}
                                                src={
                                                    require('../../assets/img/pp.png')
                                                } 
                                                alt="my profile"/>
                                        </Grid>
                                        <AppButton
                                            className={classes.app_button}
                                            color={ButtonType.color.secondary}
                                            onClick={null}
                                        >
                                            Cancel
                                        </AppButton>
                                        <AppButton
                                            className={classes.app_button}
                                            color={ButtonType.color.primary}
                                            onClick={null}
                                        >
                                            Submit
                                        </AppButton>
                                    </div>
                                </Grid>
                            </Grid>
                        );
                    }
                }
            </Formik>
        </div>
    )
}

export default Index;