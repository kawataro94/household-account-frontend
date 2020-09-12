import React from 'react';
import { Schema, Form, FormGroup, Input, ControlLabel, FormControl } from 'rsuite';

const { StringType, NumberType } = Schema.Types;
const model = Schema.Model({
  title: StringType().isRequired('This field is required.'),
  category: StringType()
    .isRequired('This field is required.'),
  date: StringType()
    .isRequired('This field is required.'),
  paidBy: StringType()
    .isRequired('This field is required.'),
  cost: NumberType()
    .isRequired('This field is required.')
});

const CustomField = (props) => {
  const { name, label, accepter } = props;
  return (
    <FormGroup>
      <ControlLabel>{label} </ControlLabel>
      <FormControl
        name={name}
        accepter={accepter}
      />
    </FormGroup>
  );
};

const CreateEditForm = (props) => {
  const { formValue = {}, setFormValue } = props;
  return (
    <Form
      model={model}
      formValue={formValue}
      onChange={values => {
        setFormValue(values);
      }}
      checkTrigger='blur'
      fluid={true}
    >
      <CustomField
        name="title"
        label="Title"
        accepter={Input}
      />
      <CustomField
        name="category"
        label="Category"
        accepter={Input}
      />
      <CustomField
        name="date"
        label="Date"
        accepter={Input}
      />
      <CustomField
        name="member_id"
        label="Paid By"
        accepter={Input}
      />
      <CustomField
        name="cost"
        label="Cost"
        accepter={Input}
      />
    </Form>
  );
};

export default CreateEditForm;