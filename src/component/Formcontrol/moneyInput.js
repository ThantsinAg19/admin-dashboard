import React, { useEffect, useState } from 'react';
import { Field, useField } from 'formik';
import PropTypes from 'prop-types';
import FormGroup from './FormGroup';
import { moneyFormatter } from '../../util';

const Input = props => {
    const {
        name,
        label,
        type = 'text',
    } = props;
    const [field, meta] = useField(props)

    const hasError = meta.error && meta.touched

    const [value, setValue] = useState('')

    useEffect(()=>{
        if(!meta.value) setValue('');
    },[meta.value])

    return (
        <FormGroup
            name={name}
            label={label}
        >
            <Field
                name={name}
                type={type}
                placeholder={'0.0'}
                className={`inputField ${hasError && 'inputError'}`}
                {...props}
                /**
                 * prevent mouse wheel event.
                 */
                onWheel={event => event.currentTarget.blur()}
                onChange={e => {
                    const value = e.target.value
                    
                    const only_num = value.replace(/[^0-9]/, '');
                    e.target.value = only_num;
                    setValue(only_num)
                    field.onChange(e);
                }}
                value={moneyFormatter(value)}
            />
            <span className={"messageError"}>{hasError ? meta.error : ''}</span>
        </FormGroup>
    )
}

Input.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    control: PropTypes.string,
}

export default Input