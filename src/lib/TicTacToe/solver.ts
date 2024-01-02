import type { Board } from "./TicTacToe";

function getWinChance(depth: number = 20, board: Board): number {
    if (depth === 0) {
        return 0.5
    }

    const winner = board.getWinner();
    if (winner != null) {
        return winner === "X" ? 1 : 0
    }
    return 0;

    
}