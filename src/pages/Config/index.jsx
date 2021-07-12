import React, { Suspense } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import ErrorBoundary from '../../hoc/error-boundary';
import { Divider, Loader } from '../../components';
import { ModalProvider } from '../../components/Modal/context';
import { FormProvider } from '../../components/Form/context';
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
						<ModalProvider>
							<FormProvider>
								<ConfigTables />
							</FormProvider>
						</ModalProvider>
					</QueryClientProvider>
				</Suspense>
			</ErrorBoundary>
		</div>
	);
};

export default Config;
