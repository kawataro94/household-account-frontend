import React, { useState, useEffect, useMemo } from 'react';
import { Button, Modal, Alert } from 'rsuite';

import { resources } from '../../../resources';
import { useCreateRecord, useEditRecord } from '../../../hooks';
import CreateEditForm from './CreateEditForm';

const { Header, Title, Body, Footer } = Modal;
const CreateEditModal = (props) => {
  const { modalState, closeCreateEditModal } = props;
  const records = useMemo(() => resources.records.read(), [resources]);
  const { create: createRecord } = useCreateRecord();
  const { edit: editRecord } = useEditRecord();

  const { show, selected } = modalState;
  const [formValue, setFormValue] = useState();
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    const fv = selected ? records[selected] : {
      title: '',
      category: null,
      date: null,
      paidBy: null,
      cost: ''
    };
    setFormValue(fv);
  }, [records, selected]);

  useEffect(() => {
    const inputValue = Object.values(formValue || {});
    setDisabled(inputValue.length < 5 || !Object.values(formValue || {}).every(v => v !== undefined));
  }, [formValue]);

  const onOk = () => {
    const createNew = typeof (selected) !== 'number' ? true : false;
    if (createNew) {
      createRecord(formValue)
        .then(() => {
          Alert.config({ top: 80 });
          Alert.success('新しいレコードを追加しました');
        })
        .catch((e) => {
          console.log(e, 'post error');
        });
    }
    if (!createNew) {
      editRecord(formValue, selected)
        .then(() => {
          //   const clone = Array.from(records);
          //   clone.splice(selected, 1, data);
          //   setRecords(clone);
          Alert.config({ top: 80 });
          Alert.success('レコードを編集しました');
        })
        .catch((e) => {
          console.log(e, 'post error');
        });
    }
    closeCreateEditModal();
  };
  const onCancel = () => {
    closeCreateEditModal();
  };

  const createEditFormProps = {
    formValue,
    setFormValue
  };
  const okButtonProps = {
    onClick: () => onOk(),
    appearance: 'primary',
    disabled
  };
  const cancelButtonProps = {
    onClick: () => onCancel(),
    appearance: "subtle"
  };

  return (
    <Modal show={show} onHide={closeCreateEditModal} size="xs">
      <Header>
        <Title>Form</Title>
      </Header>
      <Body>
        <CreateEditForm {...createEditFormProps} />
      </Body>
      <Footer>
        <Button {...okButtonProps}>Ok</Button>
        <Button {...cancelButtonProps}>Cancel</Button>
      </Footer>
    </Modal>
  );
};

export default CreateEditModal;