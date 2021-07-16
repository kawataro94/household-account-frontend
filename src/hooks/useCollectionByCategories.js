import { useCallback } from 'react';

import { serverUrl } from '../../.env/resources';
import { httpClient } from '../setting';

function useCollectionByCategories() {
	const fetch = useCallback(async () => {
		const { data } = await httpClient.get(`${serverUrl}/member/expenses/monthly`);
		return data;
	}, []);

	return { fetch };
}

export default useCollectionByCategories;
