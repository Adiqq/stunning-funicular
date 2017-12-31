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
      picturesToAdd: [],
      picturesToDelete: [],
      existingPictures: props.initialValues.Pictures
    };
  }

  addPicture = () => {
    this.setState({
      ...this.state,
      picturesToAdd: [...this.state.picturesToAdd, this.state.counter++]
    });
  };

  deletePicture = number => {
    let index = this.state.picturesToAdd.findIndex(
      element => element === number
    );
    this.setState({
      ...this.state,
      picturesToAdd: [
        ...this.state.picturesToAdd.slice(0, index),
        ...this.state.picturesToAdd.slice(index + 1)
      ]
    });
  };

  deleteExistingPicture = picture => {
    let index = this.state.existingPictures.findIndex(
      element => element.Filename === picture.Filename
    );
    this.setState({
      ...this.state,
      existingPictures: [
        ...this.state.existingPictures.slice(0, index),
        ...this.state.existingPictures.slice(index + 1)
      ]
    });
    this.state.picturesToDelete = [...this.state.picturesToDelete, picture];
  };

  append = (form, fieldName, field) => {
    if (typeof field !== 'undefined') {
      form.append(fieldName, field);
    }
  };

  onFormSubmit = data => {
    let formData = new FormData();
    this.append(formData, 'city', data.City);
    this.append(formData, 'street', data.Street);
    for (let i = 0; i < this.state.picturesToAdd.length; i++) {
      let pictureArray = data[`pictures${this.state.picturesToAdd[i]}`];
      let picture = pictureArray[0];
      this.append(formData, `pictures`, picture);
    }
    this.append(formData, 'numberOfRooms', data.NumberOfRooms);
    this.append(formData, 'roomArea', data.RoomArea);
    this.append(formData, 'floor', data.Floor);
    this.append(formData, 'hasBalcony', data.HasBalcony || false);
    this.append(formData, 'description', data.Description);
    this.append(formData, 'price', data.Price);

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
            <label htmlFor="City">Miasto</label>
            <Field
              name="City"
              component="input"
              type="text"
              placeholder="Miasto"
            />

            <label htmlFor="Street">Ulica</label>
            <Field
              name="Street"
              component="input"
              type="text"
              placeholder="Ulica"
            />

            <label htmlFor="NumberOfRooms">Liczba pokoi</label>
            <Field name="NumberOfRooms" component="input" type="number" />

            <label htmlFor="RoomArea">Powierzchnia mieszkania</label>
            <Field name="RoomArea" component="input" type="number" />

            <label htmlFor="Floor">Piętro</label>
            <Field name="Floor" component="select">
              <option />
              <option value="0">{floorConverter(0)}</option>
              <option value="1">{floorConverter(1)}</option>
              <option value="2">{floorConverter(2)}</option>
              <option value="3">{floorConverter(3)}</option>
              <option value="4">{floorConverter(4)}</option>
              <option value="5">{floorConverter(5)}</option>
            </Field>

            <label htmlFor="HasBalcony">Posiada balkon</label>
            <Field
              name="HasBalcony"
              id="HasBalcony"
              component="input"
              type="checkbox"
            />

            <label htmlFor="Description">Krótki opis tekstowy</label>
            <Field name="Description" component="input" type="textarea" />

            <label htmlFor="Price">Cena</label>
            <Field name="Price" component="input" type="number" />

            {this.state.existingPictures.map(picture => (
              <div key={picture.Filename}>
                <label>{picture.Filename}</label>
                <img
                  src={`http://localhost:3001/uploads/${picture.Filename}`}
                />
                <button
                  type="button"
                  onClick={() => this.deleteExistingPicture(picture)}
                >
                  Usuń zdjęcie
                </button>
              </div>
            ))}

            {this.state.picturesToAdd.map(pictureAdd => (
              <div key={pictureAdd}>
                <label htmlFor={`pictures${pictureAdd}`}>Nowe zdjęcie</label>
                <Field
                  name={`pictures${pictureAdd}`}
                  component="input"
                  type="file"
                />
                <button
                  type="button"
                  onClick={() => this.deletePicture(pictureAdd)}
                >
                  Usuń zdjęcie
                </button>
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
