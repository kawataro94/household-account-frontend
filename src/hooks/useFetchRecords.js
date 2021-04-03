import { serverUrl } from '../../.env/resources';
import { httpClient } from '../setting'

function useFetchRecords() {
	return httpClient.get(`http://${serverUrl}/member/records`);
}

export default useFetchRecords;
