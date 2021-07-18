import React, { useContext } from 'react';
import { useQueries } from 'react-query';

import { useFetchData } from '../../../../../hooks';
import { ModalDispatchContext } from '../../../../../components/Modal/context';
import { actions as modalActions } from '../../../../../components/Modal/reducer';
import Component from './component';

const QuickFormPanel = () => {
	const { dispatch: modalDispatch } = useContext(ModalDispatchContext);
	const { fetchTemplates } = useFetchData();
	const [{ data: templates = [] }] = useQueries([{ queryKey: 'templates', queryFn: fetchTemplates }]);

	const openCreateForm = (index) => {
		modalDispatch(modalActions.openQuickForm(index));
	};

	return <Component {...{ templates, openCreateForm }} />;
};

export default QuickFormPanel;
