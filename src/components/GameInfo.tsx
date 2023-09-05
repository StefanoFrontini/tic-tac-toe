import styles from "./GameInfo.module.scss";
import CircleIcon from "./CircleIcon";
import CrossIcon from "./CrossIcon";
interface GameInfoProps {
  player: string;
  isTerminal: boolean;
  isWinningState: boolean;
}
function GameInfo({
  player,
  isTerminal,
  isWinningState,
}: GameInfoProps): JSX.Element {
  const icon =
    player === "X" ? <CrossIcon small={true} /> : <CircleIcon small={true} />;
  const winIcon =
    player === "X" ? <CircleIcon small={true} /> : <CrossIcon small={true} />;
  return (
    <section className={styles.info}>
      {isTerminal && !isWinningState && <div>Draw</div>}
      {isTerminal && isWinningState && winIcon}
      {isTerminal && isWinningState && <div>wins!</div>}
      {!isTerminal && icon}
      {!isTerminal && <div> Turn</div>}
    </section>
  );
}

export default GameInfo;
