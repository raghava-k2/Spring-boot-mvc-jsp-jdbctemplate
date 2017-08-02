import React from 'react'
import {FormControl, FormGroup, ControlLabel, HelpBlock} from 'react-bootstrap'

export default function FieldGroup({
    id,
    label,
    help,
    ...props
}) {
    return (
        <FormGroup controlId={id}>
            <ControlLabel>{label}</ControlLabel>
            <FormControl {...props}/> {help && <HelpBlock>{help}</HelpBlock>}
        </FormGroup>
    );
}

export const deepClear = (obj) => {
    Object
        .keys(obj)
        .forEach((obj1, i) => {
            if (obj[obj1] instanceof Object && !obj[obj1].constructor.name === 'Date') 
                deepClear(obj[obj1]);
            else 
                obj[obj1] = ''
        });
}