import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { changePassword, deleteUser } from '../actions';
import { getUser } from '../reducers/users';
import { ReadOnlyInputField } from '../components/ReadOnlyInputField';
import { InputField } from '../components/InputField';
import { minValue0, number, required } from '../helpers/validation';

let UsersDetailsContainer = ({
  user,
  handleSubmit,
  changePassword,
  deleteUser
}) => {
  const onChangePassword = data => {
    changePassword(user, data);
  };
  const onDeleteUser = () => {
    deleteUser(user);
  };
  return (
    <div>
      <h3 className="subtitle">Dane użytkownika</h3>
      <ReadOnlyInputField label="Email" value={user.Id} />
      <ReadOnlyInputField label="Numer telefonu" value={user.PhoneNumber} />
      <div className="field">
        <div className="control">
          <button onClick={onDeleteUser} className="button">
            Usuń użytkownika
          </button>
        </div>
      </div>
      <h3 className="subtitle">Zmień hasło</h3>
      <form onSubmit={handleSubmit(onChangePassword)}>
        <Field
          name="password"
          component={InputField}
          type="password"
          label="Nowe hasło"
          validate={[required]}
        />
        <Field
          name="repeatPassword"
          component={InputField}
          type="password"
          label="Powtórz hasło"
          validate={[required]}
        />
        <button type="submit" className="button">
          Zmień hasło
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  user: getUser(state, ownProps.match.params.id)
});

UsersDetailsContainer = connect(mapStateToProps, {
  changePassword,
  deleteUser
})(UsersDetailsContainer);

export default reduxForm({
  form: 'changePasswordForm'
})(UsersDetailsContainer);
