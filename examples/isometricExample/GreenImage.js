import React, { useContext } from 'react';
import { Image } from '@bucky24/react-canvas';
import { CellContext } from '@bucky24/react-canvas-map';

const GREEN_IMAGE = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Green_Arrow_Up.svg/600px-Green_Arrow_Up.svg.png";

export default function GreenImage({ x, y }) {
    const { getDims } = useContext(CellContext);

    const dims = getDims(x, y, 2, 2);

    return <Image src={GREEN_IMAGE} {...dims} />
}