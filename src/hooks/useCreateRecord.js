import Axios from 'axios';
import Moment from 'moment';

import { serverUrl } from '../../.env/resources';

const httpClient = Axios.create({
  withCredentials: true
});

function useCreateRecord() {
  const create = (record) => {
    const params = {
      ...record,
      date: Moment(record.date).format('YYYY-MM-DD'),
      member_id: record.paidBy,
      create_by: 2,
      description: "TEST DESCRIPTION",
      fixed: false,
    };

    return httpClient.post(`http://${serverUrl}/member/records`, params);
  };
  return { create };
}

export default useCreateRecord;