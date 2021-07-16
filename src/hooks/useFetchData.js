import {
	useTemplates,
	useCategories,
	usePlaces,
	useCollectionByCategories,
	useCollectionByMembers,
	useLendingCollection,
	useMembers,
} from '../hooks';

const useFetchData = () => {
	const { fetch: fetchCategories } = useCategories();
	const { fetch: fetchPlaces } = usePlaces();
	const { fetch: fetchTemplates } = useTemplates();
	const { fetch: fetchCollectionByCategories } = useCollectionByCategories();
	const { fetch: fetchCollectionByMembers } = useCollectionByMembers();
	const { fetch: fetchLendingCollection } = useLendingCollection();
	const { fetch: fetchMembers } = useMembers();

	return {
		fetchCategories,
		fetchPlaces,
		fetchTemplates,
		fetchCollectionByCategories,
		fetchCollectionByMembers,
		fetchLendingCollection,
		fetchMembers,
	};
};

export default useFetchData;
