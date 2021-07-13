import { useCallback } from 'react';

import { serverUrl } from '../../.env/resources';
import { httpClient } from '../setting';

function usePlaces() {
	const fetch = useCallback(async () => {
		const { data } = await httpClient.get(`${serverUrl}/member/config/places`);
		return data;
	}, []);

	return { fetch };
}

export default usePlaces;
