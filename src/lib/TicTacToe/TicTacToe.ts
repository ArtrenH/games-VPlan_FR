
export type FieldContent = PlayerField | Board;

export type SharedGameState = {
    currentPlayer: Exclude<Winner, Winner.Draw>;
    lastMoves: number[];
};

export enum Winner {
    X,
    O,
    Draw,
    Pending
}

export abstract class HasWinner {
    abstract getWinner(): Winner;
}

export class PlayerField extends HasWinner {
    value: Exclude<Winner, Winner.Draw>;

    isEnabled: boolean = true;

    constructor(value: Exclude<Winner, Winner.Draw> = Winner.Pending) {
        super();
        this.value = value;
    }

    getWinner(): Winner {
        return this.value as Winner;
    }
}


export class Board extends HasWinner {
    fields: FieldContent[] & { length: 9 };
    sharedGameState: SharedGameState;
    depth: number;

    constructor(depth: number = 1, sharedGameState: SharedGameState | null = null) {
        super();
        this.depth = depth;
        this.sharedGameState = sharedGameState ?? { currentPlayer: Winner.X, lastMoves: [] };

        let fields: FieldContent[] & { length: 9 };
        if (depth == 1) {
            fields = [...Array(9)].map(() => new PlayerField()) as (FieldContent[] & { length: 9 });
        } else {
            fields = [...Array(9)].map(() => new Board(depth - 1, this.sharedGameState)) as (FieldContent[] & { length: 9 });
        }
        this.fields = fields;
    }

    disableAll() {
        if (this.depth === 1) {
            this.fields.forEach(field => {
                (field as PlayerField).isEnabled = false;
            })
        } else {
            this.fields.forEach(field => {
                (field as Board).disableAll();
            })
        }
    }

    enableAvailable() {
        if (this.depth === 1) {
            this.fields.forEach(field => {
                if ((field as PlayerField).value === Winner.Pending) {
                    (field as PlayerField).isEnabled = true;
                }
            })
        } else {
            this.fields.forEach(field => (field as Board).enableAvailable())
        }
    }

    /**
     * 
     */
    enableFields() {
        if (this.depth === 1) {
            this.enableAvailable()
        } else {
            let currField = this.sharedGameState.lastMoves[this.sharedGameState.lastMoves.length - this.depth + 1];
            if (typeof currField === "undefined") { // board was just initialized, not enough moves were made
                this.fields.forEach(field => (field as Board).enableFields());
            } else {
                // winner is pending => next sub-board is found and enabled
                if ((this.fields[currField] as Board).getWinner() === Winner.Pending) {
                    (this.fields[currField] as Board).enableFields();
                // next subboard is not pending anymore => all fields of current board are enabled
                } else {
                    this.enableAvailable()
                }
            }
        }
    }


    /**
     * returns if move could be executed
     */
    _doMove(fieldNums: number[]): boolean {
        if (!(0 <= fieldNums[0] && fieldNums[0] <= 9)) {
            throw new Error("HIHI")
        }
        if (this.depth === 1) { // lowes level reached => make move there
            this.fields[fieldNums[0]] = new PlayerField(this.sharedGameState.currentPlayer);
            if (this.sharedGameState.currentPlayer === Winner.X) {
                this.sharedGameState.currentPlayer = Winner.O;
            } else {
                this.sharedGameState.currentPlayer = Winner.X;
            }
            return true;
        } else { // lowest level not yet reached => move delegated to right sub-board (its position is based on previous moves)
            return (this.fields[fieldNums[0]] as Board)._doMove(fieldNums.slice(1));
        }
    }

    /**
     * execute the move
     * disable all fields
     * enable all new fields
     */
    doMove(fieldNums: number[]) {
        this._doMove(fieldNums);
        if (this.sharedGameState.lastMoves.length === 0) {
            console.log(fieldNums);
            this.sharedGameState.lastMoves = fieldNums;
        } else {
            this.sharedGameState.lastMoves.push(fieldNums[fieldNums.length-1]);
        }
        this.disableAll();
        this.enableFields();
    }

    getWinner(): Winner {
        // check if a row is won
        for (let i = 0; i < 3; i++) {
            if (this.fields[3 * i].getWinner() === this.fields[3 * i + 1].getWinner() && this.fields[3 * i + 1].getWinner() === this.fields[3 * i + 2].getWinner()) {
                if (this.fields[3 * i]!.getWinner() !== Winner.Draw) {
                    return this.fields[3 * i]!.getWinner();
                }
            }
        }
        // check if a column is won
        for (let i = 0; i < 3; i++) {
            if (this.fields[i].getWinner() === this.fields[3 + i].getWinner() && this.fields[3 + i].getWinner() === this.fields[6 + i].getWinner()) {
                if (this.fields[i].getWinner() !== Winner.Draw) {
                    return this.fields[i].getWinner();
                }
            }
        }
        // check if a diagonal is won
        if (this.fields[0].getWinner() === this.fields[4].getWinner() && this.fields[4].getWinner() === this.fields[9].getWinner()) {
            return this.fields[4].getWinner();
        }
        if (this.fields[2].getWinner() === this.fields[4].getWinner() && this.fields[4].getWinner() === this.fields[6].getWinner()) {
            return this.fields[4].getWinner();
        }
        // check if field is full
        let all_decided = true;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (this.fields[3 * i + j].getWinner() === Winner.Pending) {
                    all_decided = false;
                }
            }
        }
        // draw if all fields are full
        if (all_decided) {
            return Winner.Draw;
        }
        // win not yet decided
        return Winner.Pending;
    }
}

export function winnerToString(value: Winner): string {
    switch(value) {
        case Winner.X:
            return "X";
        case Winner.O:
            return "O";
        case Winner.Draw:
            return "Draw";
        case Winner.Pending:
            return "P";
        default:
            const _exhaustiveCheck: never = value;
            return _exhaustiveCheck;
    }
}