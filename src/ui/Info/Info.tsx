import styles from "./Info.module.scss";
import CircleIcon from "../../components/CircleIcon";
import CrossIcon from "../../components/CrossIcon";

interface InfoProps {
  player: string;
  isTerminal: boolean;
  isWinningState: boolean;
}
function Info({ player, isTerminal, isWinningState }: InfoProps): JSX.Element {
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

export default Info;
