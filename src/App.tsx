import { useState } from "react";
import styles from "./App.module.scss";
import Cell from "./components/Cell";
import Score from "./components/Score";
import GameInfo from "./components/GameInfo";

type cellState = "X" | "O" | "empty";
type Player = "X" | "O";

const initialState: cellState[] = [
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

interface Moves {
  X?: number;
  O?: number;
  empty?: number;
}

// player(s): function that returns whick player to move in state s
function player(s: cellState[]): Player {
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
function actions(s: cellState[]): number[] {
  const actions = s.reduce((acc: number[], item, index) => {
    if (item === "empty") {
      acc.push(index);
    }
    return acc;
  }, []);
  return actions;
}

// function result(s,a): function that returns state after action a taken in state s
function result(s: cellState[], a: number): cellState[] {
  const result = s.slice();
  result[a] = player(s);
  return result;
}
function resultPlayerMove(s: cellState[], a: number): cellState[] {
  const result = s.slice();
  result[a] = "X";
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
const strategyMap = {
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
function isGameBoardFull(s: cellState[]): boolean {
  return s.every((item) => item !== "empty");
}

// function winner(s): checks if state s has a winner
function isWinningState(s: cellState[]): boolean {
  return WINNING_STRATEGIES.some((strategy) => {
    const [a, b, c] = strategy;
    return (
      (s[a] === "X" && s[b] === "X" && s[c] === "X") ||
      (s[a] === "O" && s[b] === "O" && s[c] === "O")
    );
  });
}
// function that returns the winning strategy
function winningStrategy(s: cellState[]): number[] {
  return WINNING_STRATEGIES.find((strategy) => {
    const [a, b, c] = strategy;
    return (
      (s[a] === "X" && s[b] === "X" && s[c] === "X") ||
      (s[a] === "O" && s[b] === "O" && s[c] === "O")
    );
  });
}
// function terminal(s): checks if state s is a terminal state
function terminal(s: cellState[]): boolean {
  return isWinningState(s) || isGameBoardFull(s);
}

// function utility(s): final numerical value for a terminal state s
function utility(s: cellState[]): number {
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
interface PlayerScore {
  X: number;
  O: number;
}
const initialScore = { X: 0, O: 0 };

function App(): JSX.Element {
  const [gameState, setGameState] = useState<cellState[]>(initialState);
  const [playerScore, setPlayerScore] = useState<PlayerScore>(initialScore);

  function maxValue(s: cellState[]): MinMaxValue {
    if (terminal(s)) return { value: utility(s), results: [] };
    const v: MinMaxValue = { value: -Infinity, results: [] };
    for (const a of actions(s)) {
      const min: MinMaxValue = minValue(result(s, a));
      v.value = Math.max(v.value, min.value);
      v.results.push({ action: a, value: min.value });
    }
    return v;
  }

  function minValue(s: cellState[]): MinMaxValue {
    if (terminal(s)) return { value: utility(s), results: [] };
    const v: MinMaxValue = { value: Infinity, results: [] };
    for (const a of actions(s)) {
      const max: MinMaxValue = maxValue(result(s, a));
      v.value = Math.min(v.value, max.value);
      v.results.push({ action: a, value: max.value });
    }
    return v;
  }

  function computerMove(s: cellState[]): void {
    const bestValue = minValue(s);
    console.log("bestValue", bestValue);
    function getMove() {
      const bestMove = bestValue.results.find(
        (el) => el.value === bestValue.value
      );
      return bestMove.action;
    }
    // const nextGameState = result(gameState, nextMove.action);
    setGameState((prevState) => {
      const nextState = result(prevState, getMove());
      if (isWinningState(nextState)) {
        const winningPlayer = player(nextState) === "X" ? "O" : "X";
        updateScore(playerScore, winningPlayer);
      }
      return nextState;
    });
  }
  function updateGameState(s: cellState[]): void {
    setGameState(s);
  }
  function handleRestart(): void {
    console.log("clicked");
    setGameState(initialState);
  }
  function updateScore(score: PlayerScore, winningPlayer: Player): void {
    const newScore = { ...score, [winningPlayer]: score[winningPlayer] + 1 };
    setPlayerScore(newScore);
  }
  // console.log("winningStrategy", winningStrategy(gameState));
  const win = JSON.stringify(winningStrategy(gameState));
  // console.log(strategyMap[win]);

  const secondDivider = `divider__${strategyMap[win]}`;
  // console.log("secondDivider: ", secondDivider);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Tic Tac Toe</h1>
      </header>
      <section className={styles.scores}>
        <Score player="X" score={playerScore.X} />
        <Score player="O" score={playerScore.O} />
      </section>
      <GameInfo player={player(gameState)} isTerminal={terminal(gameState)} />
      <div className={styles.main}>
        <div className={styles.board}>
          {gameState.map((el, index) => {
            return (
              <Cell
                player={player}
                icon={el}
                key={index}
                i={index}
                gameState={gameState}
                resultPlayerMove={resultPlayerMove}
                updateGameState={updateGameState}
                result={result}
                computerMove={computerMove}
                isWinningState={isWinningState}
                updateScore={updateScore}
                playerScore={playerScore}
              />
            );
          })}
        </div>
        <div
          className={`${styles.divider} ${
            isWinningState(gameState) && styles[secondDivider]
          }`}
        ></div>
      </div>
      <section className={styles.restart}>
        <button className={styles.button} onClick={handleRestart}>
          Restart game
        </button>
      </section>
    </div>
  );
}

export default App;
