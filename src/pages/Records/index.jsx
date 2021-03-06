import React, { Suspense } from 'react';

import ErrorBoundary from '../../hoc/error-boundary';
import Divider from '../../components/Divider';
import Loader from '../../components/Loader';
import RecordTable from './widget/RecordTable';

import { Provider } from './context';

const Records = () => {
	return (
		<div className="wrap">
			<ErrorBoundary>
				<h2>Records</h2>
				<Divider height="20" />
				<Suspense fallback={<Loader />}>
					<Provider>
						<RecordTable />
					</Provider>
				</Suspense>
			</ErrorBoundary>
		</div>
	);
};

export default Records;
