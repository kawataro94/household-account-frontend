import React, { Suspense } from 'react';

import ErrorBoundary from '../../hoc/error-boundary';
import Divider from '../../components/Divider';
import Loader from '../../components/Loader';
import { Provider } from './context';
import MemberTable from './widget/MemberTable';

const Members = () => {
	return (
		<div className="wrap">
			<ErrorBoundary>
				<h2>Members</h2>
				<Divider height="20" />
				<Suspense fallback={<Loader />}>
					<Provider>
						<MemberTable />
					</Provider>
				</Suspense>
			</ErrorBoundary>
		</div>
	);
};

export default Members;
