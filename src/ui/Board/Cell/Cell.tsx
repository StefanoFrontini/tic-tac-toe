import CircleIcon from "../../../components/CircleIcon";
import CrossIcon from "../../../components/CrossIcon";
import styles from "./Cell.module.scss";
import type { Player, CellState, PlayerScore } from "../lib/ai";
import { result, player, isWinningState } from "../lib/ai";

interface CellProps {
  icon: string;
  i: number;
  gameState: CellState[];
  updateGameState: (s: () => CellState[]) => void;
  computerMove: (s: CellState[]) => void;
  updateScore: (score: PlayerScore, winningPlayer: Player) => void;
  playerScore: PlayerScore;
}
function Cell({
  icon,
  i,
  gameState,
  updateGameState,
  computerMove,
  updateScore,
  playerScore,
}: CellProps): JSX.Element {
  const empty = icon === "empty" && <div className={styles.empty}></div>;
  const X = icon === "X" && <CrossIcon />;
  const Y = icon === "O" && <CircleIcon />;

  function handleClick(): void {
    if (gameState[i] !== "empty") return;
    if (player(gameState) === "O") return;
    const nextState = result(gameState, i);
    updateGameState(() => {
      if (isWinningState(nextState)) {
        const winningPlayer = player(nextState) === "X" ? "O" : "X";
        updateScore(playerScore, winningPlayer);
      }
      return nextState;
    });
    // updateGameState(nextMove);
    if (!isWinningState(nextState)) {
      setTimeout(() => computerMove(nextState), 1000);
    }
  }

  return (
    <div className={styles.cell} onClick={handleClick}>
      {empty}
      {X}
      {Y}
    </div>
  );
}

export default Cell;
