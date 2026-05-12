"use client"

import Field from "@/app/game/field";
import {useState} from "react";

export type BoardField = {
    id?: number;
    number: number;
    position: {
        x: number;
        y: number;
    }
    isHighlighted: boolean;
    colour: number;
}

export default function Board({ onFieldClick }: { onFieldClick: (field: BoardField) => void }) {

    const [showNumbers, setShowNumbers] = useState(true);

    const boardFields: BoardField[] = [
        {id: 211, number: 0, position: {x: 1, y: 1}, isHighlighted: true, colour: 1},
        {id: 212, number: 0, position: {x: 1, y: 2}, isHighlighted: true, colour: 1},
        {id: 213, number: 0, position: {x: 2, y: 1}, isHighlighted: true, colour: 1},
        {id: 214, number: 0, position: {x: 2, y: 2}, isHighlighted: true, colour: 1},
        {id: 221, number: 0, position: {x: 1, y: 10}, isHighlighted: true, colour: 2},
        {id: 222, number: 0, position: {x: 1, y: 11}, isHighlighted: true, colour: 2},
        {id: 223, number: 0, position: {x: 2, y: 10}, isHighlighted: true, colour: 2},
        {id: 224, number: 0, position: {x: 2, y: 11}, isHighlighted: true, colour: 2},
        {id: 231, number: 0, position: {x: 10, y: 10}, isHighlighted: true, colour: 3},
        {id: 232, number: 0, position: {x: 10, y: 11}, isHighlighted: true, colour: 3},
        {id: 233, number: 0, position: {x: 11, y: 10}, isHighlighted: true, colour: 3},
        {id: 234, number: 0, position: {x: 11, y: 11}, isHighlighted: true, colour: 3},
        {id: 241, number: 0, position: {x: 10, y: 1}, isHighlighted: true, colour: 4},
        {id: 242, number: 0, position: {x: 10, y: 2}, isHighlighted: true, colour: 4},
        {id: 243, number: 0, position: {x: 11, y: 1}, isHighlighted: true, colour: 4},
        {id: 244, number: 0, position: {x: 11, y: 2}, isHighlighted: true, colour: 4},
        {number: 10, position: {x: 6, y: 1}, isHighlighted: false, colour: 0},
        {number: 11, position: {x: 5, y: 1}, isHighlighted: true, colour: 1},
        {number: 12, position: {x: 5, y: 2}, isHighlighted: false, colour: 0},
        {number: 13, position: {x: 5, y: 3}, isHighlighted: false, colour: 0},
        {number: 14, position: {x: 5, y: 4}, isHighlighted: false, colour: 0},
        {number: 15, position: {x: 5, y: 5}, isHighlighted: false, colour: 0},
        {number: 16, position: {x: 4, y: 5}, isHighlighted: false, colour: 0},
        {number: 17, position: {x: 3, y: 5}, isHighlighted: false, colour: 0},
        {number: 18, position: {x: 2, y: 5}, isHighlighted: false, colour: 0},
        {number: 19, position: {x: 1, y: 5}, isHighlighted: false, colour: 0},
        {number: 20, position: {x: 1, y: 6}, isHighlighted: false, colour: 0},
        {number: 21, position: {x: 1, y: 7}, isHighlighted: true, colour: 2},
        {number: 22, position: {x: 2, y: 7}, isHighlighted: false, colour: 0},
        {number: 23, position: {x: 3, y: 7}, isHighlighted: false, colour: 0},
        {number: 24, position: {x: 4, y: 7}, isHighlighted: false, colour: 0},
        {number: 25, position: {x: 5, y: 7}, isHighlighted: false, colour: 0},
        {number: 26, position: {x: 5, y: 8}, isHighlighted: false, colour: 0},
        {number: 27, position: {x: 5, y: 9}, isHighlighted: false, colour: 0},
        {number: 28, position: {x: 5, y: 10}, isHighlighted: false, colour: 0},
        {number: 29, position: {x: 5, y: 11}, isHighlighted: false, colour: 0},
        {number: 30, position: {x: 6, y: 11}, isHighlighted: false, colour: 0},
        {number: 31, position: {x: 7, y: 11}, isHighlighted: true, colour: 3},
        {number: 32, position: {x: 7, y: 10}, isHighlighted: false, colour: 0},
        {number: 33, position: {x: 7, y: 9}, isHighlighted: false, colour: 0},
        {number: 34, position: {x: 7, y: 8}, isHighlighted: false, colour: 0},
        {number: 35, position: {x: 7, y: 7}, isHighlighted: false, colour: 0},
        {number: 36, position: {x: 8, y: 7}, isHighlighted: false, colour: 0},
        {number: 37, position: {x: 9, y: 7}, isHighlighted: false, colour: 0},
        {number: 38, position: {x: 10, y: 7}, isHighlighted: false, colour: 0},
        {number: 39, position: {x: 11, y: 7}, isHighlighted: false, colour: 0},
        {number: 40, position: {x: 11, y: 6}, isHighlighted: false, colour: 0},
        {number: 41, position: {x: 11, y: 5}, isHighlighted: true, colour: 4},
        {number: 42, position: {x: 10, y: 5}, isHighlighted: false, colour: 0},
        {number: 43, position: {x: 9, y: 5}, isHighlighted: false, colour: 0},
        {number: 44, position: {x: 8, y: 5}, isHighlighted: false, colour: 0},
        {number: 45, position: {x: 7, y: 5}, isHighlighted: false, colour: 0},
        {number: 46, position: {x: 7, y: 4}, isHighlighted: false, colour: 0},
        {number: 47, position: {x: 7, y: 3}, isHighlighted: false, colour: 0},
        {number: 48, position: {x: 7, y: 2}, isHighlighted: false, colour: 0},
        {number: 49, position: {x: 7, y: 1}, isHighlighted: false, colour: 0},
        {number: 111, position: {x: 6, y: 2}, isHighlighted: true, colour: 1},
        {number: 112, position: {x: 6, y: 3}, isHighlighted: true, colour: 1},
        {number: 113, position: {x: 6, y: 4}, isHighlighted: true, colour: 1},
        {number: 114, position: {x: 6, y: 5}, isHighlighted: true, colour: 1},
        {number: 121, position: {x: 2, y: 6}, isHighlighted: true, colour: 2},
        {number: 122, position: {x: 3, y: 6}, isHighlighted: true, colour: 2},
        {number: 123, position: {x: 4, y: 6}, isHighlighted: true, colour: 2},
        {number: 124, position: {x: 5, y: 6}, isHighlighted: true, colour: 2},
        {number: 131, position: {x: 6, y: 7}, isHighlighted: true, colour: 3},
        {number: 132, position: {x: 6, y: 8}, isHighlighted: true, colour: 3},
        {number: 133, position: {x: 6, y: 9}, isHighlighted: true, colour: 3},
        {number: 134, position: {x: 6, y: 10}, isHighlighted: true, colour: 3},
        {number: 141, position: {x: 7, y: 6}, isHighlighted: true, colour: 4},
        {number: 142, position: {x: 8, y: 6}, isHighlighted: true, colour: 4},
        {number: 143, position: {x: 9, y: 6}, isHighlighted: true, colour: 4},
        {number: 144, position: {x: 10, y: 6}, isHighlighted: true, colour: 4},
    ];

    const normalFields = boardFields.map(field => (
        <div key={field.id ?? field.number} style={{top: `${field.position.x * 50}px`, left: `${field.position.y * 50}px`, position: "absolute", width: "50px", height: "50px", padding: "5px"}}>
            <Field field={field} showNumbers={showNumbers} onFieldClick={onFieldClick}/>
        </div>
    ));
    return <>

        <button onClick={() => setShowNumbers(!showNumbers)}>Toggle numbers</button>

        <div style={{width: "800px", height: "800px", position: "relative"}}>

            {normalFields}

        </div>

    </>;
}
