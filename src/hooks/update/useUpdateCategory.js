import { useCallback } from 'react';

import { serverUrl } from '../../../.env/resources';
import { httpClient } from '../../setting';

function useUpdateCategory() {
	const edit = useCallback((category) => {
		return httpClient.patch(`${serverUrl}/member/config/categories/${category.id}`, category);
	}, []);

	return { edit };
}

export default useUpdateCategory;
