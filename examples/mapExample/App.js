import React, { useState } from 'react';
import { Canvas } from '@bucky24/react-canvas';
import { Map } from "@bucky24/react-canvas-map";

const GREEN_IMAGE = "https://re-mm-assets.s3.amazonaws.com/product_photo/46595/large_large_Poly_Lime_374u_1471509935.jpg";
const RED_IMAGE = "http://sohme.com/wp-content/uploads/2015/07/red.png";
const BLUE_IMAGE = "http://clipart-library.com/img/980271.png";
const YELLOW_IMAGE = "https://www.iconsdb.com/icons/preview/yellow/square-xxl.png";


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
                            },
                            {
                                src: RED_IMAGE,
                                cellWidth: 0.5,
                                cellHeight: 0.5,
                                cellX: 5,
                                cellY: 2,
								xOff: 0.5,
                            },
                            {
                                src: BLUE_IMAGE,
                                cellWidth: 0.5,
                                cellHeight: 0.5,
                                cellX: 5,
                                cellY: 2,
								xOff: 0.5,
								yOff: 0.5,
                            },
                            {
                                src: YELLOW_IMAGE,
                                cellWidth: 0.5,
                                cellHeight: 0.5,
                                cellX: 5,
                                cellY: 2,
								yOff: 0.5,
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
