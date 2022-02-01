import React, { useState } from 'react';
import { Canvas, Rect, ButtonTypes } from '@bucky24/react-canvas';
import { Map, MoveType, VAlign, Layer } from "@bucky24/react-canvas-map";


import RED_IMAGE from "./images/red.jpg";
import BLUE_IMAGE from "./images/blue.png";
import YELLOW_IMAGE from "./images/yellow.jpg";
import BACKGROUND from "./images/background.png";
import Figure from "./images/figure.jpg";
import { LayerImage, LayerPassthrough, LayerRaw, LayerText } from '../../src';

const GREEN_IMAGE = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Green_Arrow_Up.svg/600px-Green_Arrow_Up.svg.png";

const drawFunc = ({ x, y, width, height, id }) => {
    return <Rect
        key={id}
        x={x}
        y={y}
        x2={x+width}
        y2={y+height}
        color="#f00"
        fill={true}
    />
}

function App() {
    const width = 500;
    const height = 400;
	
	const [selectedTile, setSelectedTile] = useState({ x: 11, y: 3 });
	const [mouseOverTile, setMouseOverTile] = useState(null);

    return (<div>
        <Canvas
            width={width}
            height={height}
        >
            <Map
                renderLayersToImage={true}
                x={100}
                y={50}
                width={width-100}
                height={height-100}
                cellSize={30}
                xOff={0}
                yOff={0}
                minCellX={-5}
                minCellY={-5}
                maxCellX={10}
                maxCellY={30}
                moveType={MoveType.MOUSE}
                onMove={(x, y) => {
                    setMouseOverTile({
                        x,
                        y,
                    });
                }}
                onClick={(x, y, button) => {
                    console.log(button, "button clicked!");
                    if (button === ButtonTypes.LEFT)
                        setSelectedTile({
                            x,
                            y,
                        });
                    }
                }
                mapBackground={{
                    color: "#0a0",
                }}
                offMapBackground={{
                    color: "#000",
                }}
            >
                <Layer>
                    <LayerImage
                        src={GREEN_IMAGE}
                        width={2}
                        height={1}
                        x={selectedTile.x}
                        y={selectedTile.y}
                    />
                    <LayerImage
                        src={GREEN_IMAGE}
                        width={0.5}
                        height={0.5}
                        x={5}
                        y={2}
                        rot={0}
                    />
                    <LayerImage
                        src={RED_IMAGE}
                        width={0.5}
                        height={0.5}
                        x={5}
                        y={2}
                        xOff={0.5}
                        rot={90}
                   />
                    <LayerImage
                        src={BLUE_IMAGE}
                        width={0.5}
                        height={0.5}
                        x={5}
                        y={2}
                        xOff={0.5}
                        yOff={0.5}
                        rot={180}
                   />
                    <LayerImage
                        src={YELLOW_IMAGE}
                        width={0.5}
                        height={0.5}
                        x={5}
                        y={2}
                        yOff={0.5}
                        rot={270}
                   />
                    <LayerImage
                        src={Figure}
                        width={1}
                        height={1.5}
                        x={8}
                        y={5}
                        vAlign={VAlign.TOP}
                   /> 
                    <LayerImage
                        src={Figure}
                        width={1}
                        height={1.5}
                        x={9}
                        y={5}
                        vAlign={VAlign.CENTER}
                   />
                    <LayerImage
                        src={Figure}
                        width={1}
                        height={1.5}
                        x={10}
                        y={5}
                        vAlign={VAlign.BOTTOM}
                   />
                </Layer>
                <Layer>
                    <LayerText
                        text="left"
                        x={4}
                        y={6}
                        font="12px Arial"
                    />
                    <LayerText
                        text="right"
                        x={5}
                        y={6}
                        font="12px Arial"
                        hAlign="center"
                    />
                    <LayerText
                        text="mid"
                        x={7}
                        y={6}
                        font="12px Arial"
                        hAlign="center"
                    />
                    <LayerText
                        text="top"
                        x={4}
                        y={7}
                        font="12px Arial"
                    />
                    <LayerText
                        text="bot"
                        x={5}
                        y={7}
                        font="12px Arial"
                        vAlign="bottom"
                    />
                    <LayerText
                        text="mid"
                        x={7}
                        y={7}
                        font="12px Arial"
                        vAlign="center"
                    />
                    <LayerText
                        text="mult\nline\ntext"
                        x={4}
                        y={4}
                        font="8px Arial"
                    />
                    <LayerText
                        text="mult\nline\ntext"
                        x={5}
                        y={4}
                        font="8px Arial"
                        vAlign="bottom"
                    />
                    <LayerText
                        text="mult\nline\ntext"
                        x={6}
                        y={4}
                        font="8px Arial"
                        vAlign="center"
                    />
                </Layer>
                <Layer>
                    <LayerRaw
                        cells={[
                            {
                                cellX: 5,
                                cellY: 8,
                                cellWidth: 2,
                                cellHeight: 1,
                                id: 'square'
                            }
                        ]}
                        drawFunc={drawFunc}
                    />
                </Layer>
                <Layer>
                    <LayerPassthrough 
                        layer={{
                            images: [{
                                cellX: 0,
                                cellY: 10,
                                cellWidth: 1,
                                cellHeight: 1,
                                src: RED_IMAGE,
                            }]
                        }}
                    />
                </Layer>
            </Map>
        </Canvas>
        <div>
            Mouse over:&nbsp;
            { mouseOverTile ? mouseOverTile.x : "None" }
            &nbsp;/&nbsp;
            { mouseOverTile ? mouseOverTile.y : "None" }
        </div>
    </div>);
}

export default App;
