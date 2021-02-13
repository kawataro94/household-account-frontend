import Axios from 'axios';

import { serverUrl } from '../../.env/resources';

const httpClient = Axios.create({
  withCredentials: true
});

function useEditTemplate() {
  const edit = (template) => {
    return httpClient.patch(`http://${serverUrl}/member/config/templates/${template.id}`, template);
  };

  return { edit };
}

export default useEditTemplate;