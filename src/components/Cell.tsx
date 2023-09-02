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
}: CellProps): JSX.Element {
  const empty = player === "empty" && <div className={styles.empty}></div>;
  const X = player === "X" && <CrossIcon />;
  const Y = player === "O" && <CircleIcon />;
  function handleClick(): void {
    const nextMove = resultPlayerMove(gameState, i);
    updateGameState(nextMove);
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
