import { useCallback } from 'react';

import { serverUrl } from '../../.env/resources';
import { httpClient } from '../setting';

function useRecords() {
	const fetch = useCallback(async () => {
		const { data } = await httpClient.get(`${serverUrl}/member/records`);
		return data;
	}, []);

	return { fetch };
}

export default useRecords;
