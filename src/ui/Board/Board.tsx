import { Cell } from "./Cell";
import { isWinningState } from "./lib/ai";
import type { CellState, PlayerScore, Player } from "./lib/ai";
import styles from "./Board.module.scss";

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
    <div className={styles.main}>
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
      <div
        className={`${styles.divider} ${
          isWinningState(gameState) && styles[secondDivider]
        }`}
      ></div>
      <div className={styles.restart}>
        <button className={styles.button} onClick={handleRestart}>
          Restart game
        </button>
      </div>
    </div>
  );
}

export default Board;
