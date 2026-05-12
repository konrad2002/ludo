"use client"

import Field, {getColourByNumber} from "@/app/game/field";
import {useEffect, useState} from "react";
import {MoveResult, MoveSelectionRequest} from "@/app/game/game";

export type BoardField = {
    id: number;
    number: number;
    position: {
        x: number;
        y: number;
    }
    isColoured: boolean;
    isHighlighted?: boolean;
    colour: number;
}

export type BoardFigure = {
    id: number;
    player: number;
    position: {
        x: number;
        y: number;
    }
}

export default function Board({moveResults, moveSelectionRequest, onFieldClick}: {
    moveResults: MoveResult[],
    moveSelectionRequest: MoveSelectionRequest,
    onFieldClick: (field: BoardField) => void
}) {

    const [showNumbers, setShowNumbers] = useState(false);
    const [figures, setFigures] = useState<BoardFigure[]>([]);
    const [boardFields, setBoardFields] = useState<BoardField[]>([
        {id: 211, number: 0, position: {x: 1, y: 1}, isColoured: true, colour: 1},
        {id: 212, number: 0, position: {x: 1, y: 2}, isColoured: true, colour: 1},
        {id: 213, number: 0, position: {x: 2, y: 1}, isColoured: true, colour: 1},
        {id: 214, number: 0, position: {x: 2, y: 2}, isColoured: true, colour: 1},
        {id: 221, number: 0, position: {x: 1, y: 10}, isColoured: true, colour: 2},
        {id: 222, number: 0, position: {x: 1, y: 11}, isColoured: true, colour: 2},
        {id: 223, number: 0, position: {x: 2, y: 10}, isColoured: true, colour: 2},
        {id: 224, number: 0, position: {x: 2, y: 11}, isColoured: true, colour: 2},
        {id: 231, number: 0, position: {x: 10, y: 10}, isColoured: true, colour: 3},
        {id: 232, number: 0, position: {x: 10, y: 11}, isColoured: true, colour: 3},
        {id: 233, number: 0, position: {x: 11, y: 10}, isColoured: true, colour: 3},
        {id: 234, number: 0, position: {x: 11, y: 11}, isColoured: true, colour: 3},
        {id: 241, number: 0, position: {x: 10, y: 1}, isColoured: true, colour: 4},
        {id: 242, number: 0, position: {x: 10, y: 2}, isColoured: true, colour: 4},
        {id: 243, number: 0, position: {x: 11, y: 1}, isColoured: true, colour: 4},
        {id: 244, number: 0, position: {x: 11, y: 2}, isColoured: true, colour: 4},
        {id: 10, number: 10, position: {x: 6, y: 1}, isColoured: false, colour: 0},
        {id: 11, number: 11, position: {x: 5, y: 1}, isColoured: true, colour: 1},
        {id: 12, number: 12, position: {x: 5, y: 2}, isColoured: false, colour: 0},
        {id: 13, number: 13, position: {x: 5, y: 3}, isColoured: false, colour: 0},
        {id: 14, number: 14, position: {x: 5, y: 4}, isColoured: false, colour: 0},
        {id: 15, number: 15, position: {x: 5, y: 5}, isColoured: false, colour: 0},
        {id: 16, number: 16, position: {x: 4, y: 5}, isColoured: false, colour: 0},
        {id: 17, number: 17, position: {x: 3, y: 5}, isColoured: false, colour: 0},
        {id: 18, number: 18, position: {x: 2, y: 5}, isColoured: false, colour: 0},
        {id: 19, number: 19, position: {x: 1, y: 5}, isColoured: false, colour: 0},
        {id: 20, number: 20, position: {x: 1, y: 6}, isColoured: false, colour: 0},
        {id: 21, number: 21, position: {x: 1, y: 7}, isColoured: true, colour: 2},
        {id: 22, number: 22, position: {x: 2, y: 7}, isColoured: false, colour: 0},
        {id: 23, number: 23, position: {x: 3, y: 7}, isColoured: false, colour: 0},
        {id: 24, number: 24, position: {x: 4, y: 7}, isColoured: false, colour: 0},
        {id: 25, number: 25, position: {x: 5, y: 7}, isColoured: false, colour: 0},
        {id: 26, number: 26, position: {x: 5, y: 8}, isColoured: false, colour: 0},
        {id: 27, number: 27, position: {x: 5, y: 9}, isColoured: false, colour: 0},
        {id: 28, number: 28, position: {x: 5, y: 10}, isColoured: false, colour: 0},
        {id: 29, number: 29, position: {x: 5, y: 11}, isColoured: false, colour: 0},
        {id: 30, number: 30, position: {x: 6, y: 11}, isColoured: false, colour: 0},
        {id: 31, number: 31, position: {x: 7, y: 11}, isColoured: true, colour: 3},
        {id: 32, number: 32, position: {x: 7, y: 10}, isColoured: false, colour: 0},
        {id: 33, number: 33, position: {x: 7, y: 9}, isColoured: false, colour: 0},
        {id: 34, number: 34, position: {x: 7, y: 8}, isColoured: false, colour: 0},
        {id: 35, number: 35, position: {x: 7, y: 7}, isColoured: false, colour: 0},
        {id: 36, number: 36, position: {x: 8, y: 7}, isColoured: false, colour: 0},
        {id: 37, number: 37, position: {x: 9, y: 7}, isColoured: false, colour: 0},
        {id: 38, number: 38, position: {x: 10, y: 7}, isColoured: false, colour: 0},
        {id: 39, number: 39, position: {x: 11, y: 7}, isColoured: false, colour: 0},
        {id: 40, number: 40, position: {x: 11, y: 6}, isColoured: false, colour: 0},
        {id: 41, number: 41, position: {x: 11, y: 5}, isColoured: true, colour: 4},
        {id: 42, number: 42, position: {x: 10, y: 5}, isColoured: false, colour: 0},
        {id: 43, number: 43, position: {x: 9, y: 5}, isColoured: false, colour: 0},
        {id: 44, number: 44, position: {x: 8, y: 5}, isColoured: false, colour: 0},
        {id: 45, number: 45, position: {x: 7, y: 5}, isColoured: false, colour: 0},
        {id: 46, number: 46, position: {x: 7, y: 4}, isColoured: false, colour: 0},
        {id: 47, number: 47, position: {x: 7, y: 3}, isColoured: false, colour: 0},
        {id: 48, number: 48, position: {x: 7, y: 2}, isColoured: false, colour: 0},
        {id: 49, number: 49, position: {x: 7, y: 1}, isColoured: false, colour: 0},
        {id: 111, number: 111, position: {x: 6, y: 2}, isColoured: true, colour: 1},
        {id: 112, number: 112, position: {x: 6, y: 3}, isColoured: true, colour: 1},
        {id: 113, number: 113, position: {x: 6, y: 4}, isColoured: true, colour: 1},
        {id: 114, number: 114, position: {x: 6, y: 5}, isColoured: true, colour: 1},
        {id: 121, number: 121, position: {x: 2, y: 6}, isColoured: true, colour: 2},
        {id: 122, number: 122, position: {x: 3, y: 6}, isColoured: true, colour: 2},
        {id: 123, number: 123, position: {x: 4, y: 6}, isColoured: true, colour: 2},
        {id: 124, number: 124, position: {x: 5, y: 6}, isColoured: true, colour: 2},
        {id: 131, number: 131, position: {x: 6, y: 10}, isColoured: true, colour: 3},
        {id: 132, number: 132, position: {x: 6, y: 9}, isColoured: true, colour: 3},
        {id: 133, number: 133, position: {x: 6, y: 8}, isColoured: true, colour: 3},
        {id: 134, number: 134, position: {x: 6, y: 7}, isColoured: true, colour: 3},
        {id: 141, number: 141, position: {x: 10, y: 6}, isColoured: true, colour: 4},
        {id: 142, number: 142, position: {x: 9, y: 6}, isColoured: true, colour: 4},
        {id: 143, number: 143, position: {x: 8, y: 6}, isColoured: true, colour: 4},
        {id: 144, number: 144, position: {x: 7, y: 6}, isColoured: true, colour: 4},
    ]);

    useEffect(() => {
        const usedIds = new Set<number>();
        const figs = moveResults.map(r => {
            return r.pieces.map(p => {
                let found = false;
                let field = {id: 0} as BoardField;
                while (usedIds.has(field.id) || !found) {
                    field = boardFields.find(f => f.number === p && !usedIds.has(f.id) && (p === 0 ? f.colour === r.player : true))!;
                    found = true;
                    console.log("loop")
                }

                usedIds.add(field.id);

                return {
                    id: 1000 + field.id,
                    player: r.player,
                    position: field.position
                } as BoardFigure;
            });
        }).flat();

        console.log("Updating figures", figs);
        setFigures(figs);
    }, [moveResults]);

    useEffect(() => {
        setBoardFields(prev =>
            prev.map(field => {
                const shouldHighlight =
                    moveSelectionRequest.pieces.includes(field.number) &&
                    (field.colour === moveSelectionRequest.player || field.number !== 0);

                if (shouldHighlight) {
                    moveSelectionRequest.pieces = moveSelectionRequest.pieces.filter(
                        p => p !== field.number
                    );

                    return {
                        ...field,
                        isHighlighted: true,
                    };
                }

                return {
                    ...field,
                    isHighlighted: false,
                };
            })
        );
    }, [moveSelectionRequest]);

    const normalFields = boardFields.map(field => (
        <div key={field.id} style={{
            top: `${field.position.x * 50}px`,
            left: `${field.position.y * 50}px`,
            position: "absolute",
            width: "50px",
            height: "50px",
            padding: "5px"
        }}>
            <Field field={field} showNumbers={showNumbers} onFieldClick={onFieldClick}/>
        </div>
    ));

    const figureElements = figures.map(figure => (
        <div className="figure" key={figure.id} style={{
            top: `${figure.position.x * 50 + 10}px`,
            left: `${figure.position.y * 50 + 10}px`,
            color: getColourByNumber(figure.player)
        }}>♟</div>
    ));

    return <>

        <button onClick={() => setShowNumbers(!showNumbers)}>Toggle numbers</button>

        <div style={{width: "800px", height: "800px", position: "relative"}}>

            {normalFields}

            <div className="figures">
                {figureElements}
            </div>

        </div>

    </>;
}
