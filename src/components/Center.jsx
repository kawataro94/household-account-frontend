import React from 'react';

import { flex, content } from './style';

const Center = ({ children, hasHeader }) => {
    return (
        <div css={flex(hasHeader)}>
            <div css={content}>{children}</div>
        </div>
    );
};

export default Center;
