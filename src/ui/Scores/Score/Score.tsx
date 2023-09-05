import CircleIcon from "../../../components/CircleIcon";
import CrossIcon from "../../../components/CrossIcon";
import styles from "./Score.module.scss";

interface ScoreProps {
  player: string;
  score: number;
}
function Score({ player, score }: ScoreProps): JSX.Element {
  const icon =
    player === "O" ? <CircleIcon small={true} /> : <CrossIcon small={true} />;
  return (
    <div className={styles.score}>
      {icon}
      <div className={styles.wins}>{score}</div>
    </div>
  );
}

export default Score;
