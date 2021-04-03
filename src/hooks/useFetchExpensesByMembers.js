import { serverUrl } from '../../.env/resources';
import { httpClient } from '../setting'

function useFetchExpensesByMembers() {
	return httpClient.get(`http://${serverUrl}/member/expenses/monthly_by_members`);
}

export default useFetchExpensesByMembers;
