import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { post } from 'axios/index';
import { floorConverter } from '../helpers/floors';
import './EditApartamentForm.css';

class EditApartamentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      picturesToAdd: []
    };
  }

  addPicture = () => {
    this.setState({
      ...this.state,
      picturesToAdd: [...this.state.picturesToAdd, this.state.counter++]
    });
  };

  deletePicture = number => {
    let index = this.props.picturesToAdd.findIndex(
      element => element === number
    );
    this.props.picturesToAdd = [
      ...this.props.picturesToAdd.slice(0, index),
      ...this.props.picturesToAdd.slice(index + 1)
    ];
  };

  append = (form, fieldName, field) => {
    if (typeof field !== 'undefined') {
      form.append(fieldName, field);
    }
  };

  onFormSubmit = data => {
    let formData = new FormData();
    this.append(formData, 'city', data.city);
    this.append(formData, 'street', data.street);
    for (let i = 0; i < this.state.picturesToAdd.length; i++) {
      let pictureArray = data[`pictures${this.state.picturesToAdd[i]}`];
      let picture = pictureArray[0];
      this.append(formData, `pictures`, picture);
    }
    this.append(formData, 'numberOfRooms', data.numberOfRooms);
    this.append(formData, 'roomArea', data.roomArea);
    this.append(formData, 'floor', data.floor);
    this.append(formData, 'hasBalcony', data.hasBalcony || false);
    this.append(formData, 'description', data.description);
    this.append(formData, 'price', data.price);

    this.props.submitToServer(formData);
  };

  render() {
    const {
      handleSubmit,
      pristine,
      reset,
      submitting,
      flat,
      submitToServer
    } = this.props;
    return (
      <div className="wrapper">
        <h3>Dodaj mieszkanie</h3>

        <div>
          <form onSubmit={handleSubmit(this.onFormSubmit)}>
            <label htmlFor="city">Miasto</label>
            <Field
              name="city"
              component="input"
              type="text"
              placeholder="Miasto"
            />

            <label htmlFor="street">Ulica</label>
            <Field
              name="street"
              component="input"
              type="text"
              placeholder="Ulica"
            />

            <label htmlFor="numberOfRooms">Liczba pokoi</label>
            <Field name="numberOfRooms" component="input" type="number" />

            <label htmlFor="roomArea">Powierzchnia mieszkania</label>
            <Field name="roomArea" component="input" type="number" />

            <label htmlFor="floor">Piętro</label>
            <Field name="floor" component="select">
              <option />
              <option value="0">{floorConverter(0)}</option>
              <option value="1">{floorConverter(1)}</option>
              <option value="2">{floorConverter(2)}</option>
              <option value="3">{floorConverter(3)}</option>
              <option value="4">{floorConverter(4)}</option>
              <option value="5">{floorConverter(5)}</option>
            </Field>

            <label htmlFor="hasBalcony">Posiada balkon</label>
            <Field
              name="hasBalcony"
              id="hasBalcony"
              component="input"
              type="checkbox"
            />

            <label htmlFor="description">Krótki opis tekstowy</label>
            <Field name="description" component="input" type="textarea" />

            <label htmlFor="price">Cena</label>
            <Field name="price" component="input" type="number" />

            {this.state.picturesToAdd.map(pictureAdd => (
              <div>
                <label htmlFor="pictures">Zdjęcie</label>
                <Field
                  name={`pictures${pictureAdd}`}
                  component="input"
                  type="file"
                />
              </div>
            ))}

            <button type="button" onClick={this.addPicture}>
              Dodaj zdjęcie
            </button>

            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    );
  }
}

export default reduxForm({
  form: 'editApartmentForm'
})(EditApartamentForm);
