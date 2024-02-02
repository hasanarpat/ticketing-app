const StatusDisplay = ({ status }) => {
  const setColor = (status) => {
    let color = 'bg-slate-700';

    switch (status) {
      case 'not started':
        color = 'bg-red-200';
        return color;
      case 'started':
        color = 'bg-yellow-200';
        return color;
      case 'done':
        color = 'bg-green-200';
        return color;

      default:
        break;
    }
    return color;
  };

  return (
    <span
      className={`inline-block rounded-full px-2 py-1 text-xs font-semibold text-gray-700 ${setColor(
        status
      )}`}
    >
      {status}
    </span>
  );
};

export default StatusDisplay;
