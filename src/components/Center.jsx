import React from 'react';

const flex = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100vh',
};

const content = {
  width: 500,
  padding: 20,
  backgroundColor: '#fff',
  borderRadius: 6
};

const Center = ({ children }) => {

  return (
    <div style={flex}>
      <div style={content}>
        {children}
      </div>
    </div>
  );
};

export default Center;