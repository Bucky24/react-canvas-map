import React, { useState } from 'react';
import { Canvas, Rect } from '@bucky24/react-canvas';
import { Map, MoveType, VAlign } from "@bucky24/react-canvas-map";


import RED_IMAGE from "./images/red.jpg";
import BLUE_IMAGE from "./images/blue.png";
import YELLOW_IMAGE from "./images/yellow.jpg";
import BACKGROUND from "./images/background.png";
import Figure from "./images/figure.jpg";

const GREEN_IMAGE = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Green_Arrow_Up.svg/600px-Green_Arrow_Up.svg.png";

const drawFunc = ({ x, y, width, height, id }) => {
    return <Rect
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
                x={50}
                y={50}
                width={width-100}
                height={height-100}
                cellSize={30}
                xOff={0}
                yOff={0}
                minCellX={-5}
                minCellY={-5}
                maxCellX={15}
                maxCellY={30}
                moveType={MoveType.MOUSE}
                onMove={(x, y) => {
                    setMouseOverTile({
                        x,
                        y,
                    });
                }}
                onClick={(x, y) => {
                    setSelectedTile({
                        x,
                        y,
                    });
                }}
                mapBackground={{
                    color: "#0a0",
                }}
                layers={[
                    {
                        images: [
                            {
                                src: GREEN_IMAGE,
                                cellWidth: 2,
                                cellHeight: 1,
                                cellX: selectedTile.x,
                                cellY: selectedTile.y,
                            },
                            {
                                src: GREEN_IMAGE,
                                cellWidth: 0.5,
                                cellHeight: 0.5,
                                cellX: 5,
                                cellY: 2,
                                rot: 0,
                            },
                            {
                                src: RED_IMAGE,
                                cellWidth: 0.5,
                                cellHeight: 0.5,
                                cellX: 5,
                                cellY: 2,
                                xOff: 0.5,
                                rot: 90,
                            },
                            {
                                src: BLUE_IMAGE,
                                cellWidth: 0.5,
                                cellHeight: 0.5,
                                cellX: 5,
                                cellY: 2,
								xOff: 0.5,
                                yOff: 0.5,
                                rot: 180,
                            },
                            {
                                src: YELLOW_IMAGE,
                                cellWidth: 0.5,
                                cellHeight: 0.5,
                                cellX: 5,
                                cellY: 2,
                                yOff: 0.5,
                                rot: 270,
                            },
                            {
                                src: Figure,
                                cellWidth: 1,
                                cellHeight: 1.5,
                                cellX: 8,
                                cellY: 5,
                                vAlign: VAlign.TOP,
                            }, 
                            {
                                src: Figure,
                                cellWidth: 1,
                                cellHeight: 1.5,
                                cellX: 9,
                                cellY: 5,
                                vAlign: VAlign.CENTER,
                            },
                            {
                                src: Figure,
                                cellWidth: 1,
                                cellHeight: 1.5,
                                cellX: 10,
                                cellY: 5,
                                vAlign: VAlign.BOTTOM,
                            },
                        ],
                    },
                    {
                        text: [
                            {
                                text: "left",
                                cellX: 4,
                                cellY: 6,
                                font: "12px Arial",
                            },
                            {
                                text: "right",
                                cellX: 5,
                                cellY: 6,
                                font: "12px Arial",
                                hAlign: "center",
                            },
                            {
                                text: "mid",
                                cellX: 7,
                                cellY: 6,
                                font: "12px Arial",
                                hAlign: "center",
                            },
                            {
                                text: "top",
                                cellX: 4,
                                cellY: 7,
                                font: "12px Arial",
                            },
                            {
                                text: "bot",
                                cellX: 5,
                                cellY: 7,
                                font: "12px Arial",
                                vAlign: "bottom",
                            },
                            {
                                text: "mid",
                                cellX: 7,
                                cellY: 7,
                                font: "12px Arial",
                                vAlign: "center",
                            },
                            {
                                text: "mult\nline\ntext",
                                cellX: 4,
                                cellY: 4,
                                font: "8px Arial",
                            },
                            {
                                text: "mult\nline\ntext",
                                cellX: 5,
                                cellY: 4,
                                font: "8px Arial",
                                vAlign: "bottom",
                            },
                            {
                                text: "mult\nline\ntext",
                                cellX: 6,
                                cellY: 4,
                                font: "8px Arial",
                                vAlign: "center",
                            },
                        ]
                    },
                    {
                        raw: {
                            cells: [
                                {
                                    cellX: 5,
                                    cellY: 8,
                                    cellWidth: 2,
                                    cellHeight: 1,
                                    id: 'square'
                                }
                            ],
                            drawFunc,
                        }
                    }
                ]}
            />
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
