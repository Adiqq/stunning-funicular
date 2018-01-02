import React from 'react';

export const TextareaField = ({ input, label, meta: { touched, error } }) => (
  <div className="field">
    <label className="label">{label}</label>
    <div className="control">
      <textarea
        {...input}
        className={
          'textarea ' + (touched ? (error ? 'is-danger' : 'is-success') : '')
        }
      />
      {touched && (error && <p className="help is-danger">{error}</p>)}
    </div>
  </div>
);
