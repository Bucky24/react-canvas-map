import React, { useCallback } from 'react';
import { Text } from '@bucky24/react-canvas';

import { Cell }  from './Cell';

export function LayerText(props) {
    const { x, y, width, height, children, ...rest } = props;

    const useWidth = width === undefined ? 1 : width;
    const useHeight = height === undefined ? 1 : height;

    return <Cell x={x} y={y} height={useHeight} width={useWidth}
        cb={useCallback((dims) => {
            return <Text {...dims} {...rest}>{children}</Text>
        },[children])}
    />
}