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
    <div className="columns">
      <div className="column">
        <label className="label">{minLabel}</label>
        <input
          className="input"
          name="min"
          type="number"
          value={range.min}
          onChange={handleInputChange}
        />
      </div>
      <div className="column">
        <label className="label">{maxLabel}</label>
        <input
          className="input"
          name="max"
          type="number"
          value={range.max}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default RangeFilter;
