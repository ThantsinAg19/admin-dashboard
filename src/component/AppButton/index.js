import React from 'react';
import PropTypes from 'prop-types';
import { Button, makeStyles } from '@material-ui/core';
import LoadingProgress from './LoadingProgress';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
    error: {
        backgroundColor: theme.palette.error.dark,
        color: '#FFF',
        fontSize: 13,
        '&:hover': {
            background: theme.palette.error.dark,
        }
    }
}))


const ButtonType = {
    variant: {
        contained: 'contained',
        outlined: 'outlined'
    },
    color: {
        inherit: 'inherit',
        primary: 'primary',
        secondary: 'secondary',
    }
}

const AppButton = (props) => {
    const {
        variant = ButtonType.variant.contained,
        color = ButtonType.color.primary,
        size = 'small',
        danger = false,
        ...rest
    } = props

    const classes = useStyles()

    return (
        <Button
            size={size}
            variant={variant}
            color={color}
            onClick={props.onClick}
            style={{
                marginRight: 10
            }}
            className={
                clsx({
                    [classes.error]: danger
                })
            }
            {...rest}
        >
            {props.children}
        </Button>
    )
}

AppButton.propTypes = {
    variant: PropTypes.oneOf([
        ButtonType.variant.contained,
        ButtonType.variant.outlined
    ]),
    color: PropTypes.string,
    size: PropTypes.oneOf(['small', 'large', 'medium']),
    onClick: PropTypes.func
}

export default AppButton;
export {
    LoadingProgress,
    ButtonType
};