import { serverUrl } from '../../.env/resources';
import { httpClient } from '../setting'

function useFetchDailyExpenses() {
	return httpClient.get(`${serverUrl}/member/expenses/monthly`);
}

export default useFetchDailyExpenses;
