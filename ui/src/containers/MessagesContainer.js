import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const MessagesContainer = ({ messages, deleteMessage }) => (
  <ul>
    messages.map(message =>{' '}
    {
      <li>
        Użytkownik chce kupić <a href={message.FlatUrl}>mieszkanie</a>. Kontakt
        telefoniczny pod {message.PhoneNumber}.
        <button
          onClick={() => {
            deleteMessage(message.Id);
          }}
        >
          Usuń
        </button>
      </li>
    })
  </ul>
);

const mapStateToProps = state => {
  return {
    messages: getMessages(state.messages)
  };
};

export default connect(mapStateToProps, { deleteMessage })(MessagesContainer);
