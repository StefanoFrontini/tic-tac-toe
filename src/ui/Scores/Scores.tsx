import { Score } from "./Score";
import styles from "./Scores.module.scss";

import type { PlayerScore } from "../Board/lib/ai";
function Scores({ playerScore }: { playerScore: PlayerScore }): JSX.Element {
  return (
    <section className={styles.scores}>
      <Score player="X" score={playerScore.X} />
      <Score player="O" score={playerScore.O} />
    </section>
  );
}

export default Scores;
