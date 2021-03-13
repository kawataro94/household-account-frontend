import Axios from 'axios';

import { serverUrl } from '../../.env/resources';

const httpClient = Axios.create({
	withCredentials: true,
});

function useFetchExpensesByMembers() {
	return httpClient.get(`http://${serverUrl}/member/expenses/monthly_by_members`);
}

export default useFetchExpensesByMembers;
