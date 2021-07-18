import { useCallback } from 'react';

import { serverUrl } from '../../../.env/resources';
import { httpClient } from '../../setting';

function useLendingDeleteRecord() {
	const remove = useCallback((id) => {
		return httpClient.delete(`${serverUrl}/member/lending_records/${id}`);
	}, []);

	return { remove };
}

export default useLendingDeleteRecord;
