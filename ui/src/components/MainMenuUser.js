import React from 'react';
import { Link } from 'react-router-dom';
import { signout } from '../actions';
import { connect } from 'react-redux';
import { getId } from '../reducers/user';
import { getMessageCount } from '../reducers/flatOffers';

const MainMenuUser = ({ signout, userId, messageCounter }) => (
  <div className="navbar-menu is-active">
    <div className="navbar-start">
      <Link className="navbar-item" to="/">
        Mieszkania
      </Link>
      <Link className="navbar-item" to="/messages">
        Wiadomości ({messageCounter})
      </Link>
    </div>
    <div className="navbar-end">
      <a href="javascript:void(0)" onClick={signout} className="navbar-item">
        {`(${userId})`} Wyloguj
      </a>
    </div>
  </div>
);

const mapStateToProps = state => ({
  userId: getId(state),
  messageCounter: getMessageCount(state)
});

export default connect(mapStateToProps, { signout })(MainMenuUser);
