import React from 'react';
import PropTypes from 'prop-types';
import { CanvasComponent, Rect, ButtonTypes } from '@bucky24/react-canvas';

import { Layer, Background } from './shapes';

import MapLines from './MapLines';
import MapLayer from './MapLayer';
import MapBackground from './MapBackground';

export const MoveType = {
    MOUSE: "mouse",
    KEYBOARD_ARROW: "keyboard_arrow",
};

const propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    cellSize: PropTypes.number.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    layers: PropTypes.arrayOf(Layer),
    mapBackground: Background,
    offMapBackground: Background, 
    xOff: PropTypes.number,
    yOff: PropTypes.number,
    onMove: PropTypes.func,
    onClick: PropTypes.func,
    moveType: PropTypes.oneOf(Object.values(MoveType)),
};

const defaultProps = {
    layers: [],
    onMove: () => {},
    onClick: () => {},
    moveType: MoveType.MOUSE,
};

class Map extends CanvasComponent {
    constructor(props) {
        super(props);

        this.state = {
            xOff: props.xOff || 0,
            yOff: props.yOff || 0,
            mouseDown: false,
            mx: null,
            my: null,
            mouseCell: {
                x: null,
                y: null,
            }
        };
    }

    handleDimensions() {
        const { x, y, width, height } = this.props;

        this.bounds = { x, y, width, height };
    }

    componentDidMount() {
        super.componentDidMount();
        this.handleDimensions();
    }

    componentDidUpdate() {
        this.handleDimensions();
    }

    onMouseMove({ x, y }, overMe) {
        const cell = this.cellFromReal(x, y);

        if (
            overMe &&
            (
                cell.x !== this.state.mouseCell.x ||
                cell.y !== this.state.mouseCell.y
            )
        ) {
            this.props.onMove(cell.x, cell.y);
        }

        if (this.state.mouseDown && this.props.moveType === MoveType.MOUSE) {
            const dx = this.state.mx - x;
            const dy = this.state.my - y;
            this.setState({
                mx: x,
                my: y,
                xOff: this.state.xOff - dx,
                yOff: this.state.yOff - dy,
                mouseCell: cell,
            });
        } else {
            this.setState({
                mx: x,
                my: y,
                mouseCell: cell,
            });
        }
    }

    onKeyDown({ code }) {
        if (this.props.moveType === MoveType.KEYBOARD_ARROW) {
            if (code === "ArrowLeft") {
                this.setState({
                    xOff: this.state.xOff + 5,
                });
            } else if (code === "ArrowRight") {
                this.setState({
                    xOff: this.state.xOff - 5,
                });
            }
            if (code === "ArrowUp") {
                this.setState({
                    yOff: this.state.yOff + 5,
                });
            } else if (code === "ArrowDown") {
                this.setState({
                    yOff: this.state.yOff - 5,
                });
            }
        }
    }

    onMouseDown({ x, y, button }, overMe) {
        if (overMe && button === ButtonTypes.RIGHT) {
            this.setState({
                mouseDown: true,
            });
        }
    }

    onMouseUp({ x, y, button }, overMe) {
        this.setState({
            mouseDown: false,
        });
        if (button === ButtonTypes.LEFT) {
            const cell = this.cellFromReal(x, y);
            this.props.onClick(cell.x, cell.y);
        }
    }

    cellFromReal(rx, ry) {
        const { x, y, width, height, cellSize } = this.props;
        const { xOff, yOff } = this.state;

        if (rx < x || ry < y || rx > x + width || ry > y + height) {
            return {
                x: null,
                y: null,
            };
        }

        const shiftX = rx - x - xOff;
        const shiftY = ry - x - yOff;
        const cellX = Math.floor(shiftX/cellSize);
        const cellY = Math.floor(shiftY/cellSize);

        return {
            x: cellX,
            y: cellY,
        };
    }

    render() {
        const { x, y, width, height, cellSize, layers, mapBackground, offMapBackground } = this.props;
        const { xOff, yOff } = this.state;

        this.bounds = {
            x,
            y,
            width,
            height,
        };

        const maxCellX = 20;
        const maxCellY = 20;

        return <>
            <Rect
                x={x}
                y={y}
                x2={x+width}
                y2={y+height}
                color="#fff"
                fill={true}
            />
            { offMapBackground && <MapBackground
                background={offMapBackground}
                x={x}
                y={y}
                width={width}
                height={height}
                cellSize={cellSize}
                xOff={xOff}
                yOff={yOff}
            />}
            <Rect
                x={Math.max(x, x+xOff)}
                y={Math.max(y, y+yOff)}
                x2={Math.min(x+width, x+xOff+cellSize*maxCellX)}
                y2={Math.min(y+height, y+yOff+cellSize*maxCellY)}
                color="#fff"
                fill={true}
            />
            { mapBackground && <MapBackground
                background={mapBackground}
                x={Math.max(x, x+xOff)}
                y={Math.max(y, y+yOff)}
                width={width}
                height={height}
                cellSize={cellSize}
                xOff={0}
                yOff={0}
            />}
            <MapLines
                x={x}
                y={y}
                width={width}
                height={height}
                minCellX={0}
                minCellY={0}
                maxCellX={maxCellX}
                maxCellY={maxCellY}
                cellSize={cellSize}
                color="#aaa"
                xOff={xOff}
                yOff={yOff}
            />
            { layers.map((layer, i) => {
                return <MapLayer
                    key={`layer_${i}`}
                    layer={layer}
                    x={x}
                    y={y}
                    width={width}
                    height={height}
                    xOff={xOff}
                    yOff={yOff}
                    cellSize={cellSize}
                    cellWidth={maxCellX}
                    cellHeight={maxCellY}
                />;
            }) }
            <Rect
                x={x}
                y={y}
                x2={x+width}
                y2={y+height}
                color="#000"
                fill={false}
            />
        </>;
    }
}

Map.propTypes = propTypes;
Map.defaultProps = defaultProps;

export default Map;
