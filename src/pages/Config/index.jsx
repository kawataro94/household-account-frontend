import React, { Suspense } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import ErrorBoundary from '../../hoc/error-boundary';
import Divider from '../../components/Divider';
import Loader from '../../components/Loader';
import ConfigTables from './widget/ConfigTables';

const queryClient = new QueryClient();

const Config = () => {
	return (
		<div className="wrap">
			<ErrorBoundary>
				<h2>Config</h2>
				<Divider height="20" />
				<Suspense fallback={<Loader />}>
					<QueryClientProvider client={queryClient}>
						<ConfigTables />
					</QueryClientProvider>
				</Suspense>
			</ErrorBoundary>
		</div>
	);
};

export default Config;
