import { useCallback } from 'react';

import { serverUrl } from '../../.env/resources';
import { httpClient } from '../setting';

function useTemplates() {
	const fetch = useCallback(async () => {
		const { data } = await httpClient.get(`${serverUrl}/member/config/templates`);
		return data;
	}, []);

	return { fetch };
}

export default useTemplates;
