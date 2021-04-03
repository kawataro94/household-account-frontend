import Moment from 'moment';

import { serverUrl } from '../../.env/resources';
import { httpClient } from '../setting'

function useEditRecord() {
	const edit = (record) => {
		const params = {
			...record,
			date: Moment(record.date).format('YYYY-MM-DD'),
		};

		return httpClient.patch(`http://${serverUrl}/member/lending_records/${record.id}`, params);
	};

	return { edit };
}

export default useEditRecord;