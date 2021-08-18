import { Field } from 'formik';
import React from 'react';
import FormGroup from './FormGroup';
import PropTypes from 'prop-types'
import { TextField } from '@material-ui/core';
import moment from 'moment'

export const CURRENT_DATE_TIME = moment().format('yyyy-MM-DDThh:mm')

const FormDateTimeLocal = (props) => {
    const { name, label, } = props

    return (
        <FormGroup
            name={name}
            label={label}
        >
            <Field name={name} {...props}>
                {({
                    field,
                    form: { setFieldValue },
                    meta
                }) => {
                    const hasError = meta.error && meta.touched
                    return (
                        <React.Fragment>
                            <TextField
                                id={`date-time-local-${name}`}
                                className={`inputField ${hasError && 'inputError'}`}
                                type="datetime-local"
                                defaultValue={CURRENT_DATE_TIME}
                                InputLabelProps={{
                                    shrink: true
                                }}
                                onChange={(e, value) => setFieldValue(name, value)}
                            />
                            <span className={"messageError"}>{hasError ? meta.error : ''}</span>
                        </React.Fragment>
                    )
                }}
            </Field>

        </FormGroup>
    )
}

FormDateTimeLocal.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
}

export default FormDateTimeLocal;