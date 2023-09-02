interface PlayerProps {
  children: React.ReactNode;
}
function PlayerScore({ children }: PlayerProps): JSX.Element {
  return <div>{children}</div>;
}

export default PlayerScore;
