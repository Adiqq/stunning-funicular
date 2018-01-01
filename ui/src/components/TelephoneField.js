import React from 'react';

export const TelephoneField = ({ input, meta: { touched, error } }) => (
  <div className="field is-expanded">
    <div className="field has-addons">
      <p className="control">
        <a className="button is-static">+48</a>
      </p>
      <p className="control is-expanded">
        <input
          {...input}
          className={
            'input ' + (touched ? (error ? 'is-danger' : 'is-success') : '')
          }
          type="tel"
          placeholder="Numer telefonu"
        />
      </p>
    </div>
    {touched && (error && <p className="help is-danger">{error}</p>)}
  </div>
);
