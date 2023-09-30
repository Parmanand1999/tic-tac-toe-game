import React from 'react';

const Square = ({ value, onClick }) => {
  const isX = value === 'X';

  return (
    <div
    style={{ color: isX ? 'red' : 'blue' }}
      className={`border-2   border-white w-20 h-20 flex justify-center items-center`}
      onClick={onClick}
    >
      <h4>{value}</h4>
    </div>
  );
};

export default Square;
