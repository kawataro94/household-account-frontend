import React, { Suspense } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import ErrorBoundary from '../../hoc/error-boundary';
import Loader from '../../components/Loader';
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

const Members = () => {
	return (
		<div className="wrap">
			<ErrorBoundary>
				<Suspense fallback={<Loader />}>
					<QueryClientProvider client={queryClient}>
						<Component />
					</QueryClientProvider>
				</Suspense>
			</ErrorBoundary>
		</div>
	);
};

export default Members;
