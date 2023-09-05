import CircleIcon from "../../../components/CircleIcon";
import CrossIcon from "../../../components/CrossIcon";
import styles from "./Cell.module.scss";
import type { Player, CellState, PlayerScore } from "../lib/ai";
import { result, player, isWinningState } from "../lib/ai";
import { motion, AnimatePresence } from "framer-motion";

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
  const empty = icon === "empty" && (
    <div key="empty" className={styles.empty}></div>
  );
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
    if (!isWinningState(nextState)) {
      setTimeout(() => computerMove(nextState), 1000);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className={styles.cell}
      onClick={handleClick}
    >
      <AnimatePresence>
        {empty}
        {X}
        {Y}
      </AnimatePresence>
    </motion.div>
  );
}

export default Cell;
