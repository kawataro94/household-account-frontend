import { useCallback } from 'react'

import { serverUrl } from '../../../.env/resources';
import { httpClient } from '../../setting'

function useUpdatePlace() {
	const edit = useCallback((place) => {
		return httpClient.patch(`${serverUrl}/member/config/places/${place.id}`, place);
	}, [])

	return { edit };
}

export default useUpdatePlace;