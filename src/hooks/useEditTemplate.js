import { serverUrl } from '../../.env/resources';
import { httpClient } from '../setting'

function useEditTemplate() {
	const edit = (template) => {
		return httpClient.patch(`${serverUrl}/member/config/templates/${template.id}`, template);
	};

	return { edit };
}

export default useEditTemplate;
