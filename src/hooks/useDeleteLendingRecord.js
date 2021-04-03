import { serverUrl } from '../../.env/resources';
import { httpClient } from '../setting'

function useLendingDeleteRecord() {
	const remove = (id) => {
		return httpClient.delete(`http://${serverUrl}/member/lending_records/${id}`);
	};

	return { remove };
}

export default useLendingDeleteRecord;