import styles from "./Header.module.scss";
function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Tic Tac Toe</h1>
    </header>
  );
}

export default Header;
