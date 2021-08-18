import React from 'react';
import { Checkbox } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { component_reducer } from '../../module';

const Index = ({
    checked = false,
    onChange = () => null,
    data = {},
    index,
    to_dispatch = true
}) => {
    const dispatch = useDispatch();

    const handleChange = (e) => {
        try {

            if (to_dispatch)
                dispatch(onChange(index, e.target.checked))
            else
                onChange(e.target.checked)

        } catch (error) {
            dispatch(component_reducer.set_snack_bar_content({
                message: error.message,
                type: 'error'
            }))
        }

    }

    return (
        <Checkbox
            checked={ checked }
            onChange={ handleChange }
            inputProps={ { 'aria-label': 'primary checkbox' } }
            size={'small'}
        />
    )
}

export default Index;