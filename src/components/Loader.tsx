import React, { FC } from 'react';
import { Loader as RsuiteLoader } from 'rsuite';

import Center from './Center';
import { alignCenter } from './style';

const Loader: FC = () => (
	<Center hasHeader={true}>
		<div css={alignCenter}>
			<RsuiteLoader size="md" speed="slow" />
		</div>
	</Center>
);

export default Loader;
