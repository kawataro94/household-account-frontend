import React, { useState, useEffect, useContext } from 'react';
import { Button, Modal, Alert } from 'rsuite';

import { useCreateRecord, useEditRecord, useFetchRecords } from '../../../hooks';
import CreateEditForm from './CreateEditForm';
import { RecordsContext } from '../context';

const { Header, Title, Body, Footer } = Modal;
const CreateEditModal = (props) => {
  const { modalState, closeCreateEditModal } = props;
  const { records, updateRecords } = useContext(RecordsContext);
  const { create: createRecord } = useCreateRecord();
  const { edit: editRecord } = useEditRecord();

  const { show, selected } = modalState;
  const [formValue, setFormValue] = useState();
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    const fv = Number.isFinite(selected) ? records[selected] : {
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
    const createNew = !Number.isFinite(selected);
    if (createNew) {
      createRecord(formValue)
        .then(() => {
          Alert.config({ top: 80 });
          Alert.success('新しいレコードを追加しました');
          useFetchRecords().then(({ data }) => updateRecords(data));
        })
        .catch((e) => {
          console.log(e, 'post error');
        });
    }
    if (!createNew) {
      editRecord(formValue, selected)
        .then(() => {
          Alert.config({ top: 80 });
          Alert.success('レコードを編集しました');
          useFetchRecords().then(({ data }) => updateRecords(data));
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