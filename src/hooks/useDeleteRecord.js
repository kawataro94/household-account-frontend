import { serverUrl } from '../../.env/resources';
import { httpClient } from '../setting'

function useDeleteRecord() {
	const remove = (id) => {
		return httpClient.delete(`http://${serverUrl}/member/records/${id}`);
	};

	return { remove };
}

export default useDeleteRecord;
