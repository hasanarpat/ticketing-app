const ProgressBar = ({ progress }) => {
  const pct = Math.min(100, Math.max(0, Number(progress) || 0));
  return (
    <div className="w-20 h-2 border border-retro-border bg-retro-bg overflow-hidden">
      <div
        className="h-full bg-retro-cyan transition-all"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
};

export default ProgressBar;
