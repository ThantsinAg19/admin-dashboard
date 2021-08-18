import React from 'react'

import {
    Typography,
    Link
} from '@material-ui/core'

const Index = () => {
    return (
        <Typography
            variant="body2"
            color="textSecondary"
            align="center"
        >
            Copyright &copy;{' '}
            <Link color="inherit" href="" >
                UniExpress
            </Link>
            {' '}
            {new Date().getFullYear()}{'.'}
        </Typography>
    )
}

export default Index;