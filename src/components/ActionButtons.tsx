import React, { FC } from 'react';
import { Button } from 'rsuite';

import { confirmButton, actions } from './style';

type Props = {
	index: number;
	openConfirm: (index: number) => void;
	openEditForm: (index: number) => void;
};

const Actions: FC<Props> = ({ index, openConfirm, openEditForm }) => (
	<div css={actions}>
		<Button appearance="primary" size="sm" onClick={() => openEditForm(index)}>
			編集
		</Button>
		<Button color="red" size="sm" onClick={() => openConfirm(index)} css={confirmButton}>
			削除
		</Button>
	</div>
);

export default Actions;
