import { serverUrl } from '../../.env/resources';
import { httpClient } from '../setting'

function useDeleteTemplate() {
	const remove = (id) => {
		return httpClient.delete(`http://${serverUrl}/member/config/templates/${id}`);
	};

	return { remove };
}

export default useDeleteTemplate;
