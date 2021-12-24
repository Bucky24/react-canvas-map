import React, { useContext } from "react";

import MapLayer from "./MapLayer";
import MapContext from './MapContext';

export function Layer({ children }) {
    const mapContext = useContext(MapContext);

    const layerData = {
        images: [],
        text: [],
    };

    if (!Array.isArray(children)) {
        children = [children];
    }

    children = children.flat(5);

    for (const child of children) {
        if (!child) {
            // sometimes we get null as a child
            continue;
        }
        const props = child.props;
        if (props.src) {
            layerData.images.push({
                src: props.src,
                cellWidth: props.width,
                cellHeight: props.height,
                cellX: props.x,
                cellY: props.y,
                hAlign: props.hAlign,
                vAlign: props.vAlign,
                rot: props.rot,
                xOff: props.xOff,
                yOff: props.yOff,
            });
        } else if (props.text) {
            layerData.text.push({
                text: props.text,
                cellX: props.x,
                cellY: props.y,
                font: props.font,
                hAlign: props.hAlign,
                vAlign: props.vAlign,
            });
        } else if (props.cells) {
            layerData.raw = {
                ...props,
            };
        }
    }

    return (
        <MapLayer
            {...mapContext}
            layer={layerData}
        />
    );
};

// these are all just placeholders. Layer will look at them and handle all drawing
export function LayerImage({ src, x, y, width, height, hAlign, vAlign, rot }) {
    return null;
}

export function LayerText({ text, x, y, font, hAlign, vAlign }) {
    return null;
}

export function LayerRaw({ cells, drawFunc }) {
    return null;
}