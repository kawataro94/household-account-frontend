import { serverUrl } from '../../.env/resources';
import { httpClient } from '../setting'

function useFetchMyProfile() {
	return httpClient.get(`${serverUrl}/member/me`);
}

export default useFetchMyProfile;
