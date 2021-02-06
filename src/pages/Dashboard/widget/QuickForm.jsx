import React, { useMemo } from 'react';
import { Schema, Form, FormGroup, Input, ControlLabel, FormControl, DatePicker, SelectPicker } from 'rsuite';

import { resources } from '../../../resources';
import { categoryOption, makeMemberOption } from '../../../looksup';

const { StringType, NumberType, DateType } = Schema.Types;
const model = Schema.Model({
  title: StringType().isRequired('This field is required.'),
  category: StringType()
    .isRequired('This field is required.'),
  date: DateType().isRequired('This field is required.'),
  paidBy: NumberType()
    .isRequired('This field is required.'),
  cost: NumberType()
    .isRequired('This field is required.')
});

const CustomField = (props) => {
  const { name, label, accepter, ...rest } = props;
  const autoFocus = name === 'cost' ? true : false;
  return (
    <FormGroup>
      <ControlLabel>{label} </ControlLabel>
      <FormControl
        name={name}
        accepter={accepter}
        {...rest}
        autoFocus={autoFocus}
      />
    </FormGroup>
  );
};

const CreateEditForm = (props) => {
  const { formValue, setFormValue } = props;
  const members = useMemo(() => resources.members.read(), [resources]);
  const memberOption = makeMemberOption(members);
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
        name="cost"
        label="Cost"
        accepter={Input}
      />
      <CustomField
        name="paidBy"
        label="Paid By"
        accepter={SelectPicker}
        data={memberOption}
        value={(formValue || {}).member_id}
        block={true}
      />
      <CustomField
        name="title"
        label="Title"
        accepter={Input}
      />
      <CustomField
        name="category"
        label="Category"
        accepter={SelectPicker}
        data={categoryOption}
        block={true}
      />
      <CustomField
        name="date"
        label="Date"
        accepter={DatePicker}
        block={true}
      />
    </Form>
  );
};

export default CreateEditForm;