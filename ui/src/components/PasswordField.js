import React from 'react';

export const PasswordField = ({
  input,
  placeholder,
  meta: { touched, error }
}) => (
  <div className="field">
    <p className="control has-icons-left">
      <input
        {...input}
        placeholder={placeholder}
        className={
          'input ' + (touched ? (error ? 'is-danger' : 'is-success') : '')
        }
        type="password"
      />
      <span className="icon is-small is-left">
        <i className="fa fa-lock" />
      </span>
      {touched && (error && <p className="help is-danger">{error}</p>)}
    </p>
  </div>
);
