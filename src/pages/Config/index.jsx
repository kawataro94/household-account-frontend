import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Alert } from 'rsuite';

import { serverUrl } from '../../../.env/resources';
import Divider from '../../components/Divider';
import TemplateTable from './widget/TemplateTable';
import { Provider } from './hoc/index';

const httpClient = Axios.create({
  withCredentials: true
});

const Config = () => {
  Alert.config({ top: 80 });
  const [templates, setTemplates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getTemplates();
  }, []);

  const delayLoading = () => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const getTemplates = () => {
    setIsLoading(true);
    httpClient
      .get(`http://${serverUrl}/member/config/templates`)
      .then(({ data }) => {
        setTemplates(data);
      })
      .catch((e) => {
        console.log(e, 'get error');
        delayLoading();
      })
      .finally(() => {
        delayLoading();
      });
  };

  const createTemplate = template => {
    httpClient
      .post(`http://${serverUrl}/member/config/templates`, template)
      .then(({ data }) => {
        setTemplates([...templates, data]);
        Alert.success('新しいテンプレートを追加しました');
      })
      .catch((e) => {
        console.log(e, 'post error');
      });
  };

  const editTemplate = (template, idx) => {
    httpClient
      .patch(`http://${serverUrl}/member/config/templates/${template.id}`, template)
      .then(({ data }) => {
        const clone = Array.from(templates);
        clone.splice(idx, 1, data);
        setTemplates(clone);
        Alert.success('レコードを編集しました');
      })
      .catch((e) => {
        console.log(e, 'patch error');
      });
  };

  const deleteTemplate = index => {
    const { id } = templates[index];
    httpClient
      .delete(`http://${serverUrl}/member/config/templates/${id}`)
      .then(() => {
        const clone = Array.from(templates);
        clone.splice(index, 1);
        setTemplates(clone);
        Alert.success('レコードを削除しました');
      })
      .catch((e) => {
        console.log(e, 'delete error');
      });
  };

  const providerData = {
    templates,
    createTemplate,
    editTemplate,
    deleteTemplate,
    isLoading,
  };

  return (
    <div className='wrap'>
      <Provider value={providerData}>
        <h2 >Config</h2>
        <Divider height='20' />
        <TemplateTable />
        <Divider height='20' />
      </Provider>
    </div>
  );
};

export default Config;
