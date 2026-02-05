const Priority = ({ priority }) => {
  const array = [1, 2, 3, 4, 5];
  return (
    <div className="flex gap-0.5">
      {array.map((level) => (
        <span
          key={level}
          className={`inline-block w-2 h-2 border border-retro-border ${
            level <= priority ? 'bg-retro-yellow' : 'bg-retro-bg'
          }`}
        />
      ))}
    </div>
  );
};

export default Priority;
