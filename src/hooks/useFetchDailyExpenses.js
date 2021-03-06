import Axios from 'axios';

import { serverUrl } from '../../.env/resources';

const httpClient = Axios.create({
    withCredentials: true,
});

function useFetchDailyExpenses() {
    return httpClient.get(`http://${serverUrl}/member/expenses/daily`);
}

export default useFetchDailyExpenses;
