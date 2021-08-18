import React from 'react';
import { IconButton, Snackbar } from "@material-ui/core"
import { Alert } from "@material-ui/lab"
import { useDispatch, useSelector } from 'react-redux';
import { CloseOutlined as CloseIcon } from '@material-ui/icons'

import {
    component_reducer
} from '../../module'

const Index = (props) => {

    const dispatch = useDispatch();

    const { snack_bar_content } = useSelector(state => state.component)

    const closeSnackBar = () => {
        /**
         * clear snack bar content
         */
        dispatch(component_reducer.set_snack_bar_content())
    };


    if (!snack_bar_content) return null;

    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
            }}
            open={Boolean(snack_bar_content)}
            onClose={closeSnackBar}
            className={props?.className}
            autoHideDuration={3500}
        >
            <Alert
                severity={snack_bar_content?.type || 'info'}
                action={
                    <IconButton
                        key="close"
                        aria-label="close-snack-bar"
                        color="inherit"
                        onClick={closeSnackBar}
                        role="alert"
                        size="small"
                    >
                        <CloseIcon />
                    </IconButton>
                }
            >
                {/* <AlertTitle>This is the title</AlertTitle> */}
                {snack_bar_content?.message}
            </Alert>
        </Snackbar>
    )
} 

export default Index;