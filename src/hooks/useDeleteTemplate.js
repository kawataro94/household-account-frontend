import Axios from 'axios';

import { serverUrl } from '../../.env/resources';

const httpClient = Axios.create({
    withCredentials: true,
});

function useDeleteTemplate() {
    const remove = (id) => {
        return httpClient.delete(`http://${serverUrl}/member/config/templates/${id}`);
    };

    return { remove };
}

export default useDeleteTemplate;
