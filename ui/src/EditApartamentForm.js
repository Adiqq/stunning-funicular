import React, { Component } from 'react';
import './EditApartamentForm.css';

class EditApartamentForm extends Component {
  render() {
    return (
      <div className="wrapper">
        <h3>Dodaj mieszkanie</h3>

        <div>
          <form>
            <label htmlFor="fname">Miasto</label>
            <input type="text" placeholder="Miasto" />

            <label htmlFor="lname">Ulica</label>
            <input type="text" placeholder="Ulica" />

            <label htmlFor="lname">Zdjęcie</label>
            <input type="file" name="pic" accept="image/*" />

            <label htmlFor="lname">Liczba pokoi</label>
            <input type="number" />

            <label htmlFor="lname">Powierzchnia mieszkania</label>
            <input type="number" />

            <label htmlFor="country">Piętro</label>
            <select id="country" name="country">
              <option value="australia">Parter</option>
              <option value="canada">1</option>
              <option value="usa">2</option>
            </select>

            <label htmlFor="lname">Posiada balkon</label>
            <input type="checkbox" />

            <label htmlFor="lname">Krótki opis tekstowy</label>
            <textarea />

            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    );
  }
}

export default EditApartamentForm;
