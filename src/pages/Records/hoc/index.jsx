import React from 'react';

export const { Provider, Consumer } = React.createContext({});
export function withRecord(Component) {
  const withRecord = props => {
    return (
      <Consumer>
        {state => {
          return <Component {...props} {...state} />;
        }}
      </Consumer>
    );
  };
  return withRecord;
}