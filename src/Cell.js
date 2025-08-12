import React, { useContext } from 'react';

import CellContext from './CellContext';

export function Cell({ x, y, width, height, cb }) {
    const { getDims } = useContext(CellContext);

    const dims = getDims(x, y, width, height);

    return cb(dims, { getDims });
}