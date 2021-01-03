import React from 'react';
import { Schema, Form, FormGroup, Input, ControlLabel, FormControl } from 'rsuite';

const { StringType } = Schema.Types;
const model = Schema.Model({
  account: StringType().isRequired('This field is required.'),
  email: StringType().isEmail('Please enter the correct email'),
  password: StringType().isRequired('This field is required.'),
});

const CustomField = (props) => {
  const { name, label, accepter, ...rest } = props;
  return (
    <FormGroup>
      <ControlLabel>{label} </ControlLabel>
      <FormControl
        name={name}
        accepter={accepter}
        {...rest}
      />
    </FormGroup>
  );
};

const SignUpForm = (props) => {
  const { formValue, setFormValue } = props;

  return (
    <Form
      model={model}
      formValue={formValue || {}}
      onChange={values => {
        setFormValue(values);
      }}
      checkTrigger='change'
      fluid={true}
    >
      <CustomField
        name="account"
        label="account name"
        accepter={Input}
      />
      <CustomField
        name="email"
        label="email"
        accepter={Input}
      />
      <CustomField
        name="password"
        label="password"
        accepter={Input}

      />
    </Form>
  );
};

export default SignUpForm;