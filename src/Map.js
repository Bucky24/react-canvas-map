import React from 'react';
import PropTypes from 'prop-types';
import { CanvasComponent, Rect, ButtonTypes } from '@bucky24/react-canvas';
import isEqual from 'react-fast-compare';

import { Layer, Background } from './shapes';

import MapLines from './MapLines';
import MapLayer from './MapLayer';
import MapBackground from './MapBackground';
import { MoveType, ZoomType } from "./enums";
import { MapProvider } from './MapContext';

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
    zoomType: PropTypes.oneOf(Object.values(ZoomType)),
    zoom: PropTypes.number,
    minCellX: PropTypes.number,
    minCellY: PropTypes.number,
    maxCellX: PropTypes.number,
    maxCellY: PropTypes.number,
    renderLayersToImage: PropTypes.bool,
};

const defaultProps = {
    layers: [],
    onMove: () => {},
    onClick: () => {},
    moveType: MoveType.MOUSE,
    zoomType: ZoomType.MOUSE,
    minCellX: 0,
    minCellY: 0,
    maxCellX: 20,
    maxCellY: 20,
    cellSize: 25,
    renderLayersToImage: false,
};

class Map extends CanvasComponent {
    constructor(props) {
        super(props);

        this.state = {
            xOff: null,
            yOff: null,
            mouseDown: false,
            mx: null,
            my: null,
            smx: null,
            smy: null,
            mouseCell: {
                x: null,
                y: null,
            },
            zoom: null,
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

    shouldComponentUpdate(nextProps, nextState) {
        const propsEqual = isEqual(this.props, nextProps);
        if (!propsEqual) {
            return true;
        }

        // filter out mx, my, mouseCell, because those change
        // when the mouse is moved and there's really no need to
        /// re-render then
        const stateEqual = isEqual({
            ...this.state,
            mx: null,
            my: null,
            mouseCell: null,
        }, {
            ...nextState,
            mx: null,
            my: null,
            mouseCell: null,
        });

        return !stateEqual;
    }

    onMouseMove({ x, y }, overMe) {
        const cell = this.cellFromReal(x, y);

        const xOff = this.state.xOff || this.props.xOff || 0;
        const yOff = this.state.yOff || this.props.yOff || 0;

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
                xOff: xOff - dx,
                yOff: yOff - dy,
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

    onMouseDown({ x, y }, overMe) {
        if (overMe) {
            this.setState({
                mouseDown: true,
                smx: x,
                smy: y,
            });
        }
    }

    onMouseUp({ x, y, button }, overMe) {
        const moved = x !== this.state.smx || y !== this.state.smy;
        this.setState({
            mouseDown: false,
            smx: null,
            smy: null,
        });
        if (overMe && !moved) {
            const cell = this.cellFromReal(x, y);
            this.props.onClick(cell.x, cell.y, button, x, y);
        }
    }

    onWheel({ up }, overMe) {
        if (!overMe) {
            return;
        }

        let delta = 10;

        if (!up) {
            delta = -delta;
        }

        if (this.props.zoomType == ZoomType.MOUSE) {
            const zoom = this.state.zoom || this.props.zoom || 100;

            let newZoom = zoom + delta;
            newZoom = Math.min(200, Math.max(10, newZoom));
            this.setState({
                zoom: newZoom,
            });
        }
    }

    cellFromReal(rx, ry) {
        const { x, y, width, height, cellSize } = this.props;
        const xOff = this.state.xOff || this.props.xOff || 0;
        const yOff = this.state.yOff || this.props.yOff || 0;       
        const zoom = this.state.zoom || this.props.zoom || 100;

        const zoomUnit = Math.abs(zoom) / 100;
        const realCellSize = cellSize * zoomUnit;

        if (rx < x || ry < y || rx > x + width || ry > y + height) {
            return {
                x: null,
                y: null,
            };
        }

        const shiftX = rx - x - xOff;
        const shiftY = ry - y - yOff;
        const cellX = Math.floor(shiftX/realCellSize);
        const cellY = Math.floor(shiftY/realCellSize);

        return {
            x: cellX,
            y: cellY,
        };
    }

    render() {
        const {
            x,
            y,
            width,
            height,
            cellSize,
            layers,
            mapBackground,
            offMapBackground,
            minCellX,
            minCellY,
            maxCellX,
            maxCellY,
            children,
        } = this.props;
        const { forceRenderCount } = this.context;

        const xOff = this.state.xOff || this.props.xOff || 0;
        const yOff = this.state.yOff || this.props.yOff || 0;
        const zoom = this.state.zoom || this.props.zoom || 100;

        const zoomUnit = Math.abs(zoom) / 100;
        const realCellSize = cellSize * zoomUnit;

        this.bounds = {
            x,
            y,
            width,
            height,
        };

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
                minX={0}
                minY={0}
                viewX={x}
                viewY={y}
                maxX={width}
                maxY={height}
                viewWidth={width}
                viewHeight={height}
                cellSize={realCellSize}
                xOff={0}
                yOff={0}
            />}
            <Rect
                x={Math.max(minCellX*realCellSize+x+xOff)}
                y={Math.max(minCellY*realCellSize+y+yOff)}
                x2={Math.min(x+width, x+xOff+realCellSize*maxCellX)}
                y2={Math.min(y+height, y+yOff+realCellSize*maxCellY)}
                color="#fff"
                fill={true}
            />
            { mapBackground && <MapBackground
                background={mapBackground}
                minX={minCellX*realCellSize}
                minY={minCellY*realCellSize}
                viewX={x}
                viewY={y}
                maxX={maxCellX*realCellSize}
                maxY={maxCellY*realCellSize}
                viewWidth={width}
                viewHeight={height}
                cellSize={realCellSize}
                xOff={xOff}
                yOff={yOff}
            />}
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
                    cellSize={realCellSize}
                    cellWidth={maxCellX}
                    cellHeight={maxCellY}
                    rerender={() => {
                        this.context.forceRerender();
                    }}
                    minCellX={minCellX}
                    minCellY={minCellY}
                    renderAsImage={this.props.renderLayersToImage}
                    forceRenderCount={forceRenderCount}
                />;
            }) }
            <MapProvider
                xOff={xOff}
                yOff={yOff}
                cellSize={realCellSize}
                cellWidth={maxCellX}
                cellHeight={maxCellY}
                minCellX={minCellX}
                minCellY={minCellY}
                x={x}
                y={y}
                width={width}
                height={height}
                forceRenderCount={forceRenderCount}
            >
                { children }
            </MapProvider>
            <MapLines
                x={x}
                y={y}
                width={width}
                height={height}
                minCellX={minCellX}
                minCellY={minCellY}
                maxCellX={maxCellX}
                maxCellY={maxCellY}
                cellSize={realCellSize}
                color="#aaa"
                xOff={xOff}
                yOff={yOff}
            />
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
