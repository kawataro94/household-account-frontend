import Axios from 'axios';

import { serverUrl } from '../../.env/resources';

const httpClient = Axios.create({
	withCredentials: true,
});

function useFetchMyProfile() {
	return httpClient.get(`http://${serverUrl}/member/me`);
}

export default useFetchMyProfile;
