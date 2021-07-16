import { useCallback } from 'react';

import { serverUrl } from '../../.env/resources';
import { httpClient } from '../setting';

function useMembers() {
	const fetch = useCallback(async () => {
		const { data } = await httpClient.get(`${serverUrl}/member/members`);
		return data;
	}, []);

	return { fetch };
}

export default useMembers;
