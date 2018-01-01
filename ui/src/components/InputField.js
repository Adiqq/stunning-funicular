import React from 'react';

export const InputField = ({
  input,
  label,
  type,
  meta: { touched, error }
}) => (
  <div className="field">
    <label className="label">{label}</label>
    <div className="control">
      <input
        {...input}
        placeholder={label}
        type={type}
        className={
          'input ' + (touched ? (error ? 'is-danger' : 'is-success') : '')
        }
      />
      {touched && (error && <p className="help is-danger">{error}</p>)}
    </div>
  </div>
);
