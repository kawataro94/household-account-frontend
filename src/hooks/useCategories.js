import { useCallback } from 'react';

import { serverUrl } from '../../.env/resources';
import { httpClient } from '../setting';

function useCategories() {
	const fetch = useCallback(async () => {
		const { data } = await httpClient.get(`${serverUrl}/member/config/categories`);
		return data;
	}, []);

	return { fetch };
}

export default useCategories;
