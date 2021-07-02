import { useCallback } from 'react';

import { serverUrl } from '../../.env/resources';
import { httpClient } from '../setting';

function useEditTemplate(categories, places) {
	const edit = useCallback(
		({ id, templateName, title, category, place }) => {
			const { id: categoryId } = categories.find(({ name }) => name === category);
			const { id: placeId } = places.find(({ name }) => name === place);
			const body = {
				templateName,
				title,
				categoryId,
				placeId,
			};

			return httpClient.patch(`${serverUrl}/member/config/templates/${id}`, body);
		},
		[categories, places]
	);

	return { edit };
}

export default useEditTemplate;
