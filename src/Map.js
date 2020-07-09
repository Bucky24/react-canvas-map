import React from 'react';
import PropTypes from 'prop-types';
import { CanvasComponent, Rect } from '@bucky24/react-canvas';

import { Layer, Background } from './shapes';

import MapLines from './MapLines';
import MapLayer from './MapLayer';
import MapBackground from './MapBackground';

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
};

const defaultProps = {
    layers: []
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
        };
    }
    onMouseMove({ x, y }, overMe) {
        if (this.state.mouseDown) {
            const dx = this.state.mx - x;
            const dy = this.state.my - y;
            this.setState({
                mx: x,
                my: y,
                xOff: this.state.xOff - dx,
                yOff: this.state.yOff - dy,
            });
        }
    }
    onMouseDown({ x, y, button }, overMe) {
        if (overMe) {
            this.setState({
                mouseDown: true,
                mx: x,
                my: y,
            });
        }
    }
    onMouseUp({ x, y, button }, overMe) {
        this.setState({
            mouseDown: false,
        });
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
