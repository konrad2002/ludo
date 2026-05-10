# Websockets

This file defines the information that is sent over the websocket for both client to server and server to client communication.

## Server to Client

1. Dice Roll Request
2. Dice Roll Result
3. Move Selection Request
4. Move Result

## Client to Server

1. Dice Roll Trigger
2. Move Selection

## Data

### Dice Roll Request

This request triggers the dice roll prompt at the client for a defined colour.

```json 
{
  "player": 1
}
```

### Dice Roll Result

This request tells the player the result of the dice roll.

```json
{
  "dice": 4
}
```

### Move Selection Request

This request triggers the prompt for the player to select a move. It contains the pieces that can be moved defined by their position on the field.

```json
{
    "player": 1,
    "pieces": [0,0,0,0]
}
```

### Move Result

This request returns the full board state after the move has been made.

```json
[
    {
        "player": 1,
        "pieces": [0,0,0,0]
    },
    {
        "player": 2,
        "pieces": [0,0,0,0]
    },
    {
        "player": 3,
        "pieces": [0,0,0,0]
    },
    {
        "player": 4,
        "pieces": [0,0,0,0]
    }
]
```

### Dice Roll Trigger

This triggers the generation of a random number at the server.

### Move Selection

This request tells the server which piece to move.

```json
{
  "piece": 0
}
```

## Values

### Player

The player number is directly mapped to the players home and finish. The colour is not handled by the server and can be different for different client implementations.

### Piece

The piece is defined by the position on the field. The following numbers are used:

| Number  	     | Position                   	 |
|---------------|------------------------------|
| 0       	     | Home                       	 |
| 10 to 49    	 | Normal fields              	 |
| X1  	         | Entry field for player X   	 |
| X0      	     | Last field for player X    	 |
| 1X1 to 1X4 	  | Finish places for player X 	 |

![](/docs/layout.png)
