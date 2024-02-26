import React, { useCallback } from 'react';
import { Image } from '@bucky24/react-canvas';

import { Cell }  from './Cell';

export function LayerImage(props) {
    const { x, y, width, height, ...rest } = props;

    return <Cell x={x} y={y} height={height} width={width}
        cb={useCallback((dims) => {
            return <Image {...dims} {...rest} />
        },[rest])}
    />
}