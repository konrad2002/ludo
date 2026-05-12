'use client';

import Board, {BoardField} from "@/app/game/board";
import {io, Socket} from "socket.io-client";
import {useState} from "react";
import {Button} from "@/components/ui/button";

export default function Game() {

    const [isConnected, setIsConnected] = useState(false);
    const [socket, setSocket] = useState<Socket>();

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
            socket!.emit("message", "pressed field " + field.number);
        }
    };

    return <div className="game">

        <div className="board-container">
            <div className="buttons">
                <Button variant="outline" onClick={startListenOnWebsocket} disabled={isConnected}>Start listening on WebSocket</Button>
                <Button variant="outline" onClick={stopListenOnWebsocket} disabled={!isConnected}>Stop listening on WebSocket</Button>
            </div>


            <Board onFieldClick={handleFieldClick}/>
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