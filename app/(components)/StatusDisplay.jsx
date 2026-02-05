const StatusDisplay = ({ status }) => {
  const style = {
    'not started': 'bg-retro-red text-retro-bg',
    'started': 'bg-retro-yellow text-retro-bg',
    'done': 'bg-retro-green text-retro-bg',
  };
  const s = (status || '').toLowerCase();
  const cls = style[s] || 'bg-retro-border text-retro-text';
  return (
    <span
      className={`inline-block border border-retro-border px-1.5 py-0.5 text-[10px] uppercase ${cls}`}
    >
      {status || '—'}
    </span>
  );
};

export default StatusDisplay;
