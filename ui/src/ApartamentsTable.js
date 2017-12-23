import React, { Component } from 'react';
import './ApartamentsTable.css';

class ApartamentsTable extends Component {
  render() {
    return (
      <table id="customers">
        <tr>
          <th>Zdjęcie</th>
          <th>Miasto</th>
          <th>Liczba pokoi</th>
          <th>Piętro</th>
          <th>Posiada balkon</th>
          <th>Cena</th>
        </tr>
        <tr>
          <td>Alfreds Futterkiste</td>
          <td>Maria Anders</td>
          <td>Germany</td>
        </tr>
      </table>
    );
  }
}

export default ApartamentsTable;
