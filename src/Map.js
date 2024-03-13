import React, { useContext, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { CanvasComponent, Rect, Shape, CanvasContext } from '@bucky24/react-canvas';
import isEqual from 'react-fast-compare';

import { Layer, Background } from './shapes';

import MapLines from './MapLines';
import MapLayer from './MapLayer';
import MapBackground from './MapBackground';
import { MoveType, ZoomType, MapType } from "./enums";
import { MapProvider } from './MapContext';
import useRealToCell from './useRealToCell';

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
    type: PropTypes.oneOf(Object.values(MapType)),
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
    type: MapType.STANDARD,
};

class Map extends CanvasComponent {
    constructor(props) {
        super(props);

        this.state = {
            mx: null,
            my: null,
            smx: null,
            smy: null,
            mouseCell: {
                x: null,
                y: null,
            },
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

        const xOff = this.props.xOff || 0;
        const yOff = this.props.yOff || 0;

        this.setState({
            extra: cell.extra,
        });

        if (
            overMe &&
            (
                cell.x !== this.state.mouseCell.x ||
                cell.y !== this.state.mouseCell.y
            )
        ) {
            this.props.onMove(cell.x, cell.y);
        }

        if (this.props.mouseDown && this.props.moveType === MoveType.MOUSE) {
            const dx = this.state.mx - x;
            const dy = this.state.my - y;
            this.props.setOff(xOff-dx, yOff-dy);
            this.setState({
                mx: x,
                my: y,
                mouseCell: cell,
            });
        } else {
            this.setState({
                mx: x,
                my: y,
            });
            if (overMe) {
                this.setState({
                    mouseCell: cell,
                });
            }
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
                smx: x,
                smy: y,
            });
            this.props.setMouseDown(true);
        }
    }

    onMouseUp({ x, y, button }, overMe) {
        const moved = x !== this.state.smx || y !== this.state.smy;
        if (overMe && !moved) {
            const cell = this.cellFromReal(x, y);
            this.props.onClick(cell.x, cell.y, button, x, y);
        }
        this.setState({
            smx: null,
            smy: null,
        });
        this.props.setMouseDown(false);
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
            const zoom = this.props.zoom || 100;

            let newZoom = zoom + delta;
            newZoom = Math.min(200, Math.max(10, newZoom));
            this.props.setZoom(newZoom);
        }
    }

    cellFromReal(rx, ry) {
        return this.props.realToCell(rx, ry);
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
            hideGrid,
            type,
            zoomType,
        } = this.props;

        const xOff = this.state.xOff || this.props.xOff || 0;
        const yOff = this.state.yOff || this.props.yOff || 0;
        let zoom = this.props.zoom || 100;
        if (zoomType === ZoomType.NONE) {
            zoom = 100;
        }

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
                offMap={true}
            />}
            {!offMapBackground && <Rect
                x={Math.max(minCellX*realCellSize+x+xOff)}
                y={Math.max(minCellY*realCellSize+y+yOff)}
                x2={Math.min(x+width, x+xOff+realCellSize*maxCellX)}
                y2={Math.min(y+height, y+yOff+realCellSize*maxCellY)}
                color="#fff"
                fill={true}
            />}
            { mapBackground && <MapBackground
                background={mapBackground}
                offMap={false}
            />}
            {layers}
            {!hideGrid && (
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
                    type={type}
                />
            )}
            { children }
            <Rect
                x={x}
                y={y}
                x2={x+width}
                y2={y+height}
                color="#000"
                fill={false}
            />
            {this.state.extra && <>
               {this.state.extra.dims && this.state.extra.dims.map((dims) => {
                    return <Shape
                        points={dims}
                        color="#f00"
                        fill={false}
                        x={0}
                        y={0}
                        close={true}
                    />
               })}
            </>}
        </>;
    }
}

Map.propTypes = propTypes;
Map.defaultProps = defaultProps;

const MapHookWrapper = (props) => {
    const realToCell = useRealToCell();

    return (
        <Map
            {...props}
            realToCell={realToCell}
        />
    );
}

const MapWrapper = (props) => {
    // copy to make it extendable
    props = {...props};
    // setting default props
    if (!props.onMove) props.onMove = () => {};
    if (!props.onClick) props.onClick = () => {};
    if (!props.moveType) props.moveType = MoveType.MOUSE;
    if (!props.zoomType) props.zoomType = ZoomType.MOUSE;
    if (!props.minCellX) props.minCellX = 0;
    if (!props.minCellY) props.minCellY = 0;
    if (!props.maxCellX) props.maxCellX = 20;
    if (!props.maxCellY) props.maxCellY = 20;
    if (!props.cellSize) props.cellSize = 25;
    if (!props.type) props.type = MapType.STANDARD;

    const [xOff, setXOff] = useState(props.xOff || 0);
    const [yOff, setYOff] = useState(props.yOff || 0);
    const [zoom, setZoom] = useState(props.zoom || 100);
    const { forceRenderCount } = useContext(CanvasContext);
    // needs to be at this level so that changing mouse down triggers a render
    // here and not in the Map component (which won't actually rerender
    // for some reason)
    const [mouseDown, setMouseDown] = useState(false);

    const { cellSize, maxCellX, maxCellY, minCellX, minCellY, x, y, width, height, type } = props;

    const initialCellSize = useRef(cellSize);

    const zoomUnit = Math.abs(zoom) / 100;
    const realCellSize = cellSize * zoomUnit;

    return (
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
            type={type || MapType.STANDARD}
            zoom={zoom}
            initialCellSize={initialCellSize.current}
        >
            <MapHookWrapper
                {...props}
                xOff={xOff}
                yOff={yOff}
                setOff={(x, y) => {
                    setXOff(x);
                    setYOff(y);
                }}
                zoom={zoom}
                setZoom={(zoom) => {
                    setZoom(zoom);
                }}
                mouseDown={mouseDown}
                setMouseDown={setMouseDown}
                initialCellSize={initialCellSize.current}
            />
        </MapProvider>
    );
}

MapProvider.propTypes = propTypes;
MapProvider.defaultProps = defaultProps;

export default MapWrapper;
