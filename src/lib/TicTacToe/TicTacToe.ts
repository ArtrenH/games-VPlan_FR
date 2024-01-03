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
    currentPlayerStore: SharedGameState;
    depth: number;

    constructor(depth: number = 1, currentPlayerStore: SharedGameState | null = null) {
        super();
        this.depth = depth;
        this.currentPlayerStore = currentPlayerStore ?? { currentPlayer: Winner.X, lastMoves: [] };

        let fields: FieldContent[] & { length: 9 };
        if (depth == 1) {
            fields = [...Array(9)].map(() => new PlayerField()) as (FieldContent[] & { length: 9 });
        } else {
            fields = [...Array(9)].map(() => new Board(depth - 1, this.currentPlayerStore)) as (FieldContent[] & { length: 9 });
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

    /*
     * TODO: if a sub board is won or full, enable all fields one level higher
     */
    enableFields(): boolean {
        let out: boolean = false;
        if (this.depth === 1) { // enable all available fields of lowest level board
            this.fields.forEach(field => {
                field = field as PlayerField;
                field.isEnabled = field.getWinner() == Winner.Pending;
                out ||= field.isEnabled;
            })
        } else {
            let currField = this.currentPlayerStore.lastMoves[this.currentPlayerStore.lastMoves.length - this.depth];
            if (typeof currField === "undefined") { // board was just initialized, not enough moves were made
                this.fields.forEach(field => {out ||= (field as Board).enableFields()});
            } else { // fields of next sub-board are enabled
                
                out ||= (this.fields[currField] as Board).enableFields();
            }

        }
        return out;
    }


    /**
     * returns if move could be executed
     */
    _doMove(fieldNum: number): boolean {
        if (this.depth === 1) { // lowes level reached => make move there
            if (!(0 <= fieldNum && fieldNum <= 9)) {
                return false;
            }
            if (this.fields[fieldNum]) {
                return false;
            }
            this.fields[fieldNum] = new PlayerField(this.currentPlayerStore.currentPlayer);
            this.currentPlayerStore.lastMoves.push(fieldNum);
            return true;
        } else { // lowest level not yet reached => move delegated to right sub-board (its position is based on previous moves)
            let currField = this.currentPlayerStore.lastMoves[this.currentPlayerStore.lastMoves.length - this.depth];
            return (this.fields[currField] as Board)._doMove(fieldNum);
        }
    }

    /**
     * execute the move
     * disable all fields
     * enable all new fields
     */
    doMove(fieldNum: number) {
        this._doMove(fieldNum);
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
