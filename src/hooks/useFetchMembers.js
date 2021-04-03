import { serverUrl } from '../../.env/resources';
import { httpClient } from '../setting'

function useFetchMembers() {
	return httpClient.get(`http://${serverUrl}/member/members`);
}

export default useFetchMembers;
