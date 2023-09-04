import styles from "./CircleIcon.module.scss";
interface CircleIconProps {
  small?: boolean;
}
function CircleIcon({ small = false }: CircleIconProps): JSX.Element {
  return <div className={`${styles.circle} ${small && styles.small}`}></div>;
}

export default CircleIcon;
