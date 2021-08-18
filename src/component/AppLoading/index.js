import React, { useEffect } from 'react';
import {
    CircularProgress,
    Dialog,
    DialogContent
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { component_reducer } from '../../module';

const Index = () => {

    const { loading = false } = useSelector(state => state.component)

    const dispatch = useDispatch();

    useEffect(() => {
        if (loading) {
            setTimeout(() => {
                dispatch(component_reducer.stop_component_loading())
            }, 2000);
        }
    }, [loading, dispatch]);

    const onCloseDialog = () => { }

    return (
        <Dialog
            open={loading}
            onClose={onCloseDialog}
            maxWidth="sm"
            disableBackdropClick={true}
            disableEscapeKeyDown={true}
            PaperProps={{
                style: {
                    backgroundColor: 'transparent',
                    boxShadow: 'none'
                }
            }}
        >
            <DialogContent>
                <CircularProgress />
            </DialogContent>
        </Dialog>
    )
}

export default Index;
