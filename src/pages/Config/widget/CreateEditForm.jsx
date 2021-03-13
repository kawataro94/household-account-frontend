import React from 'react';
import { Schema, Form, FormGroup, Input, ControlLabel, FormControl, SelectPicker } from 'rsuite';

import { categoryOption } from '../../../looksup';

const { StringType } = Schema.Types;
const model = Schema.Model({
    categoryName: StringType().isRequired('This field is required.'),
    title: StringType().isRequired('This field is required.'),
    category: StringType().isRequired('This field is required.'),
});

const CustomField = (props) => {
    const { name, label, accepter, ...rest } = props;
    return (
        <FormGroup>
            <ControlLabel>{label} </ControlLabel>
            <FormControl name={name} accepter={accepter} {...rest} />
        </FormGroup>
    );
};

const CreateEditForm = (props) => {
    const { formValue, setFormValue } = props;
    return (
        <Form
            model={model}
            formValue={formValue || {}}
            onChange={(values) => {
                setFormValue(values);
            }}
            checkTrigger="change"
            fluid={true}
        >
            <CustomField name="templateName" label="Template Name" accepter={Input} />
            <CustomField name="title" label="Title" accepter={Input} />
            <CustomField name="category" label="Category" accepter={SelectPicker} data={categoryOption} block={true} />
        </Form>
    );
};

export default CreateEditForm;
