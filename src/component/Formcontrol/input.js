import React from 'react';
import { Field, useField } from 'formik';
import PropTypes from 'prop-types';
import FormGroup from './FormGroup';

const Input = props => {
    const { name, label, type = 'text' } = props;
    const [, meta] = useField(props)

    const hasError = meta.error && meta.touched

    // const ref = React.useRef(0)
    // console.log(`${name}  rendering is ${ref.current++}`);

    return (
        <FormGroup
            name={name}
            label={label}
        >
            <Field
                name={name}
                type={type}
                className={`inputField ${hasError && 'inputError'}`}
                {...props}
                /**
                 * prevent mouse wheel event.
                 */
                onWheel={event => event.currentTarget.blur()}
            />
            <span className={"messageError"}>{hasError ? meta.error : ''}</span>
        </FormGroup>
    )
}

Input.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    control: PropTypes.string
}

export default Input