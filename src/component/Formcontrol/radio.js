import React from 'react';
import { Field } from 'formik';
import PropTypes from 'prop-types';
import FormGroup from './FormGroup';

const Radio = ({ name, options = [], label }) => (
    <FormGroup
        name={name}
        label={label}
    >
        <Field name={name}>
            {
                ({ field }) => (
                    options.map(opt => (
                        <React.Fragment>
                            <input
                                type="radio"
                                {...field}
                                value={opt.value}
                                checked={field.value === opt.value}
                            />
                            {opt.key || opt.label || opt.name}
                            &nbsp;&nbsp;&nbsp;&nbsp;
                        </React.Fragment>
                    ))
                )
            }
        </Field>

    </FormGroup>
)

Radio.propTypes = {
    name: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.string,
            value: PropTypes.string.isRequired
        })
    )
}

export default Radio;