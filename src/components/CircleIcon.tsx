import styles from "./CircleIcon.module.scss";
import { motion } from "framer-motion";
interface CircleIconProps {
  small?: boolean;
}
function CircleIcon({ small = false }: CircleIconProps): JSX.Element {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      className={`${styles.circle} ${small && styles.small}`}
      key="circle"
    ></motion.div>
  );
}

export default CircleIcon;
