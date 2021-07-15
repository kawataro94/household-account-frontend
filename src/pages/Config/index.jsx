import React, { Suspense } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import ErrorBoundary from '../../hoc/error-boundary';
import { Divider, Loader } from '../../components';
import { ModalProvider } from '../../components/Modal/context';
import { FormProvider } from '../../components/Form/context';
import { ConfirmProvider } from '../../components/ConfirmationModal/context';
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

const Config = () => {
	return (
		<div className="wrap">
			<ErrorBoundary>
				<h2>Config</h2>
				<Divider height="20" />
				<Suspense fallback={<Loader />}>
					<QueryClientProvider client={queryClient}>
						<ConfirmProvider>
							<ModalProvider>
								<FormProvider>
									<Component />
								</FormProvider>
							</ModalProvider>
						</ConfirmProvider>
					</QueryClientProvider>
				</Suspense>
			</ErrorBoundary>
		</div>
	);
};

export default Config;
