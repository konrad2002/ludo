import {Injectable} from '@nestjs/common';
import {EventEmitter2, OnEvent} from '@nestjs/event-emitter';
import {Player} from "./types/player.type";

function toInt(str: string): number {
    return Number.parseInt(str);
}

@Injectable()
export class GameService {

    numOfPlayers: number;
    currentPlayer: number;
    currentDice: number;

    players: Player[] = [];

    constructor(private readonly events: EventEmitter2) {
    }


    @OnEvent("game.create")
    onCreateGame(players: number) {
        console.log(`Creating game with ${players} players`);
        this.numOfPlayers = players;

        this.players = [];

        for (let i = 1; i <= players; i++) {
            this.players.push({
                player: i,
                pieces: [0, 0, 0, 0],
                firstRoundRetries: 1,
            })
        }

        this.currentPlayer = 1;

        this.events.emit("game.created", this.players, players)

        setTimeout(() => {
            this.requestDiceRoll();
        }, 2000);
    }

    @OnEvent("dice.roll")
    onDiceRoll() {
        this.events.emit("dice.rolling");

        const result = Math.floor(Math.random() * 6) + 1;

        console.log(`Roll result for player ${this.currentPlayer}: ${result}`);
        setTimeout(() => {
            this.events.emit("dice.roll-result", result);

            setTimeout(() => {
                this.afterRoll(result);
            }, 2000);
        }, 2000);
    }

    @OnEvent("move.select")
    onMoveSelect(piece: number) {
        this.movePiece(piece);
    }

    requestDiceRoll() {
        this.events.emit("dice.roll-request", this.currentPlayer)
    }

    afterRoll(dice: number) {
        this.currentDice = dice;

        const p = this.getPlayer(this.currentPlayer)!;
        if (dice === 6) {
            // if dice is 6 and at least one piece is at home, set it at the start
            // TODO: handle occupied first field
            p.firstRoundRetries = 1;
            if (p.pieces.includes(0)) {
                p.pieces[p.pieces.indexOf(0)] = toInt(this.currentPlayer + "1");

                this.events.emit("move.result", this.players);

                setTimeout(() => {
                    this.nextPlayer();
                }, 2000);

                return;
            }
        } else if (Math.max(...p.pieces) === 0) {
            // if not 6 but no piece on the field are movable
            if (p.firstRoundRetries < 3) {
                p.firstRoundRetries++;
                this.requestDiceRoll();
                return;
            }

            this.nextPlayer();

            return;
        }

        this.events.emit("move.selection-request", p.player, p.pieces.filter(p => p !== 0));
        // next: onMoveSelect
    }

    nextPlayer() {
        this.getPlayer(this.currentPlayer)!.firstRoundRetries = 1;
        this.currentPlayer = (this.currentPlayer % this.numOfPlayers) + 1;
        this.requestDiceRoll();
    }

    movePiece(piece: number) {
        const p = this.getPlayer(this.currentPlayer)!;
        // Todo: remove first piece from number array with this value
        const index = p.pieces.indexOf(piece);

        if (index !== -1) {
            p.pieces[index] = ((piece + this.currentDice - 1) % 49) + 1;
        }

        this.events.emit("move.result", this.players);

        setTimeout(() => {
            if (this.currentDice === 6) {
                this.requestDiceRoll()
            } else {
                this.nextPlayer();
            }
        }, 2000);
    }


    getPlayer(player: number): Player | undefined {
        return this.players.find(p => p.player === player);
    }
}
