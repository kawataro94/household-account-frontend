import { useCallback } from 'react';
import { useQueryClient } from 'react-query';

const useReactQuery = () => {
	const queryClient = useQueryClient();
	const update = useCallback((key) => queryClient.invalidateQueries(key), []);

	return { update };
};

export default useReactQuery;
