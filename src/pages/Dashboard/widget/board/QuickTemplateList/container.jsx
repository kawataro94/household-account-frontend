import React, { useContext } from 'react';
import { useQueries } from 'react-query';

import { useFetchData } from '../../../../../hooks';
import { ModalContext } from '../../../../../components/Modal/context';
import { actions as modalActions } from '../../../../../components/Modal/reducer';
import Component from './component';

const QuickFormPanel = () => {
	const { dispatch: modalDispatch } = useContext(ModalContext);
	const { fetchTemplates } = useFetchData();
	const [{ data: templates = [] }] = useQueries([{ queryKey: 'templates', queryFn: fetchTemplates }]);

	const openCreateModal = (index) => {
		modalDispatch(modalActions.openQuickForm(index));
	};

	return <Component {...{ templates, openCreateModal }} />;
};

export default QuickFormPanel;
