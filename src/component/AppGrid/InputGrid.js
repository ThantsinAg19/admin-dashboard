import React from 'react'
import { Grid, makeStyles } from '@material-ui/core'

const useStyle = makeStyles(theme => ({
    grid: {
        marginBottom: 20,
        padding: 5
    },
    border: {
        border: '1px solid lightgray',
    }
}))

const Index =  ({ col = 4, children, ...rest }) => {
    const classes = useStyle()

    return (
        <Grid item
            xl={col}
            lg={col}
            md={col}
            sm={6}
            xs={12}
            className={classes.grid}
            {...rest}
        >
            {children}
        </Grid>
    )
}

export default Index;