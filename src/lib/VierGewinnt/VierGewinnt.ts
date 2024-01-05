export enum Winner {
    Red,
    Yellow,
    Draw,
    Pending
}

type PlayerField = Exclude<Winner, Winner.Draw>;
type Player = Exclude<PlayerField, Winner.Pending>;

export class Board {
    columns: PlayerField[][];
    currentPlayer: Player = Winner.Red;

    constructor(height: number, width: number) {
        this.columns = [];
        for (let i = 0; i < width; i++) {
            let cur_column = [...Array(height)].map(() => Winner.Pending as PlayerField);
            this.columns.push(cur_column);
        }
    }

    doMove(column: number) {
        // column full
        if (this.columns[column][0] !== Winner.Pending) {
            return
        }
        let index = 0;
        while (this.columns[column][index] === Winner.Pending) {
            index++;
        }
        this.columns[column][index-1] = this.currentPlayer;
        if (this.currentPlayer === Winner.Red) {
            this.currentPlayer = Winner.Yellow;
        } else {
            this.currentPlayer = Winner.Red;
        }
    }

    getWinner(): Winner {
        let board_full = true;
        for (let i = 0; i < this.columns.length; i++) {
            if (this.columns[i][0] === Winner.Pending) {
                board_full = false;
            }
        }
        if (board_full) {
            return Winner.Draw;
        }
        // check vertical
        for (let i = 0; i < this.columns.length; i++) {
            let consecutiveCount = 0;
            let lastPlayer: PlayerField = Winner.Pending;
            for (let j = 0; j < this.columns[i].length; j++) {
                if (this.columns[i][j] === lastPlayer && lastPlayer !== Winner.Pending) {
                    consecutiveCount++;
                    if (consecutiveCount === 4) {
                        return lastPlayer;
                    }
                } else {
                    consecutiveCount = 1;
                    lastPlayer = this.columns[i][j];
                }
            }
        }
        // check horizontal
        for (let j = 0; j < this.columns[0].length; j++) {
            let consecutiveCount = 0;
            let lastPlayer: PlayerField = Winner.Pending;
            for (let i = 0; i < this.columns.length; i++) {
                if (this.columns[i][j] === lastPlayer && lastPlayer !== Winner.Pending) {
                    consecutiveCount++;
                    if (consecutiveCount === 4) {
                        return lastPlayer;
                    }
                } else {
                    consecutiveCount = 1;
                    lastPlayer = this.columns[i][j];
                }
            }
        }
        // check diagonals (left to right)
        for (let column = 0; column < this.columns.length - 3; column++) {
            for (let row = 0; row < this.columns[column].length - 3; row++) {
                let player = this.columns[column][row];
                if (player !== Winner.Pending && player === this.columns[column + 1][row + 1] && player === this.columns[column + 2][row + 2] && player === this.columns[column + 3][row + 3]) {
                    return player;
                }
            }
        }
        // check diagonals (right to left)
        for (let column = 3; column < this.columns.length; column++) {
            for (let row = 0; row < this.columns[column].length - 3; row++) {
                let player = this.columns[column][row];
                if (player !== Winner.Pending && player === this.columns[column - 1][row + 1] && player === this.columns[column - 2][row + 2] && player === this.columns[column - 3][row + 3]) {
                    return player;
                }
            }
        }
        return Winner.Pending;
    }
}

export function winnerToString(value: Winner): string {
    switch (value) {
        case Winner.Red:
            return "Rot";
        case Winner.Yellow:
            return "Gelb";
        case Winner.Draw:
            return "%";
        case Winner.Pending:
            return "O";
        default:
            const _exhaustiveCheck: never = value;
            return _exhaustiveCheck;
    }
}