import { useCallback } from 'react';

import { serverUrl } from '../../.env/resources';
import { httpClient } from '../setting';

function useMyProfile() {
	const fetch = useCallback(async () => {
		const { data } = await httpClient.get(`${serverUrl}/member/me`);
		return data;
	}, []);

	return { fetch };
}

export default useMyProfile;
