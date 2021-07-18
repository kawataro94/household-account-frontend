import React, { Suspense } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import ErrorBoundary from '../../hoc/error-boundary';
import { Loader } from '../../components';
import { ModalProvider } from '../../components/Modal/context';
import { FormProvider } from '../../components/Form/context';
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

const Dashboard = () => {
	return (
		<div className="wrap">
			<ErrorBoundary>
				<Suspense fallback={<Loader />}>
					<QueryClientProvider client={queryClient}>
						<ModalProvider>
							<FormProvider>
								<Component />
							</FormProvider>
						</ModalProvider>
					</QueryClientProvider>
				</Suspense>
			</ErrorBoundary>
		</div>
	);
};

export default Dashboard;
