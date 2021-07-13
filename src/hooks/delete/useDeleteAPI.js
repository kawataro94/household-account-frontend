import { useMemo } from 'react';

import { useDeleteCategory, useDeletePlace, useDeleteTemplate } from './index';

function useDeleteAPI(key) {
	const { remove: deleteCategory } = useDeleteCategory();
	const { remove: deletePlace } = useDeletePlace();
	const { remove: deleteTemplate } = useDeleteTemplate();

	const removeAPI = useMemo(() => {
		switch (key) {
			case 'categories':
				return deleteCategory;
			case 'places':
				return deletePlace;
			case 'templates':
				return deleteTemplate;
			default:
				return deleteTemplate;
		}
	}, [key]);

	return { remove: removeAPI };
}

export default useDeleteAPI;
