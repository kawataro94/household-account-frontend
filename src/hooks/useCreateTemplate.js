import Axios from 'axios';

import { serverUrl } from '../../.env/resources';

const httpClient = Axios.create({
  withCredentials: true
});

function useCreateTemplate() {
  const create = (template) => {
    return httpClient.post(`http://${serverUrl}/member/config/templates`, template);
  };
  return { create };
}

export default useCreateTemplate;