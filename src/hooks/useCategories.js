import { serverUrl } from '../../.env/resources';
import { httpClient } from '../setting';
import { useQuery } from 'react-query';

function useCategories() {
	const resource = useQuery(
		'categories',
		async () => {
			const { data } = await httpClient.get(`${serverUrl}/member/config/categories`);
			return data;
		},
		{ suspense: true }
	);

	return { resource };
}

export default useCategories;
