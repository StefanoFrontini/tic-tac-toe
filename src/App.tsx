import { useState } from "react";

type Player = "X" | "O" | "empty";

const initialState: Player[] = [
  "O",
  "empty",
  "O",
  "X",
  "X",
  "empty",
  "X",
  "empty",
  "empty",
];

interface Moves {
  X?: number;
  O?: number;
  empty?: number;
}

// player(s): function that returns whick player to move in state s
function player(s: Player[]): Player {
  const moves = s.reduce((acc: Moves, item) => {
    if (item === "X") {
      if (!acc["X"]) {
        acc["X"] = 1;
      } else {
        acc["X"] = acc["X"] + 1;
      }
    }
    if (item === "O") {
      if (!acc["O"]) {
        acc["O"] = 1;
      } else {
        acc["O"] = acc["O"] + 1;
      }
    }
    if (item === "empty") {
      if (!acc["empty"]) {
        acc["empty"] = 1;
      } else {
        acc["empty"] = acc["empty"] + 1;
      }
    }
    return acc;
  }, {});
  if (moves["empty"] === 9) return "X";
  const nextPlayer = (moves["X"] ?? 0) > (moves["O"] ?? 0) ? "O" : "X";
  return nextPlayer;
}

// function actions(s): function that returns legal moves in state s
function actions(s: Player[]): number[] {
  const actions = s.reduce((acc: number[], item, index) => {
    if (item === "empty") {
      acc.push(index);
    }
    return acc;
  }, []);
  return actions;
}

// console.log("actions", actions(initialState));

// function result(s,a): function that returns state after action a taken in state s
function result(s: Player[], a: number): Player[] {
  const result = s.slice();
  result[a] = player(s);
  return result;
}

const WINNING_STRATEGIES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
// function noEmpty(s): checks if state s has no empty cells
function isGameBoardFull(s: Player[]): boolean {
  return s.every((item) => item !== "empty");
}
// function winner(s,p): checks if player p has won in state s
// function winner(s: Player[], p: Player): boolean {
//   return WINNING_STRATEGIES.some((strategy) => {
//     const [a, b, c] = strategy;
//     return s[a] === p && s[b] === p && s[c] === p;
//   });
// }

// function winner(s): checks if state s has a winner
function isWinningState(s: Player[]): boolean {
  return WINNING_STRATEGIES.some((strategy) => {
    const [a, b, c] = strategy;
    return (
      (s[a] === "X" && s[b] === "X" && s[c] === "X") ||
      (s[a] === "O" && s[b] === "O" && s[c] === "O")
    );
  });
}
// function terminal(s): checks if state s is a terminal state
function terminal(s: Player[]): boolean {
  return isWinningState(s) || isGameBoardFull(s);
}

// console.log("terminal", terminal(initialState));
// console.log("winner", winningState(initialState));
// console.log("nextPlayer", player(initialState));
// console.log("utility:", utility(initialState));

// function utility(s): final numerical value for a terminal state s
function utility(s: Player[]): number {
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

function App(): JSX.Element {
  const [gameState, setGameState] = useState<string[]>(initialState);

  function maxValue(s: Player[]): MinMaxValue {
    if (terminal(s)) return { value: utility(s), results: [] };
    const v: MinMaxValue = { value: -Infinity, results: [] };
    for (const a of actions(s)) {
      const min: MinMaxValue = minValue(result(s, a));
      v.value = Math.max(v.value, min.value);
      v.results.push({ action: a, value: min.value });
    }
    return v;
  }

  function minValue(s: Player[]): MinMaxValue {
    if (terminal(s)) return { value: utility(s), results: [] };
    const v: MinMaxValue = { value: Infinity, results: [] };
    for (const a of actions(s)) {
      const max: MinMaxValue = maxValue(result(s, a));
      v.value = Math.min(v.value, max.value);
      v.results.push({ action: a, value: max.value });
    }
    return v;
  }

  console.log("initialState", initialState);
  // console.log("minValue", minValue(initialState));
  // console.log("gameState", gameState);
  // console.log("maxValue", maxValue(initialState));
  // const bestValue = maxValue(initialState);
  // console.log("bestValue", bestValue);
  // const nextMove = bestValue.results.find((el) => el.value === bestValue.value);
  // console.log("nextMove", nextMove);
  const bestValue = minValue(initialState);
  console.log("bestValue", bestValue);
  const nextMove = bestValue.results.find((el) => el.value === bestValue.value);
  console.log("nextMove", nextMove);
  const nextGameState = result(gameState, nextMove.action);
  console.log("nextGameState", nextGameState);
  // setGameState(nextGameState);
  // console.log("terminal", terminal(initialState));
  // console.log("winner", isWinningState(initialState));
  // console.log(isGameBoardFull(initialState));
  // console.log("nextPlayer", player(initialState));
  return (
    <>
      <h1>Hello world!</h1>
    </>
  );
}

export default App;
