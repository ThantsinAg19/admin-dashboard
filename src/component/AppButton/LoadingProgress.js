import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'

export default function LodingButton({
    loading = false,
    label = 'Submit'
}) {
    if (loading) return <CircularProgress size={20} color={"inherit"} />

    return label
}
