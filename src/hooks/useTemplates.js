import { serverUrl } from '../../.env/resources';
import { httpClient } from '../setting';
import { useQuery } from 'react-query';

function useTemplates() {
	const resource = useQuery(
		'templates',
		async () => {
			const { data } = await httpClient.get(`${serverUrl}/member/config/templates`);
			return data;
		},
		{ suspense: true }
	);

	return { resource };
}

export default useTemplates;
