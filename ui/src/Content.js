import React, { Component } from 'react';
import './ApartamentsTable';
import ApartamentsTable from './ApartamentsTable';
import ApartamentsButtons from './ApartamentsButtons';

class Content extends Component {
  render() {
    return (
      <div>
        <ApartamentsButtons />
        <ApartamentsTable />
      </div>
    );
  }
}

export default Content;
