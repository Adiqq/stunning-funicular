import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import MainMenu from './MainMenu';
import Content from './Content';
import EditApartament from './EditApartament';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <MainMenu />
          <Route exact={true} path="/" component={Content} />
          <Route path="/apartament/:id?" component={EditApartament} />
        </div>
      </Router>
    );
  }
}

export default App;
