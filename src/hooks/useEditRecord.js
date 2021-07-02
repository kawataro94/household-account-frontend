import { useCallback } from 'react';
import Moment from 'moment';

import { serverUrl } from '../../.env/resources';
import { httpClient } from '../setting';

function useEditRecord({ categories, places, members }) {
	const edit = useCallback(
		({ id, title, date, cost, category, place, paidBy, createBy }) => {
			const { id: categoryId } = categories.find(({ name }) => name === category);
			const { id: placeId } = places.find(({ name }) => name === place);
			const { id: memberId } = members.find(({ account }) => account === paidBy);
			const body = {
				title,
				date: Moment(date).format('YYYY-MM-DD'),
				cost,
				categoryId,
				placeId,
				memberId,
				createBy,
			};

			return httpClient.patch(`${serverUrl}/member/records/${id}`, body);
		},
		[categories, places, members]
	);

	return { edit };
}

export default useEditRecord;
