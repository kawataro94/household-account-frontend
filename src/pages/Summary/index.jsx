import React, { Suspense } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import ErrorBoundary from '../../hoc/error-boundary';
import { Divider, Loader } from '../../components';
import Component from './component';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 10,
			refetchOnWindowFocus: false,
			refetchOnReconnect: false,
		},
	},
});

const Summary = () => {
	return (
		<div className="wrap">
			<ErrorBoundary>
				<h2>Summary</h2>
				<Divider height="20" />
				<Suspense fallback={<Loader />}>
					<QueryClientProvider client={queryClient}>
						<Component />
					</QueryClientProvider>
				</Suspense>
			</ErrorBoundary>
		</div>
	);
};

export default Summary;
