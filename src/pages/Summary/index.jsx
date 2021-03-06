import React, { Suspense } from 'react';

import ErrorBoundary from '../../hoc/error-boundary';
import Divider from '../../components/Divider';
import Loader from '../../components/Loader';
import { Provider } from './context';
import SummaryTable from './widget/SummaryTable';

const Summary = () => {
	return (
		<div className="wrap">
			<ErrorBoundary>
				<h2>Summary</h2>
				<Divider height="20" />
				<Suspense fallback={<Loader />}>
					<Provider>
						<SummaryTable />
					</Provider>
				</Suspense>
			</ErrorBoundary>
		</div>
	);
};

export default Summary;
