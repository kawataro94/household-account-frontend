import {
	useTemplates,
	useCategories,
	usePlaces,
	useCollectionByCategories,
	useCollectionByMembers,
	useLendingCollection,
	useMembers,
	useRecords,
	useLendingRecords,
	useMyProfile,
} from '../hooks';

const useFetchData = () => {
	const { fetch: fetchCategories } = useCategories();
	const { fetch: fetchPlaces } = usePlaces();
	const { fetch: fetchTemplates } = useTemplates();
	const { fetch: fetchCollectionByCategories } = useCollectionByCategories();
	const { fetch: fetchCollectionByMembers } = useCollectionByMembers();
	const { fetch: fetchLendingCollection } = useLendingCollection();
	const { fetch: fetchMembers } = useMembers();
	const { fetch: fetchRecords } = useRecords();
	const { fetch: fetchLendingRecords } = useLendingRecords();
	const { fetch: fetchMyProfile } = useMyProfile();

	return {
		fetchCategories,
		fetchPlaces,
		fetchTemplates,
		fetchCollectionByCategories,
		fetchCollectionByMembers,
		fetchLendingCollection,
		fetchMembers,
		fetchRecords,
		fetchLendingRecords,
		fetchMyProfile,
	};
};

export default useFetchData;
