import { serverUrl } from '../../.env/resources';
import { httpClient } from '../setting'

function useFetchTemplates() {
	return httpClient.get(`${serverUrl}/member/config/templates`);
}

export default useFetchTemplates;
