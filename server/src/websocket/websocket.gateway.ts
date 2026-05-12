import {
    ConnectedSocket,
    MessageBody, OnGatewayConnection, OnGatewayDisconnect,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsResponse,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
    cors: {
        origin: '*',
    },
    namespace: 'ws',
})
export class WebsocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;

    handleConnection(client: Socket) {
        console.log(`Client connected: ${client.id}`);
    }

    handleDisconnect(client: Socket) {
        console.log(`Client disconnected: ${client.id}`);
    }

    @SubscribeMessage('message')
    handleMessage(
        @MessageBody() data: string,
        @ConnectedSocket() client: Socket,
    ) {
        console.log(`Message from ${client.id}: ${data}`);

        // Send to ALL connected clients
        this.server.emit('message', {
            clientId: client.id,
            message: data,
        });
    }

    @SubscribeMessage('triggerRoll')
    handleTriggerRoll(
        @ConnectedSocket() client: Socket,
    ) {
        console.log(`Trigger roll from ${client.id}`);

        this.server.emit('diceRollRequest', {
            player: 1,
        });
    }

    @SubscribeMessage('roll')
    handleRoll(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
        console.log(`Roll request from ${client.id}: ${data}`);


        this.server.emit('rolling', true);

        setTimeout(() => {
            const result = Math.floor(Math.random() * 6) + 1;

            console.log(`Roll result for ${client.id}: ${result}`);

            this.server.emit('diceRollResult', {
                dice: result,
            });
        }, 2000);
    }


    @SubscribeMessage('triggerSelection')
    handleTriggerSelection(
        @ConnectedSocket() client: Socket,
    ) {
        console.log(`Trigger selection from ${client.id}`);

        this.server.emit('moveSelectionRequest', {
            "player": 2,
            "pieces": [22,27,0,123]
        });
    }

    @SubscribeMessage('moveSelection')
    handleMoveSelection(
        @ConnectedSocket() client: Socket,
        @MessageBody() data: any
    ) {
        console.log(`Received move selection from ${client.id}: ${data.piece}`);

        this.server.emit('moveResult', [
            {
                "player": 1,
                "pieces": [0,0,0,0]
            },
            {
                "player": 2,
                "pieces": [22,27,0,123]
            },
            {
                "player": 3,
                "pieces": [0,0,0,0]
            },
            {
                "player": 4,
                "pieces": [41,0,0,0]
            }
        ]);
    }

    @SubscribeMessage('triggerMoveResult')
    handleTriggerMoveResult(
        @ConnectedSocket() client: Socket,
    ) {
        console.log(`Trigger move result from ${client.id}`);

        this.server.emit('moveResult', [
            {
                "player": 1,
                "pieces": [0,0,0,0]
            },
            {
                "player": 2,
                "pieces": [22,27,0,123]
            },
            {
                "player": 3,
                "pieces": [0,0,0,0]
            },
            {
                "player": 4,
                "pieces": [41,0,0,0]
            }
        ]);
    }
}