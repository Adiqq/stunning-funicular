import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getMessages } from '../reducers/flatOffers';
import { acceptFlatOffer, deleteFlatOffer, getAllFlatOffers } from '../actions';
import { Link } from 'react-router-dom';

class MessagesContainer extends Component {
  componentDidMount() {
    this.props.getAllFlatOffers();
  }
  render() {
    const { messages, deleteFlatOffer, acceptFlatOffer } = this.props;
    return (
      <ul>
        {messages.map(message => (
          <li key={message.SourceUserId + message.FlatId + message.Created}>
            Użytkownik chce kupić{' '}
            <Link to={'/apartament/details/' + message.FlatId}>mieszkanie</Link>.
            Kontakt telefoniczny pod {message.User.PhoneNumber}.
            <button
              onClick={() => {
                deleteFlatOffer(message);
              }}
            >
              Usuń
            </button>
            <button
              onClick={() => {
                acceptFlatOffer(message);
              }}
            >
              Akceptuj
            </button>
          </li>
        ))}
      </ul>
    );
  }
}

const mapStateToProps = state => {
  return {
    messages: getMessages(state.flatOffers)
  };
};

export default connect(mapStateToProps, {
  deleteFlatOffer,
  acceptFlatOffer,
  getAllFlatOffers
})(MessagesContainer);
