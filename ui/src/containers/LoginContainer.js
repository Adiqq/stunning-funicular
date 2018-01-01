import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { login } from '../actions';
import { connect } from 'react-redux';
import { FormNotification } from '../components/FormNotification';

let LoginContainer = ({ handleSubmit, onLogin, submitting, error }) => (
  <form onSubmit={handleSubmit(onLogin)}>
    <FormNotification error={error} />
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
          placeholder="Password"
        />
        <span className="icon is-small is-left">
          <i className="fa fa-lock" />
        </span>
      </p>
    </div>
    <div className="field">
      <p className="control">
        <input
          className="button is-success"
          type="submit"
          value="Zaloguj"
          disabled={submitting}
        />
      </p>
    </div>
  </form>
);

LoginContainer = connect(null, { onLogin: login })(LoginContainer);

export default reduxForm({
  form: 'loginForm'
})(LoginContainer);
