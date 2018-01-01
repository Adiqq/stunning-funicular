import React from 'react';
export const FormNotification = ({ error }) => {
  if (error) {
    return <div className="notification is-danger">{error}</div>;
  }
  return null;
};
