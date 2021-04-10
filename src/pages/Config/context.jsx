import React, { useState, useEffect } from 'react';

import { useResources } from '../../resources';

export const ConfigContext = React.createContext({});

export const Provider = ({ children }) => {
	const { resources } = useResources({ keys: ['categories', 'places', 'templates'] });
	const c = resources?.categories?.read();
	const p = resources?.places?.read();
	const t = resources?.templates?.read();
	const [categories, setCategories] = useState([]);
	const [places, setPlaces] = useState([]);
	const [templates, setTemplates] = useState([]);

	useEffect(() => {
		setCategories(c);
	}, [c]);

	useEffect(() => {
		setPlaces(p);
	}, [p]);

	useEffect(() => {
		setTemplates(t);
	}, [t]);

	const categoryProps = {
		categories,
		updateCategories: (v) => setCategories(v),
	};

	const placeProps = {
		places,
		updatePlaces: (v) => setPlaces(v),
	};

	const templateProps = {
		templates,
		updateTemplates: (v) => setTemplates(v),
	};

	const merged = {
		categoryProps,
		placeProps,
		templateProps,
	};

	return <ConfigContext.Provider value={merged}>{children}</ConfigContext.Provider>;
};
