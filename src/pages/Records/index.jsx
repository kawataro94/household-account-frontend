import React, { Suspense } from 'react';

import ErrorBoundary from '../../hoc/error-boundary';
import Divider from '../../components/Divider';
import Loader from '../../components/Loader';
import RecordTables from './widget/RecordTables';
import { Provider } from './context';
import { ModalProvider } from '../../components/Modal/context';
import { FormProvider } from '../../components/Form/context';

const Records = () => {
	return (
		<div className="wrap">
			<ErrorBoundary>
				<h2>Records</h2>
				<Divider height="20" />
				<Suspense fallback={<Loader />}>
					<Provider>
						<ModalProvider>
							<FormProvider>
								<RecordTables />
							</FormProvider>
						</ModalProvider>
					</Provider>
				</Suspense>
			</ErrorBoundary>
		</div>
	);
};

export default Records;
