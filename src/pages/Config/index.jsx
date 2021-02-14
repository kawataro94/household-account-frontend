import React, { Suspense } from 'react';

import ErrorBoundary from '../../hoc/error-boundary';
import Divider from '../../components/Divider';
import { Provider } from './context';
import TemplateTable from './widget/TemplateTable';

const Config = () => {
  return (
    <div className='wrap'>
      <ErrorBoundary>
        <h2 >Config</h2>
        <Divider height='20' />
        <Suspense fallback={<p>Loading ...</p>}>
          <Provider>
            <TemplateTable />
          </Provider>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default Config;
