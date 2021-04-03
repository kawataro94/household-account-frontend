import { serverUrl } from '../../.env/resources';
import { httpClient } from '../setting'

function useFetchDailyExpenses() {
	return httpClient.get(`http://${serverUrl}/member/expenses/daily`);
}

export default useFetchDailyExpenses;
