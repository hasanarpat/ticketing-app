const Priority = ({ priority }) => {
  const array = [0, 1, 2, 3, 4];

  return (
    <div className="flex justify-start align-baseline text-2xl">
      {array.map((item, _i) =>
        item < priority ? <span key={_i}>🔥</span> : <span key={_i}>🧯</span>
      )}
    </div>
  );
};

export default Priority;
