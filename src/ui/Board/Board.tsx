import { Cell } from "./Cell";
import { isWinningState } from "./lib/ai";
import type { CellState, PlayerScore, Player } from "./lib/ai";
import styles from "./Board.module.scss";
import { motion } from "framer-motion";

interface BoardProps {
  gameState: CellState[];
  updateGameState: (s: () => CellState[]) => void;
  computerMove: (s: CellState[]) => void;
  updateScore: (score: PlayerScore, winningPlayer: Player) => void;
  playerScore: PlayerScore;
  secondDivider: string;
  handleRestart: () => void;
}
function Board({
  gameState,
  updateGameState,
  computerMove,
  updateScore,
  playerScore,
  secondDivider,
  handleRestart,
}: BoardProps): JSX.Element {
  return (
    <main className={styles.main}>
      <div className={styles.board}>
        {gameState.map((el, index) => {
          return (
            <Cell
              icon={el}
              key={index}
              i={index}
              gameState={gameState}
              updateGameState={updateGameState}
              computerMove={computerMove}
              updateScore={updateScore}
              playerScore={playerScore}
            />
          );
        })}
      </div>
      <motion.div
        animate={{
          opacity: isWinningState(gameState) ? 1 : 0,
        }}
        transition={{ duration: 1 }}
        className={`${
          isWinningState(gameState)
            ? styles.divider + " " + styles[secondDivider]
            : ""
        }`}
      ></motion.div>
      <div className={styles.restart}>
        <button className={styles.button} onClick={handleRestart}>
          Restart game
        </button>
      </div>
    </main>
  );
}

export default Board;
