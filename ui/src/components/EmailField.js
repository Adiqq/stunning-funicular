import React from 'react';

export const EmailField = ({ input, meta: { touched, error } }) => (
  <div className="field">
    <p className="control has-icons-left">
      <input
        {...input}
        placeholder="Email"
        className={
          'input ' + (touched ? (error ? 'is-danger' : 'is-success') : '')
        }
        type="email"
      />
      <span className="icon is-small is-left">
        <i className="fa fa-envelope" />
      </span>
      {touched && (error && <p className="help is-danger">{error}</p>)}
    </p>
  </div>
);
