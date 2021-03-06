import Axios from 'axios';

import { serverUrl } from '../../.env/resources';

const httpClient = Axios.create({
    withCredentials: true,
});

function useDeleteRecord() {
    const remove = (id) => {
        return httpClient.delete(`http://${serverUrl}/member/records/${id}`);
    };

    return { remove };
}

export default useDeleteRecord;
