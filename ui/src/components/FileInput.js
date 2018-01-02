import React from 'react';

export const FileInput = ({ input, resetKey }) => {
  const { value, ...inputProps } = input;

  const handleChange = e => {
    input.onChange(e.target.files[0]);
  };

  return (
    <input
      {...inputProps}
      key={resetKey}
      className="file-input"
      type="file"
      onChange={handleChange}
      onBlur={() => {}}
    />
  );
};
