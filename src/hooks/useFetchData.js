import { useTemplates, useCategories, usePlaces } from '../hooks';

const useFetchData = () => {
	const { fetch: fetchCategories } = useCategories();
	const { fetch: fetchPlaces } = usePlaces();
	const { fetch: fetchTemplates } = useTemplates();

	return {
		fetchCategories,
		fetchPlaces,
		fetchTemplates,
	};
};

export default useFetchData;
