import React from 'react';
import PropTypes from 'prop-types';

const FormGroup = ({ label, name, children }) => {
    return (
        <div>
            {label &&
                <label htmlFor={name}
                    style={{
                        display: 'block',
                        marginBottom: 5
                    }}
                >{label}</label>}
            {children}
        </div>
    )
}

FormGroup.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
}

export default FormGroup