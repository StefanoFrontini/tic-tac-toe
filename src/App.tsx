import { useState } from "react";
import { Header } from "./ui/Header";
import { Info } from "./ui/Info";
import Scores from "./ui/Scores/Scores";
import { Board } from "./ui/Board";
import {
  initialState,
  terminal,
  isWinningState,
  result,
  winningStrategy,
  strategyMap,
  player,
  initialScore,
  minValue,
} from "./ui/Board/lib/ai";
import type { CellState, PlayerScore, Player } from "./ui/Board/lib/ai";

function App(): JSX.Element {
  const [gameState, setGameState] = useState<CellState[]>(initialState);
  const [playerScore, setPlayerScore] = useState<PlayerScore>(initialScore);

  function computerMove(s: CellState[]): void {
    if (terminal(s)) return;
    const bestValue = minValue(s);
    console.log("bestValue", bestValue);
    function getMove(): number {
      const bestMove = bestValue.results.find(
        (el) => el.value === bestValue.value
      );
      if (!bestMove) {
        throw new Error("Computer should not make a move");
      }
      return bestMove.action;
    }
    setGameState((prevState) => {
      const nextState = result(prevState, getMove());
      if (isWinningState(nextState)) {
        const winningPlayer = player(nextState) === "X" ? "O" : "X";
        updateScore(playerScore, winningPlayer);
      }
      return nextState;
    });
  }
  function updateGameState(s: () => CellState[]): void {
    setGameState(s);
  }
  function handleRestart(): void {
    setGameState(initialState);
  }
  function updateScore(score: PlayerScore, winningPlayer: Player): void {
    const newScore = { ...score, [winningPlayer]: score[winningPlayer] + 1 };
    setPlayerScore(newScore);
  }
  const win = JSON.stringify(winningStrategy(gameState));

  const secondDivider = `divider__${strategyMap[win]}`;

  return (
    <>
      <Header />
      <Scores playerScore={playerScore} />
      <Info
        player={player(gameState)}
        isTerminal={terminal(gameState)}
        isWinningState={isWinningState(gameState)}
      />
      <Board
        gameState={gameState}
        updateGameState={updateGameState}
        computerMove={computerMove}
        updateScore={updateScore}
        playerScore={playerScore}
        secondDivider={secondDivider}
        handleRestart={handleRestart}
      />
    </>
  );
}

export default App;
