import React, { Suspense } from 'react';

import ErrorBoundary from '../../hoc/error-boundary';
import Divider from '../../components/Divider';
import Loader from '../../components/Loader';
import { Provider } from './context';
import ConfigTables from './widget/ConfigTables';

const Config = () => {
	return (
		<div className="wrap">
			<ErrorBoundary>
				<h2>Config</h2>
				<Divider height="20" />
				<Suspense fallback={<Loader />}>
					<Provider>
						<ConfigTables />
					</Provider>
				</Suspense>
			</ErrorBoundary>
		</div>
	);
};

export default Config;
