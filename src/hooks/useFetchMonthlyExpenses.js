import Axios from 'axios';

import { serverUrl } from '../../.env/resources';

const httpClient = Axios.create({
  withCredentials: true
});

function useFetchDailyExpenses() {
  return httpClient
    .get(`http://${serverUrl}/member/expenses/monthly`);
}

export default useFetchDailyExpenses;