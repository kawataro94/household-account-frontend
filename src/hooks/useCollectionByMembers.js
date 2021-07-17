import { useCallback } from 'react';

import { serverUrl } from '../../.env/resources';
import { httpClient } from '../setting';

function useCollectionByMembers() {
	const fetch = useCallback(async () => {
		const { data } = await httpClient.get(`${serverUrl}/member/expenses/monthly_by_members`);
		return data;
	}, []);

	return { fetch };
}

export default useCollectionByMembers;
