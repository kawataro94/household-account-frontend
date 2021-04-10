import { useCallback } from 'react';

import { serverUrl } from '../../../.env/resources';
import { httpClient } from '../../setting';

function useCreatePlace() {
	const create = useCallback((place) => {
		return httpClient.post(`${serverUrl}/member/config/places`, place);
	}, []);

	return { create };
}

export default useCreatePlace;
