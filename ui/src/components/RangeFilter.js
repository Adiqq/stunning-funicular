import React from 'react';

const RangeFilter = ({ minLabel, maxLabel, range, filterChanged }) => {
  const handleInputChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    range = {
      ...range,
      [name]: value
    };
    filterChanged(range);
  };
  return (
    <div>
      <label>{minLabel}</label>
      <input
        name="min"
        type="number"
        value={range.min}
        onChange={handleInputChange}
      />
      <label>{maxLabel}</label>
      <input
        name="max"
        type="number"
        value={range.max}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default RangeFilter;
