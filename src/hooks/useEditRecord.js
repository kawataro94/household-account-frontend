import Axios from 'axios';
import Moment from 'moment';

import { serverUrl } from '../../.env/resources';

const httpClient = Axios.create({
	withCredentials: true,
});

function useEditRecord() {
	const edit = (record) => {
		const params = {
			...record,
			date: Moment(record.date).format('YYYY-MM-DD'),
		};

		return httpClient.patch(`http://${serverUrl}/member/records/${record.id}`, params);
	};

	return { edit };
}

export default useEditRecord;
