import React from 'react';

import Divider from '../../components/Divider';
import GroupPanel from './widget/GroupPanel';
import UserPanel from './widget/UserPanel';

const Members = () => {
  return (
    <div className='wrap'>
      <h2 >Members</h2>
      <Divider height='20' />
      <GroupPanel />
      <Divider height='20' />
      <UserPanel />
    </div>
  );
};

export default Members;