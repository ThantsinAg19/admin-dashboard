import React from 'react'
import { Grid, makeStyles } from '@material-ui/core'
import clsx from 'clsx'


const useStyle = makeStyles(theme => ({
    grid: {
        overflow: 'auto'
    },
    border: {
        border: '1px solid lightgray',
        borderRadius: 5,
    }
}))

const Index =  ({ col = 6, children, border = false, ...rest }) => {
    const classes = useStyle()

    return (
        <Grid item
            xl={ col }
            lg={ col }
            md={ col }
            sm={ 12 }
            xs={ 12 }
            className={
                clsx(classes.grid, {
                    [classes.border]: border
                }
                )
            }
            { ...rest }
        >
            {children }
        </Grid>
    )
}

export default Index;