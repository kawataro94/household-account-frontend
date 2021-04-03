import { serverUrl } from '../../.env/resources';
import { httpClient } from '../setting'

function useFetchMyProfile() {
	return httpClient.get(`http://${serverUrl}/member/me`);
}

export default useFetchMyProfile;
