import {
    ConnectedSocket,
    MessageBody, OnGatewayConnection, OnGatewayDisconnect,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import {Server, Socket} from 'socket.io';
import {EventEmitter2, OnEvent} from "@nestjs/event-emitter";
import {Player} from "../types/player.type";

type GameCreationRequest = {
    players: number;
}

@WebSocketGateway({
    cors: {
        origin: '*',
    },
    namespace: 'ws',
})
export class LudoWebSocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;

    constructor(private readonly events: EventEmitter2) {
    }

    handleConnection(client: Socket) {
        console.log(`Client connected: ${client.id}`);
    }

    handleDisconnect(client: Socket) {
        console.log(`Client disconnected: ${client.id}`);
    }

    @SubscribeMessage('createGame')
    handleCreateGame(
        @MessageBody() data: GameCreationRequest,
        @ConnectedSocket() client: Socket,
    ) {
        console.log(`Create game request from ${client.id} with ${data.players} players`);

        this.events.emit("game.create", data.players);
    }

    // The following events are called by the game service to trigger websocket requests to the clients

    @OnEvent("game.created")
    onGameCreated(players: Player[], numOfPlayers: number) {
        this.sendMessage("Game created with " + numOfPlayers + " players")
        this.onMoveResult(players)
    }

    @OnEvent("dice.roll-request")
    onDiceRollRequest(player: number) {
        this.server.emit('diceRollRequest', {
            player: player,
        });
    }

    @OnEvent("dice.rolling")
    onDiceRolling() {
        this.server.emit('diceRolling', true);
    }

    @OnEvent("dice.roll-result")
    onDiceRollResult(result: number) {
        this.server.emit('diceRollResult', {
            dice: result,
        });
    }

    @OnEvent("move.selection-request")
    onMoveSelectionRequest(player: number, options: number[]) {
        this.server.emit('moveSelectionRequest', {
            "player": player,
            "pieces": options
        });
    }

    @OnEvent("move.result")
    onMoveResult(result: Player[]) {
        this.server.emit('moveResult', result);
    }

    sendMessage(message: string) {
        this.server.emit('message', {
            message: message,
        });
    }


    @SubscribeMessage('diceRollTrigger')
    handleRoll(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
        console.log(`Roll request from ${client.id}: ${data}`);

        this.events.emit("dice.roll");
    }


    @SubscribeMessage('moveSelection')
    handleMoveSelection(
        @ConnectedSocket() client: Socket,
        @MessageBody() data: any
    ) {
        console.log(`Received move selection from ${client.id}: ${data.piece}`);

        this.events.emit("move.select", data.piece);
    }

}