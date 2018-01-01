import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { register } from '../actions';
import { connect } from 'react-redux';
import { TelephoneField } from '../components/TelephoneField';
import {
  email,
  hasNumber,
  minLength5,
  phoneNumber,
  phonePrefix,
  required
} from '../helpers/validation';
import { PasswordField } from '../components/PasswordField';
import { EmailField } from '../components/EmailField';
import { FormNotification } from '../components/FormNotification';

const validate = values => {
  const errors = {};
  if (
    values.password &&
    values.passwordRepeat &&
    values.password !== values.passwordRepeat
  ) {
    errors.password = 'Hasło nie jest takie samo';
    errors.passwordRepeat = 'Hasło nie jest takie samo';
  }
  return errors;
};

let RegisterContainer = ({ handleSubmit, onRegister, submitting, error }) => (
  <form onSubmit={handleSubmit(onRegister)}>
    <FormNotification error={error} />
    <Field name="email" component={EmailField} validate={[required, email]} />
    <Field
      name="password"
      component={PasswordField}
      placeholder="Hasło"
      validate={[required, minLength5, hasNumber]}
    />
    <Field
      name="passwordRepeat"
      component={PasswordField}
      placeholder="Powtórz hasło"
      validate={[required, minLength5, hasNumber]}
    />
    <Field
      name="phoneNumber"
      component={TelephoneField}
      validate={[required, phoneNumber]}
    />
    <div className="field">
      <p className="control">
        <input
          className="button is-success"
          type="submit"
          value="Utwórz konto"
          disabled={submitting}
        />
      </p>
    </div>
  </form>
);

RegisterContainer = connect(null, { onRegister: register })(RegisterContainer);

export default reduxForm({
  form: 'registerForm',
  validate
})(RegisterContainer);
