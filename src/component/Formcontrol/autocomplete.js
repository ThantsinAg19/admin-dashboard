import React from 'react';
import { Field } from 'formik';
import PropTypes from 'prop-types';
import FormGroup from './FormGroup';
import { Autocomplete } from '@material-ui/lab'
import { TextField } from '@material-ui/core';

const FormAutocomplete = props => {
    const { name, label } = props

    return (
        <FormGroup
            name={name}
            label={label}>
            <Field
                name={name}
                {...props}
            >
                {({
                    field,
                    form: { setFieldValue },
                    meta
                }) => {
                    const hasError = meta.error && meta.touched
                    return (
                        <React.Fragment>
                            <Autocomplete
                                // {...field}
                                className={`MuiInputBase-root-auto-complete ${hasError ? 'MuiInputBase-root-Error' : ''}`}
                                multiple= {props.multiple || true}
                                id={`auto-complete-multi-${name}`}
                                size="small"
                                blurOnSelect={"touch"}
                                onChange={(e, value) => setFieldValue(name, value)}
                                options={props.options || []}
                                getOptionLabel={(option) => option.label || option.name}
                                disableCloseOnSelect={true}
                                renderInput={(params) => (
                                    <TextField
                                        {...field}
                                        {...params}
                                        variant="outlined"
                                        placeholder={props.placeholder || ''}
                                    />
                                )}
                            />
                            <span className={"messageError"}>{hasError ? meta.error : ''}</span>
                        </React.Fragment>
                    )
                }}
            </Field>
        </FormGroup>
    )
}

FormAutocomplete.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    options: PropTypes.array.isRequired
}

export default FormAutocomplete;