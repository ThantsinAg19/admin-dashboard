import React from 'react';
import { Field, useField } from 'formik';
import PropTypes from 'prop-types';
import FormGroup from './FormGroup';
import { useTranslation } from 'react-i18next';

const Select = props => {

    const { t } = useTranslation();
    const { name, label, options = [], placeholder = t('select') } = props;
    const [, meta] = useField(props)

    const hasError = meta.error && meta.touched

    return (
        <FormGroup
            name={name}
            label={label}
        >
            <Field
                as="select"
                name={name}
                className={`inputField ${hasError ? 'inputError' : ''}`}
                // onChange={props.onChange}
                {...props}
            >
                <option>{`${placeholder} ${label}`}</option>
                {
                    options.map(({ name, label, key, value, _id }, index) => (
                        <option
                            key={index}
                            value={value || _id}
                        >
                            {name || label || key}
                        </option>
                    ))
                }
            </Field>
            <span className={"messageError"}>{hasError ? meta.error : ''}</span>
        </FormGroup>
    )
}

Select.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    control: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired
}
export default Select