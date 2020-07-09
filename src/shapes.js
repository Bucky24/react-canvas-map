import PropTypes from 'prop-types';

export const Layer = PropTypes.shape({
    images: PropTypes.arrayOf(PropTypes.shape({
        src: PropTypes.string.isRequired,
        cellWidth: PropTypes.number.isRequired,
        cellHeight: PropTypes.number.isRequired,
        cellX: PropTypes.number.isRequired,
        cellY: PropTypes.number.isRequired,
		xOff: PropTypes.number,
		yOff: PropTypes.number,
    })),
    text: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string.isRequired,
        cellX: PropTypes.number.isRequired,
        cellY: PropTypes.number.isRequired,
        vAlign: PropTypes.oneOf(["top", "center", "bottom"]),
        hAlign: PropTypes.oneOf(["left", "center", "right"]),
        font: PropTypes.string.isRequired,
    })),
});

export const Background = PropTypes.shape({
    color: PropTypes.string,
    image: PropTypes.string,
});
