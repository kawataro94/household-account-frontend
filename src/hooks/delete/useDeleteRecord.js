import { useCallback } from 'react';

import { serverUrl } from '../../../.env/resources';
import { httpClient } from '../../setting';

function useDeleteRecord() {
	const remove = useCallback((id) => {
		return httpClient.delete(`${serverUrl}/member/records/${id}`);
	}, []);

	return { remove };
}

export default useDeleteRecord;
