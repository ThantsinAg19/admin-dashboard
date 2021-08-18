import React from 'react'
import { useDispatch } from 'react-redux'
import { makeStyles, colors, Typography } from '@material-ui/core'

import { open_prompt_dialog, set_delete_item } from '../../../module/reducer/reducer.components'
import AppButton, { ButtonType } from '../../AppButton'

import { useTranslation } from "react-i18next";
const useStyles = makeStyles(theme => ({
    danger: {
        backgroundColor: theme.palette.error.dark,
        '&:hover': {
            background: theme.palette.error.dark,
        }
    },
    text: {
        fontSize: 13,
        color: colors.white
    }
}))

const Index = (props) => {

    const dispatch = useDispatch();
    const classes = useStyles();
    const {t} = useTranslation();

    const handler = () => {
        dispatch(set_delete_item(props))
        dispatch(open_prompt_dialog())
    }

    return (
        <AppButton
            variant={ButtonType.variant.contained}
            onClick={handler}
            className={classes.danger}
        >
            <Typography className={classes.text}>
                {t('delete')}
            </Typography>
        </AppButton>
    )
}

export default Index;