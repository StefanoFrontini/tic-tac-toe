import CircleIcon from "./CircleIcon";
import CrossIcon from "./CrossIcon";
import styles from "./Score.module.css";

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
