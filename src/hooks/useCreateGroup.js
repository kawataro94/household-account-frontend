import { serverUrl } from '../../.env/resources';
import { httpClient } from '../setting';

function useCreateGroup() {
	const create = (name) => {
		const params = {
			name,
		};

		return httpClient.post(`${serverUrl}/member/groups`, params);
	};
	return { create };
}

export default useCreateGroup;
