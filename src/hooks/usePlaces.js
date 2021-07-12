import { serverUrl } from '../../.env/resources';
import { httpClient } from '../setting';
import { useQuery } from 'react-query';

function usePlaces() {
	const resource = useQuery(
		'places',
		async () => {
			const { data } = await httpClient.get(`${serverUrl}/member/config/places`);
			return data;
		},
		{ suspense: true }
	);

	return { resource };
}

export default usePlaces;
