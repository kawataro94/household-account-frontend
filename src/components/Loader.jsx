import React from 'react';
import { Loader as RsuiteLoader } from 'rsuite';

import Center from './Center';
import { alignCenter } from './style';

const Loader = () => (
	<Center hasHeader={true}>
		<div css={alignCenter}>
			<RsuiteLoader size="md" speed="slow" />
		</div>
	</Center>
);

export default Loader;
