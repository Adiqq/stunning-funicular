import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { login } from '../actions';
import { connect } from 'react-redux';
import { FormNotification } from '../components/FormNotification';
import { EmailField } from '../components/EmailField';
import { email, required } from '../helpers/validation';
import { PasswordField } from '../components/PasswordField';

let LoginContainer = ({ handleSubmit, onLogin, submitting, error }) => (
  <form onSubmit={handleSubmit(onLogin)}>
    <FormNotification error={error} />
    <Field name="email" component={EmailField} validate={[required, email]} />
    <Field
      name="password"
      component={PasswordField}
      placeholder="Hasło"
      validate={[required]}
    />
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
