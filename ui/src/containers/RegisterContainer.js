import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { register } from '../actions';
import { connect } from 'react-redux';

let RegisterContainer = ({ handleSubmit, onRegister }) => (
  <form onSubmit={handleSubmit(onRegister)}>
    <label>E-mail</label>
    <Field name="email" component="input" type="email" placeholder="E-mail" />
    <label>Hasło</label>
    <Field name="password" component="input" type="password" />
    <label>Powtórz hasło</label>
    <Field name="passwordRepeat" component="input" type="password" />
    <label>Telefon</label>
    <Field name="phoneNumber" component="input" type="tel" />
    <input type="submit" value="Utwórz konto" />
  </form>
);

RegisterContainer = connect(null, { onRegister: register })(RegisterContainer);

export default reduxForm({
  form: 'registerForm'
})(RegisterContainer);
