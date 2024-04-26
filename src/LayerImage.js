import React, { useCallback } from 'react';
import { Image } from '@bucky24/react-canvas';

import { Cell }  from './Cell';

export function LayerImage(props) {
    const { x, y, width, height, xOff, yOff, ...rest } = props;

    return <Cell x={x+ (xOff ?? 0)} y={y + (yOff ?? 0)} height={height} width={width}
        cb={useCallback((dims) => {
            return <Image {...dims} {...rest} />
        },[rest])}
    />
}