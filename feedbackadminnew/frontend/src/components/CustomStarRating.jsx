import React from 'react';

const CustomStarRating = ({ value, onChange }) => {
  const stars = [1, 2, 3, 4, 5]; // Total number of stars

  return (
    <div>
      {stars.map((starValue) => (
        <span
          key={starValue}
          style={{ cursor: 'pointer', color: starValue <= value ? 'gold' : 'gray' }}
          onClick={() => onChange(starValue)}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default CustomStarRating;