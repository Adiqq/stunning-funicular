import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { changePassword, deleteUser } from '../actions';
import { getUser } from '../reducers/users';

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
      <p>{user.Id}</p>
      <p>{user.PhoneNumber}</p>
      <button onClick={onDeleteUser}>Usuń użytkownika</button>
      <h2>Zmień hasło</h2>
      <form onSubmit={handleSubmit(onChangePassword)}>
        <label>Nowe hasło</label>
        <Field name="password" type="password" component="input" />
        <label>Powtórz hasło</label>
        <Field name="repeatPassword" type="password" component="input" />
        <button type="submit">Zmień hasło</button>
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
});

export default reduxForm({
  form: 'changePasswordForm'
})(UsersDetailsContainer);
