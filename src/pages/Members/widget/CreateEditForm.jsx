import React from 'react';

import { Form, FormGroup, Input, ControlLabel, FormControl } from 'rsuite';

const CustomField = (props) => {
  const { name, label, accepter } = props;
  return (
    <FormGroup fluid>
      <ControlLabel>{label} </ControlLabel>
      <FormControl
        name={name}
        accepter={accepter}
      />
    </FormGroup>
  );
};

const CreateEditForm = () => {
  return (
    <Form fluid>
      <CustomField
        name="name"
        label="Name"
        accepter={Input}
      />
    </Form>
  );
};

export default CreateEditForm;