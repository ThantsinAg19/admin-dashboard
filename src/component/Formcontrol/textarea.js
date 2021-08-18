import React from 'react';
import { Field, useField } from 'formik';
import PropTypes from 'prop-types';
import FormGroup from './FormGroup';

const Textarea = props => {
    const {
        name,
        label,
        type = 'text',
        rows = '3'
    } = props;
    const [, meta] = useField(props)

    const hasError = meta.error && meta.touched
    return (
        <FormGroup
            name={name}
            label={label}
        >
            <Field
                as={'textarea'}
                name={name}
                type={type}
                rows={rows}
                className={`inputField ${hasError && 'inputError'}`}
                {...props}
            />
            <span className={"messageError"}>{hasError ? meta.error : ''}</span>
        </FormGroup>
    )
}

Textarea.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
}

export default Textarea