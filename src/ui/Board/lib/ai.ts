export type CellState = "X" | "O" | "empty";
export type Player = "X" | "O";

export const initialState: CellState[] = [
  "empty",
  "empty",
  "empty",
  "empty",
  "empty",
  "empty",
  "empty",
  "empty",
  "empty",
];

interface MovesCount {
  X?: number;
  O?: number;
  empty?: number;
}

function increaseMovesCount(
  moves: MovesCount,
  cellState: CellState
): MovesCount {
  if (!moves[cellState]) {
    moves[cellState] = 1;
  } else {
    moves[cellState] = moves[cellState]! + 1;
  }
  return moves;
}

function getMovesCount(s: CellState[]): MovesCount {
  return s.reduce((acc: MovesCount, item) => {
    if (item === "X") acc = increaseMovesCount(acc, "X");
    if (item === "O") acc = increaseMovesCount(acc, "O");
    if (item === "empty") acc = increaseMovesCount(acc, "empty");
    return acc;
  }, {});
}

// player(s): function that returns whick player to move in state s
export function player(s: CellState[]): Player {
  const movesCount = getMovesCount(s);
  if (movesCount["empty"] === 9) return "X";
  const nextPlayer =
    (movesCount["X"] ?? 0) > (movesCount["O"] ?? 0) ? "O" : "X";
  return nextPlayer;
}

// function actions(s): function that returns legal moves in state s
export function actions(s: CellState[]): number[] {
  const actions = s.reduce((acc: number[], item, index) => {
    if (item === "empty") {
      acc.push(index);
    }
    return acc;
  }, []);
  return actions;
}

// function result(s,a): function that returns state after action a taken in state s
export function result(s: CellState[], a: number): CellState[] {
  const result = s.slice();
  result[a] = player(s);
  return result;
}

export const WINNING_STRATEGIES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
export interface StrategyMap {
  [key: string]: string;
}
export const strategyMap: StrategyMap = {
  "[0,1,2]": "h1",
  "[3,4,5]": "h2",
  "[6,7,8]": "h3",
  "[0,3,6]": "v1",
  "[1,4,7]": "v2",
  "[2,5,8]": "v3",
  "[0,4,8]": "d1",
  "[2,4,6]": "d2",
};
// function isGameBoardFull(s): checks if state s has no empty cells
export function isGameBoardFull(s: CellState[]): boolean {
  return s.every((item) => item !== "empty");
}

// function winner(s): checks if state s has a winner
export function isWinningState(s: CellState[]): boolean {
  return WINNING_STRATEGIES.some((strategy) => {
    const [a, b, c] = strategy;
    return (
      (s[a] === "X" && s[b] === "X" && s[c] === "X") ||
      (s[a] === "O" && s[b] === "O" && s[c] === "O")
    );
  });
}
// function that returns the winning strategy

export function winningStrategy(s: CellState[]): number[] | undefined {
  return WINNING_STRATEGIES.find((strategy) => {
    const [a, b, c] = strategy;
    return (
      (s[a] === "X" && s[b] === "X" && s[c] === "X") ||
      (s[a] === "O" && s[b] === "O" && s[c] === "O")
    );
  });
}
// function terminal(s): checks if state s is a terminal state
export function terminal(s: CellState[]): boolean {
  return isWinningState(s) || isGameBoardFull(s);
}

// function utility(s): final numerical value for a terminal state s
export function utility(s: CellState[]): number {
  if (isWinningState(s) && player(s) === "X") return -1;
  if (isWinningState(s) && player(s) === "O") return 1;
  return 0;
  // throw new Error("Utility called on non-terminal state");
}

// Given a state s:
//X(max player) picks action a in Actions(s) that produces highest value of minValue(RESULT(s,a))
//O(min player) picks action a in Actions(s) that produces smallest value of maxValue(RESULT(s,a))

interface MinMaxValue {
  value: number;
  results: Move[];
}
interface Move {
  action: number;
  value: number;
}
export interface PlayerScore {
  X: number;
  O: number;
}
export const initialScore = { X: 0, O: 0 };

export function maxValue(s: CellState[]): MinMaxValue {
  if (terminal(s)) return { value: utility(s), results: [] };
  const v: MinMaxValue = { value: -Infinity, results: [] };
  for (const a of actions(s)) {
    const min: MinMaxValue = minValue(result(s, a));
    v.value = Math.max(v.value, min.value);
    v.results.push({ action: a, value: min.value });
  }
  return v;
}

export function minValue(s: CellState[]): MinMaxValue {
  if (terminal(s)) return { value: utility(s), results: [] };
  const v: MinMaxValue = { value: Infinity, results: [] };
  for (const a of actions(s)) {
    const max: MinMaxValue = maxValue(result(s, a));
    v.value = Math.min(v.value, max.value);
    v.results.push({ action: a, value: max.value });
  }
  return v;
}
