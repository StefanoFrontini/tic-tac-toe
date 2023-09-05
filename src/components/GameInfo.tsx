import styles from "./GameInfo.module.scss";
import CircleIcon from "./CircleIcon";
import CrossIcon from "./CrossIcon";
interface GameInfoProps {
  player: string;
  isTerminal: boolean;
}
function GameInfo({ player, isTerminal }: GameInfoProps): JSX.Element {
  const icon =
    player === "X" ? <CrossIcon small={true} /> : <CircleIcon small={true} />;
  return (
    <section className={styles.info}>
      {!isTerminal && icon}
      <div>{isTerminal ? "Game Over" : "Turn"}</div>
    </section>
  );
}

export default GameInfo;
