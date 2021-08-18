import React from 'react';
import PropTypes from 'prop-types';
import Input from './input';
import Datepicker from './datepicker';
import Select from './select';
import Textarea from './textarea';
import Radio from './radio';
import FormAutocomplete from './autocomplete';
import MoneyInput from './moneyInput';
import FormDateTimeLocal, { CURRENT_DATE_TIME } from './datetime_local';

export const Types = {
    radio: "radio",
    select: "select",
    date: "date",
    textarea: "textarea",
    autocomplete: "autocomplete",
    datetime_local: "datetime_local",
    money: "money"
}

let ENUM_TYPES = []

for (const t in Types) {
    ENUM_TYPES.push(Types[t])
}


const FormControl = (props) => {
    const { control } = props;
    switch (control) {
        case Types.radio:
            return <Radio {...props} />
        case Types.select:
            return <Select {...props} />
        case Types.date:
            return <Datepicker {...props} />
        case Types.textarea:
            return <Textarea {...props} />
        case Types.autocomplete:
            return <FormAutocomplete {...props} />
        case Types.datetime_local:
            return <FormDateTimeLocal {...props} />
        case Types.money:
            return <MoneyInput {...props} />
        default:
            return <Input {...props} />
    }
}

FormControl.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    touched: PropTypes.object,
    errors: PropTypes.object,
    control: PropTypes.oneOf(ENUM_TYPES),
    defaultValue: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array,
        PropTypes.number
    ])
}
export default FormControl

export {
    CURRENT_DATE_TIME
}