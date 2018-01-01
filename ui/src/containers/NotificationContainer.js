import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getErrorNotifications,
  getSuccessNotifications
} from '../reducers/notifications';
import { removeErrorNotification, removeSuccessNotification } from '../actions';

const NotificationContainer = ({
  successNotifications,
  errorNotifications,
  removeSuccessNotification,
  removeErrorNotification
}) => {
  if (!successNotifications.length && !errorNotifications.length) return null;
  return (
    <section className="section">
      <div className="container">
        {successNotifications.map(notification => (
          <div className="notification is-success" key={notification.id}>
            {notification.message}
            {removeSuccessNotification(notification.id, 5000)}
          </div>
        ))}
        {errorNotifications.map(notification => (
          <div className="notification is-danger" key={notification.id}>
            {notification.message}
            {removeErrorNotification(notification.id, 5000)}
          </div>
        ))}
      </div>
    </section>
  );
};

NotificationContainer.propTypes = {
  successNotifications: PropTypes.arrayOf(
    PropTypes.shape({
      message: PropTypes.string.isRequired
    })
  ),
  removeSuccessNotification: PropTypes.func.isRequired,
  removeErrorNotification: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  successNotifications: getSuccessNotifications(state),
  errorNotifications: getErrorNotifications(state)
});

export default connect(mapStateToProps, {
  removeSuccessNotification,
  removeErrorNotification
})(NotificationContainer);
