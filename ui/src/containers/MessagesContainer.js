import React, { Component } from 'react';
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
    if (!messages || !messages.length) {
      return <h3 className="subtitle">Brak nowych wiadomości</h3>;
    }
    return (
      <nav className="panel">
        {messages.map(message => (
          <div
            key={message.SourceUserId + message.FlatId + message.Created}
            className="panel-block"
          >
            Użytkownik chce kupić&nbsp;
            <Link to={'/apartament/details/' + message.FlatId}>
              mieszkanie
            </Link>. Kontakt telefoniczny pod {message.User.PhoneNumber}.
            <div className="buttons">
              <button
                className="button"
                onClick={() => {
                  deleteFlatOffer(message);
                }}
              >
                Usuń
              </button>
              <button
                className="button"
                onClick={() => {
                  acceptFlatOffer(message);
                }}
              >
                Akceptuj
              </button>
            </div>
          </div>
        ))}
      </nav>
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
