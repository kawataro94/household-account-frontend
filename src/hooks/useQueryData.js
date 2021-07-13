import { useMemo } from 'react';
import { useQueryClient } from 'react-query';

const useQueryData = (keys) => {
	const queryClient = useQueryClient();
	const data = useMemo(
		() =>
			keys.reduce((acc, key) => {
				return {
					...acc,
					[key]: queryClient.getQueryData(key),
				};
			}, {}),
		[keys]
	);

	return data;
};

export default useQueryData;
