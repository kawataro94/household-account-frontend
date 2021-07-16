import { useCallback } from 'react';

import { serverUrl } from '../../.env/resources';
import { httpClient } from '../setting';

function useLendingCollection() {
	const fetch = useCallback(async () => {
		const { data } = await httpClient.get(`${serverUrl}/member/irregular_expenses/monthly_by_members`);
		return data;
	}, []);

	return { fetch };
}

export default useLendingCollection;
