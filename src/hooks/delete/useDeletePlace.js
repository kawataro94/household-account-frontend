import { useCallback } from 'react'

import { serverUrl } from '../../../.env/resources';
import { httpClient } from '../../setting'

function useDeletePlace() {
	const remove = useCallback((id) => {
		return httpClient.delete(`${serverUrl}/member/config/places/${id}`);
	}, []);

	return { remove };
}

export default useDeletePlace;