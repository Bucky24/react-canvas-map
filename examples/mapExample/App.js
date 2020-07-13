import React, { useState } from 'react';
import { Canvas } from '@bucky24/react-canvas';
import { Map } from "@bucky24/react-canvas-map";

const GREEN_IMAGE = "https://cdn4.iconfinder.com/data/icons/social-messaging-ui-color-squares-01/3/33-512.png";
const RED_IMAGE = "https://cdn5.vectorstock.com/i/1000x1000/09/29/arrow-in-square-icon-digital-red-vector-18320929.jpg";
const BLUE_IMAGE = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Right-pointing_white_arrow_in_blue_rounded_square.svg/512px-Right-pointing_white_arrow_in_blue_rounded_square.svg.png";
const YELLOW_IMAGE = "https://previews.123rf.com/images/faysalfarhan/faysalfarhan1711/faysalfarhan171134535/89527541-next-arrow-icon-isolated-on-yellow-square-button-reflected-abstract-illustration.jpg";


function App() {
    const width = 500;
    const height = 400;
	
	const [selectedTile, setSelectedTile] = useState(null);
	const [mouseOverTile, setMouseOverTile] = useState(null);

    return (
        <Canvas
            width={width}
            height={height}
        >
            <Map
                x={50}
                y={50}
                width={width-100}
                height={height-100}
                cellSize={30}
                xOff={40}
                yOff={40}
                offMapBackground={{
                    image: "http://pixelartmaker.com/art/98f98269b16f5d9.png",
                }}
                layers={[
                    {
                        images: [
                            {
                                src: "https://www.rollingstone.com/wp-content/uploads/2018/06/foo-fighters-congrete-and-gold-review-9506116c-34b2-4619-bace-cf6df4db7bd9.jpg",
                                cellWidth: 2,
                                cellHeight: 1,
                                cellX: 11,
                                cellY: 3,
                            },
                            {
                                src: GREEN_IMAGE,
                                cellWidth: 0.5,
                                cellHeight: 0.5,
                                cellX: 5,
                                cellY: 2,
                                rot: 0
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
                                hAlign: "right",
                            },
                            {
                                text: "center",
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
                            },                            {
                                text: "bot",
                                cellX: 5,
                                cellY: 7,
                                font: "12px Arial",
                                vAlign: "bottom",
                            },                           {
                                text: "center",
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
                    }
                ]}
            />
        </Canvas>
    );
}

export default App;
