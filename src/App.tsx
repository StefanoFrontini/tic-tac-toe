import { useState } from "react";

type Player = "player1" | "player2" | "empty";

const initialState: Player[] = [
  "empty",
  "player1",
  "player2",
  "player2",
  "player1",
  "empty",
  "player1",
  "empty",
  "player2",
];

interface Moves {
  player1?: number;
  player2?: number;
  empty?: number;
}

// player(s): function that returns whick player to move in state s
function player(s: Player[]): Player {
  const moves = s.reduce((acc: Moves, item) => {
    if (item === "player1") {
      if (!acc["player1"]) {
        acc["player1"] = 1;
      } else {
        acc["player1"] = acc["player1"] + 1;
      }
    }
    if (item === "player2") {
      if (!acc["player2"]) {
        acc["player2"] = 1;
      } else {
        acc["player2"] = acc["player2"] + 1;
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
  if (moves["empty"] === 9) return "player1";
  const nextPlayer =
    (moves["player1"] ?? 0) > (moves["player2"] ?? 0) ? "player2" : "player1";
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

console.log("actions", actions(initialState));

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
function noEmpty(s: Player[]): boolean {
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
function winningState(s: Player[]): boolean {
  return WINNING_STRATEGIES.some((strategy) => {
    const [a, b, c] = strategy;
    return (
      (s[a] === "player1" && s[b] === "player1" && s[c] === "player1") ||
      (s[a] === "player2" && s[b] === "player2" && s[c] === "player2")
    );
  });
}
// function terminal(s): checks if state s is a terminal state
function terminal(s: Player[]): boolean {
  return winningState(s) || noEmpty(s);
}

console.log("terminal", terminal(initialState));
console.log("winner", winningState(initialState));
console.log("nextPlayer", player(initialState));
console.log("utility:", utility(initialState));

// function utility(s): final numerical value for a terminal state s
function utility(s: Player[]): number {
  if (noEmpty(s)) return 0;
  if (player(s) === "player1") return -1;
  if (player(s) === "player2") return 1;
  throw new Error("Utility called on non-terminal state");
}

// Given a state s:
//player1(max player) picks action a in Actions(s) that produces highest value of minValue(RESULT(s,a))
//player2(min player) picks action a in Actions(s) that produces smallest value of maxValue(RESULT(s,a))

function maxValue(s: Player[]): number {
  if (terminal(s)) return utility(s);
  let v = -Infinity;
  // const results = [];
  for (const a of actions(s)) {
    v = Math.max(v, minValue(result(s, a)));
    // results.push({ a, v });
  }
  return v;
}

interface MinValue {
  v: number;
  a: number;
}

function minValue(s: Player[]): number {
  if (terminal(s)) return utility(s);
  let v = Infinity;
  const results: MinValue[] = [];
  for (const a of actions(s)) {
    v = Math.min(v, maxValue(result(s, a)));
    results.push({ a, v });
  }
  const minValue = results.find((el) => el.v === v);
  const nextMove = minValue.a;
  return v;
}

console.log("endMinValue", minValue(initialState));
// console.log("endMaxValue", maxValue(initialState));
function App(): JSX.Element {
  const [gameState, setGameState] = useState<string[]>(initialState);
  return (
    <>
      <h1>Hello world!</h1>
    </>
  );
}

export default App;
