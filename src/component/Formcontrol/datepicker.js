import 'date-fns';
import React from 'react';
import { Field } from 'formik';
import PropTypes from 'prop-types';
import FormGroup from './FormGroup';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtil from '@date-io/date-fns'

const Datepicker = props => {
    const {
        name, label,
        minDate,
        format = 'dd / MM / yyyy' } = props;

    const [date, setdate] = React.useState(new Date());

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
                        <>
                            <MuiPickersUtilsProvider utils={DateFnsUtil}>
                                <KeyboardDatePicker
                                    value={date}
                                    variant="inline"
                                    format={format}
                                    margin="dense"
                                    id={`date-picker-inline-${name}`}
                                    className={`date-input inputField ${hasError && 'inputError'}`}
                                    onChange={(date) => {
                                        setdate(date);
                                        setFieldValue(name, new Date(date))
                                    }}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date'
                                    }}
                                    minDate={minDate}

                                    contentEditable={false}
                                />
                            </MuiPickersUtilsProvider>
                            <span className={"messageError"}>{hasError ? meta.error : ''}</span>
                        </>
                    )
                }}
            </Field>
        </FormGroup>
    )
}

Datepicker.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    control: PropTypes.string
}

export default Datepicker;