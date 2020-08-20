import PropTypes from 'prop-types';

import { VAlign, HAlign } from "./enums";

export const Layer = PropTypes.shape({
    images: PropTypes.arrayOf(PropTypes.shape({
        src: PropTypes.string.isRequired,
        cellWidth: PropTypes.number.isRequired,
        cellHeight: PropTypes.number.isRequired,
        cellX: PropTypes.number.isRequired,
        cellY: PropTypes.number.isRequired,
		xOff: PropTypes.number,
        yOff: PropTypes.number,
        rot: PropTypes.number,
        vAlign: PropTypes.oneOf(Object.values(VAlign)),
    })),
    text: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string.isRequired,
        cellX: PropTypes.number.isRequired,
        cellY: PropTypes.number.isRequired,
        vAlign: PropTypes.oneOf(Object.values(VAlign)),
        hAlign: PropTypes.oneOf(Object.values(HAlign)),
        font: PropTypes.string.isRequired,
    })),
    raw: PropTypes.shape({
        cells: PropTypes.arrayOf(PropTypes.shape({
            cellX: PropTypes.number.isRequired,
            cellY: PropTypes.number.isRequired,
            cellWidth: PropTypes.number.isRequired,
            cellHeight: PropTypes.number.isRequired,
            id: PropTypes.any,
        })).isRequired,
        drawFunc: PropTypes.func.isRequired,
    }),
});

export const Background = PropTypes.shape({
    color: PropTypes.string,
    image: PropTypes.string,
});
