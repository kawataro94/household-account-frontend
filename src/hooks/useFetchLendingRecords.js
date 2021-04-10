import { serverUrl } from '../../.env/resources';
import { httpClient } from '../setting';

function useFetchLendingRecords() {
	return httpClient.get(`${serverUrl}/member/lending_records`);
}

export default useFetchLendingRecords;
