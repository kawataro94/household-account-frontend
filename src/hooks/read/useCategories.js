import { serverUrl } from '../../../.env/resources';
import { httpClient } from '../../setting';

function useCategories() {
	return httpClient.get(`${serverUrl}/member/config/categories`);
}

export default useCategories;
