'use client';

import Board from "@/app/game/board";

export default function Game() {

    const startListenOnWebsocket = () => {
        const socket = new WebSocket('ws://localhost:3001/ws');
        socket.addEventListener('open', function (event) {
            console.log('WebSocket connection opened');
        });
        socket.addEventListener('message', function (event) {
            console.log('Message from server ', event.data);
            log.push((new Date()).toString() + "> " + event.data)
        });
    }

    const log: Array<string> = [];

    const logEntries = log.map((log) => {
        return <span className="log-entry">{log}</span>
    })

    return <div className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between">

        <button onClick={startListenOnWebsocket}>Start listening on WebSocket</button>

        <Board/>

        {logEntries}
    </div>
}