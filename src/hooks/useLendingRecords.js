import { useCallback } from 'react';

import { serverUrl } from '../../.env/resources';
import { httpClient } from '../setting';

function useLendingRecords() {
	const fetch = useCallback(async () => {
		const { data } = await httpClient.get(`${serverUrl}/member/lending_records`);
		return data;
	}, []);

	return { fetch };
}

export default useLendingRecords;
