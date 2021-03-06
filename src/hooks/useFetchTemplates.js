import Axios from 'axios';

import { serverUrl } from '../../.env/resources';

const httpClient = Axios.create({
    withCredentials: true,
});

function useFetchTemplates() {
    return httpClient.get(`http://${serverUrl}/member/config/templates`);
}

export default useFetchTemplates;
