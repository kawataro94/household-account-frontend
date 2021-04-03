import { serverUrl } from '../../.env/resources';
import { httpClient } from '../setting'

function useFetchTemplates() {
	return httpClient.get(`http://${serverUrl}/member/config/templates`);
}

export default useFetchTemplates;
