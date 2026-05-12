import { Module } from '@nestjs/common';
import {LudoWebSocketGateway} from "./websocket/websocket.gateway";
import {GameService} from "./game.service";
import {EventEmitterModule} from "@nestjs/event-emitter";

@Module({
  imports: [EventEmitterModule.forRoot()],
  controllers: [],
  providers: [GameService, LudoWebSocketGateway],
  exports: [GameService]
})
export class AppModule {}
