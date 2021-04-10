import { serverUrl } from '../../../.env/resources';
import { httpClient } from '../../setting';

function usePlaces() {
	return httpClient.get(`${serverUrl}/member/config/places`);
}

export default usePlaces;
