import React from 'react';

export const { Provider, Consumer } = React.createContext({});
export function withTemplate(Component) {
	const withTemplate = (props) => {
		return (
			<Consumer>
				{(state) => {
					return <Component {...props} {...state} />;
				}}
			</Consumer>
		);
	};
	return withTemplate;
}
