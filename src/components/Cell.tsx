import CircleIcon from "./CircleIcon";
import CrossIcon from "./CrossIcon";
import styles from "./Cell.module.scss";
type Player = "X" | "O";
type cellState = "X" | "O" | "empty";
interface CellProps {
  icon: string;
  i: number;
  player: (s: cellState[]) => Player;
}
function Cell({
  icon,
  i,
  gameState,
  updateGameState,
  result,
  computerMove,
  isWinningState,
  updateScore,
  playerScore,
  player,
}: CellProps): JSX.Element {
  const empty = icon === "empty" && <div className={styles.empty}></div>;
  const X = icon === "X" && <CrossIcon />;
  const Y = icon === "O" && <CircleIcon />;

  function handleClick(): void {
    const nextState = result(gameState, i);
    updateGameState(() => {
      // const nextState = result(prevState, i);
      if (isWinningState(nextState)) {
        const winningPlayer = player(nextState) === "X" ? "O" : "X";
        updateScore(playerScore, winningPlayer);
      }
      return nextState;
    });
    // updateGameState(nextMove);
    if (!isWinningState(nextState)) {
      setTimeout(() => computerMove(nextMove), 1000);
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
