import { makeStyles } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React from 'react';
import {  useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2)
        }
    }
}));


export const AppSeverity = {
    error: "error",
    warning: "warning",
    info: "info",
    success: "success"
}

const Index =  (props) => {

    const classes = useStyles();

    const { alert_box_content } = useSelector(state=>state.component);

    if (!alert_box_content) return null;

    return (
        <div className={classes.root}>
            <Alert severity={alert_box_content?.type || AppSeverity.info}>
                {alert_box_content.message || ''}
            </Alert>
        </div>
    )
}

export default Index;
