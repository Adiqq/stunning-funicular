import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { login } from '../actions';
import { connect } from 'react-redux';

let LoginContainer = ({ handleSubmit, onLogin }) => (
  <form onSubmit={handleSubmit(onLogin)}>
    <label>E-mail</label>
    <Field name="email" component="input" type="email" placeholder="E-mail" />
    <label>Hasło</label>
    <Field name="password" component="input" type="password" />
    <input type="submit" value="Zaloguj" />
  </form>
);

LoginContainer = connect(null, { onLogin: login })(LoginContainer);

export default reduxForm({
  form: 'loginForm'
})(LoginContainer);
