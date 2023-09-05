import styles from "./CrossIcon.module.scss";
import { motion } from "framer-motion";
interface CrossIconProps {
  small?: boolean;
}
function CrossIcon({ small = false }: CrossIconProps): JSX.Element {
  return (
    <motion.div
      initial={{ scale: 0, rotate: 45 }}
      animate={{ scale: 1, rotate: 45 }}
      exit={{ scale: 0, rotate: 45 }}
      className={`${styles.cross} ${small && styles.small}`}
      key="cross"
    ></motion.div>
  );
}

export default CrossIcon;
