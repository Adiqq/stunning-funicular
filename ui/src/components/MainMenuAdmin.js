import React from 'react';
import { Link } from 'react-router-dom';
import { signout } from '../actions';
import { connect } from 'react-redux';
import { getId } from '../reducers/user';
import { getMessageCount } from '../reducers/flatOffers';

const MainMenuAdmin = ({ signout, userId, messageCounter }) => (
  <ul>
    <li>
      <Link to="/">Mieszkania</Link>
    </li>
    <li>
      <Link to="/messages">Wiadomości ({messageCounter})</Link>
    </li>
    <li>
      <Link to="/users">Użytkownicy</Link>
    </li>
    <li>
      <a href="javascript:void(0)" onClick={signout}>
        {`(${userId})`} Wyloguj
      </a>
    </li>
  </ul>
);

const mapStateToProps = state => ({
  userId: getId(state),
  messageCounter: getMessageCount(state)
});

export default connect(mapStateToProps, { signout })(MainMenuAdmin);
