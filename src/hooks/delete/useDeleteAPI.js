import { useMemo } from 'react';

import { useDeleteCategory, useDeletePlace, useDeleteTemplate, useDeleteRecord, useDeleteLendingRecord } from './index';

function useDeleteAPI(key) {
	const { remove: deleteCategory } = useDeleteCategory();
	const { remove: deletePlace } = useDeletePlace();
	const { remove: deleteTemplate } = useDeleteTemplate();
	const { remove: deleteRecord } = useDeleteRecord();
	const { remove: deleteLendingRecord } = useDeleteLendingRecord();

	const removeAPI = useMemo(() => {
		switch (key) {
			case 'categories':
				return deleteCategory;
			case 'places':
				return deletePlace;
			case 'templates':
				return deleteTemplate;
			case 'records':
				return deleteRecord;
			case 'lendingRecords':
				return deleteLendingRecord;
		}
	}, [key]);

	return { remove: removeAPI };
}

export default useDeleteAPI;
