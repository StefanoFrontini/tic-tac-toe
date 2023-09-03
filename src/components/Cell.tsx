import CircleIcon from "./CircleIcon";
import CrossIcon from "./CrossIcon";
import styles from "./Cell.module.scss";
interface CellProps {
  player: string;
  i: number;
}
function Cell({
  player,
  i,
  gameState,
  updateGameState,
  resultPlayerMove,
  result,
  computerMove,
}: CellProps): JSX.Element {
  const empty = player === "empty" && <div className={styles.empty}></div>;
  const X = player === "X" && <CrossIcon />;
  const Y = player === "O" && <CircleIcon />;

  function handleClick(): void {
    const nextMove = result(gameState, i);
    updateGameState(nextMove);
    setTimeout(() => computerMove(nextMove), 1000);
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
