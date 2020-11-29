import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Alert } from 'rsuite';

import Divider from '../../components/Divider';
import TemplateTable from './widget/TemplateTable';
import { Provider } from './hoc/index';

const Config = () => {
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
    axios
      .get('http://localhost:8000/member/config/templates')
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

  const createTemplates = template => {
    axios
      .post(`http://localhost:8000/member/config/templates`, template)
      .then(({ data }) => {
        setTemplates([...template, data]);
      })
      .catch((e) => {
        console.log(e, 'post error');
      })
      .finally(() => {
        Alert.config({ top: 80 });
        Alert.success('新しいテンプレートを追加しました');
      });
  };

  const providerData = {
    templates,
    createTemplates,
    isLoading
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