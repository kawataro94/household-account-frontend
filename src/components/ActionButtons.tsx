import React, { FC } from 'react';
import { Button } from 'rsuite';

import { confirmButton, actions } from './style';

type Props = {
	index: number;
	openConfirm: (index: number) => void;
	openCreateEditModal: (index: number) => void;
};

const Actions: FC<Props> = ({ index, openConfirm, openCreateEditModal }) => (
	<div css={actions}>
		<Button appearance="primary" size="sm" onClick={() => openCreateEditModal(index)}>
			編集
		</Button>
		<Button color="red" size="sm" onClick={() => openConfirm(index)} css={confirmButton}>
			削除
		</Button>
	</div>
);

export default Actions;
