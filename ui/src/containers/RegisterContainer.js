import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { register } from '../actions';
import { connect } from 'react-redux';

let RegisterContainer = ({ handleSubmit, onRegister }) => (
  <form onSubmit={handleSubmit(onRegister)}>
    <div className="field">
      <p className="control has-icons-left has-icons-right">
        <Field
          className="input"
          name="email"
          component="input"
          type="email"
          placeholder="Email"
        />
        <span className="icon is-small is-left">
          <i className="fa fa-envelope" />
        </span>
      </p>
    </div>
    <div className="field">
      <p className="control has-icons-left">
        <Field
          className="input"
          name="password"
          component="input"
          type="password"
          placeholder="Hasło"
        />
        <span className="icon is-small is-left">
          <i className="fa fa-lock" />
        </span>
      </p>
    </div>
    <div className="field">
      <p className="control has-icons-left">
        <Field
          className="input"
          name="passwordRepeat"
          component="input"
          type="password"
          placeholder="Powtórz hasło"
        />
        <span className="icon is-small is-left">
          <i className="fa fa-lock" />
        </span>
      </p>
    </div>
    <div className="field">
      <p className="control has-icons-left has-icons-right">
        <Field
          className="input"
          name="phoneNumber"
          component="input"
          type="tel"
          placeholder="Numer telefonu"
        />
        <span className="icon is-small is-left">
          <i className="fa fa-phone" />
        </span>
      </p>
    </div>
    <div className="field">
      <p className="control">
        <input
          className="button is-success"
          type="submit"
          value="Utwórz konto"
        />
      </p>
    </div>
  </form>
);

RegisterContainer = connect(null, { onRegister: register })(RegisterContainer);

export default reduxForm({
  form: 'registerForm'
})(RegisterContainer);
