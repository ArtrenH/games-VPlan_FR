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
        this.currentPlayerStore = currentPlayerStore ?? {currentPlayer: Winner.X, lastMoves: []};

        let fields: FieldContent[] & { length: 9 };
        if (depth == 1) {
            fields = Array(9).map(() => new PlayerField()) as FieldContent[] & { length: 9 };
        } else {
            fields = Array(9).map(() => new Board(depth - 1, this.currentPlayerStore)) as FieldContent[] & { length: 9 };
        }
        this.fields = fields;
    }
    
    doMove(fieldNum: number) { 
        if (this.depth == 1) {
            if (!(0 <= fieldNum  && fieldNum <= 9)) {
                return false;
            }
            if (this.fields[fieldNum]) {
                return false;
            }
            this.fields[fieldNum] = new PlayerField(this.currentPlayerStore.currentPlayer);
            this.currentPlayerStore.lastMoves.push(fieldNum);
            return true;
        } else {
            let currField = this.currentPlayerStore.lastMoves[this.depth];
            (this.fields[currField] as Board).doMove(fieldNum);
        }
    }

    getWinner(): Winner {
        // rows
        for (let i = 0; i < 3; i++) {
            if (this.fields[3*i].getWinner() === this.fields[3*i+1].getWinner() && this.fields[3*i+1].getWinner() === this.fields[3*i+2].getWinner()) {
                if (this.fields[3*i]!.getWinner() !== Winner.Draw) {
                    return this.fields[3*i]!.getWinner();
                }
            }
        }
        // cols
        for (let i = 0; i < 3; i++) {
            if (this.fields[i].getWinner() === this.fields[3+i].getWinner() && this.fields[3+i].getWinner() === this.fields[6+i].getWinner()) {
                if (this.fields[i].getWinner() !== Winner.Draw) {
                    return this.fields[i].getWinner();
                }
            }
        }
        // diagonals
        if (this.fields[0].getWinner() === this.fields[4].getWinner() && this.fields[4].getWinner() === this.fields[9].getWinner()) {
            return this.fields[4].getWinner();
        }
        if (this.fields[2].getWinner() === this.fields[4].getWinner() && this.fields[4].getWinner() === this.fields[6].getWinner()) {
            return this.fields[4].getWinner();
        }
        let all_decided = true;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (this.fields[3*i+j].getWinner() == Winner.Pending) {
                    all_decided = false;
                }
            }
        }
        if (all_decided) {
            return Winner.Draw;
        }
        return Winner.Pending;
    }
}
