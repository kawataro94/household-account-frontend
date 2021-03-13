import React from 'react';

import { yen } from '../style';

export const YenUnit = ({ style }) => {
    return <span css={yen(style)}>円</span>;
};
