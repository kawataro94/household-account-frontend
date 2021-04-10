import Moment from 'moment';

import { serverUrl } from '../../.env/resources';
import { httpClient } from '../setting';

function useCreateRecord() {
	const create = (record) => {
		const params = {
			...record,
			date: Moment(record.date).format('YYYY-MM-DD'),
			memberId: record.paidBy,
			createBy: 2,
			description: 'TEST DESCRIPTION',
			fixed: false,
		};

		return httpClient.post(`${serverUrl}/member/lending_records`, params);
	};
	return { create };
}

export default useCreateRecord;
