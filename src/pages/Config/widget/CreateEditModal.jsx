import React, { useState, useEffect, useContext } from 'react';
import { Button, Modal, Alert } from 'rsuite';

import { useCreateTemplate, useEditTemplate, useFetchTemplates } from '../../../hooks';
import CreateEditForm from './CreateEditForm';
import { ConfigContext } from '../context';

const { Header, Title, Body, Footer } = Modal;
const CreateEditModal = (props) => {
    const { modalState, closeCreateEditModal } = props;
    const { templates, updateTemplates } = useContext(ConfigContext);
    const { create: createTemplate } = useCreateTemplate();
    const { edit: editTemplate } = useEditTemplate();

    const { show, selected } = modalState;
    const [formValue, setFormValue] = useState();
    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        const fv = selected
            ? templates[selected]
            : {
                templateName: '',
                title: '',
                category: null,
			  };
        setFormValue(fv);
    }, [templates, selected]);

    useEffect(() => {
        const inputValue = Object.values(formValue || {});
        setDisabled(inputValue.length < 3 || !Object.values(formValue || {}).every((v) => v !== undefined));
    }, [formValue]);

    const onOk = () => {
        const createNew = !Number.isFinite(selected);
        if (createNew) {
            createTemplate(formValue)
                .then(() => {
                    Alert.config({ top: 80 });
                    Alert.success('新しいテンプレートを追加しました');
                    useFetchTemplates().then(({ data }) => updateTemplates(data));
                })
                .catch((e) => {
                    console.log(e, 'post error');
                });
        }
        if (!createNew) {
            editTemplate(formValue, selected)
                .then(() => {
                    Alert.config({ top: 80 });
                    Alert.success('テンプレートを編集しました');
                    useFetchTemplates().then(({ data }) => updateTemplates(data));
                })
                .catch((e) => {
                    console.log(e, 'patch error');
                });
        }
        closeCreateEditModal();
    };
    const onCancel = () => {
        closeCreateEditModal();
    };

    const createEditFormProps = {
        formValue,
        setFormValue,
    };
    const okButtonProps = {
        onClick: () => onOk(),
        appearance: 'primary',
        disabled,
    };
    const cancelButtonProps = {
        onClick: () => onCancel(),
        appearance: 'subtle',
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
