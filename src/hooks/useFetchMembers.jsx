import Axios from 'axios';

import { serverUrl } from '../../.env/resources';

const httpClient = Axios.create({
  withCredentials: true
});

function useFetchMembers() {
  return httpClient
    .get(`http://${serverUrl}/member/members`);
}

export default useFetchMembers;