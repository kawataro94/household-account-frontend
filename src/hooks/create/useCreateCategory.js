import { useCallback } from 'react'

import { serverUrl } from '../../../.env/resources';
import { httpClient } from '../../setting'

function useCreateCategory() {
	const create = useCallback((category) => {
		return httpClient.post(`${serverUrl}/member/config/categories`, category);
	}, []);

	return { create };
}

export default useCreateCategory;