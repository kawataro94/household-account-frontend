import React, { useState } from 'react';

import { Form, FormGroup, Input, ControlLabel, FormControl } from 'rsuite';

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
  const { formValue: fv = {}, selected, setSelected } = props;
  const [formValue, setFormValue] = useState(fv);
  return (
    <Form
      formValue={formValue}
      onChange={values => {
        setFormValue(values);
        setSelected({ ...selected, account: values.name });
      }}
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
        name="member"
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