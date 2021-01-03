import React from 'react';

const Top = ({ children }) => {

  const flex = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100vh',
    backgroundColor: '#ddd'
  };

  const content = {
    width: 500,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 6
  };

  return (
    <div style={flex}>
      <div style={content}>
        {children}
      </div>
    </div>
  );
};

export default Top;