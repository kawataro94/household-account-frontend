import { useCallback } from 'react'

import { serverUrl } from '../../../.env/resources';
import { httpClient } from '../../setting'

function useDeleteCategory() {
	const remove = useCallback((id) => {
		return httpClient.delete(`${serverUrl}/member/config/categories/${id}`);
	}, []);

	return { remove };
}

export default useDeleteCategory;