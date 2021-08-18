import React from 'react';
import PropTypes from 'prop-types';


const BaseInput = props => (
    <div style={{}}>
        {props.children}
    </div>
)

const AppInput = props => (
    <BaseInput {...props}>
        <label
            for={props.name}>
            {props.label ?? props.label}
        </label>
        <input
            type={props.type || 'text'}
            id={props.name}
            name={props.name} 
            value={''}
            />
    </BaseInput>
);

AppInput.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string
}

export default AppInput;