'use client';

import Board, {BoardField} from "@/app/game/board";
import {io, Socket} from "socket.io-client";
import {useState} from "react";
import {Button} from "@/components/ui/button";
import {DialogDemo} from "@/app/game/dice-dialog";

export interface MoveResult {
    player: number;
    pieces: number[];
}

export interface MoveSelectionRequest {
    player: number;
    pieces: number[];
}

export default function Game() {

    const [isConnected, setIsConnected] = useState(false);
    const [socket, setSocket] = useState<Socket>();

    const [roll, setRoll] = useState(false);

    const [moveResult, setMoveResult] = useState<MoveResult[]>([]);
    const [moveSelectionRequest, setMoveSelectionRequest] = useState<MoveSelectionRequest>({player: 1, pieces: []});

    const logMessage = (message: string) => {
        setLog((prev) => [
            ...prev,
            `${new Date().toLocaleString()}: ${message}`
        ]);
    }

    const startListenOnWebsocket = () => {
        const webSocket = io("http://localhost:3001/ws")
        setSocket(webSocket);

        webSocket.on("connect", () => {
            console.log("connected");
            setIsConnected(true);
            logMessage("connected");
            webSocket.emit("message", "Hello from client!");
        });

        webSocket.on("message", (data) => {
            console.log("message received", data);
            logMessage(data.message);
        });

        webSocket.on("disconnect", () => {
            console.log("disconnected");
            setIsConnected(false);
            logMessage("disconnected");
        })

        webSocket.on("diceRollRequest", (data) => {
            console.log("dice roll request received", data);
            logMessage("dice roll request received for player " + data.player);
            setRoll(false);
            setRoll(true);
        });

        webSocket.on("moveSelectionRequest", (data) => {
            console.log("move selection request received", data);
            logMessage("move selection request received for player " + data.player);

            setMoveSelectionRequest(data);
        });

        webSocket.on("moveResult", (data) => {
            console.log("move result received", data);
            logMessage("move result received: " + JSON.stringify(data));

            setMoveSelectionRequest({player: 1, pieces: []});
            setMoveResult(data);
        });
    }

    const stopListenOnWebsocket = () => {
        if (socket) {
            socket.disconnect();
        }
    }

    const [log, setLog] = useState<string[]>([]);

    const handleFieldClick = (field: BoardField) => {
        console.log("Field clicked:", field);

        if (isConnected) {
            if (field.isHighlighted) {
                socket!.emit("moveSelection", {
                    piece: field.number
                });
            }
        }
    };

    const handleRollResult = (result: number) => {
        console.log("Roll result:", result);
        setRoll(false);
    }

    const triggerRoll = () => {
        if (isConnected) {
            socket!.emit("triggerRoll");
        }
    }

    const triggerSelection = () => {
        if (isConnected) {
            socket!.emit("triggerSelection");
        }
    }

    const triggerMoveResult = () => {
        if (isConnected) {
            socket!.emit("triggerMoveResult");
        }
    }

    return <div className="game">

        <div className="board-container">
            <div className="buttons">
                <Button variant="outline" onClick={startListenOnWebsocket} disabled={isConnected}>Start listening on
                    WebSocket</Button>
                <Button variant="outline" onClick={stopListenOnWebsocket} disabled={!isConnected}>Stop listening on
                    WebSocket</Button>
                <span>&nbsp;</span>
                <Button variant="outline" onClick={triggerRoll}>Trigger Dice Roll</Button>
                <Button variant="outline" onClick={triggerSelection}>Trigger Move Selection</Button>
                <Button variant="outline" onClick={triggerMoveResult}>Trigger Move Result</Button>

                <DialogDemo roll={roll} socket={socket} onRollResult={handleRollResult}/>
            </div>


            <Board onFieldClick={handleFieldClick} moveResults={moveResult}
                   moveSelectionRequest={moveSelectionRequest}/>
        </div>

        <div className="log">
            {log.map((entry, index) => (
                <span key={index} className="log-entry">
                    {entry}
                </span>
            ))}
        </div>
    </div>
}