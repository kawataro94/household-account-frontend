import { useCallback } from 'react';

import { serverUrl } from '../../.env/resources';
import { httpClient } from '../setting';

function useCreateTemplate(categories, places) {
	const create = useCallback(
		({ title, category, place }) => {
			const { id: categoryId } = categories.find(({ name }) => name === category);
			const { id: placeId } = places.find(({ name }) => name === place);
			const body = {
				title,
				categoryId,
				placeId,
			};

			return httpClient.post(`${serverUrl}/member/config/templates`, body);
		},
		[categories, places]
	);

	return { create };
}

export default useCreateTemplate;
