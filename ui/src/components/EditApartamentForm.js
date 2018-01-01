import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { get } from 'lodash';
import { floorConverter } from '../helpers/floors';

class EditApartamentForm extends Component {
  constructor(props) {
    super();
    this.state = {
      counter: 0,
      picturesToAdd: [],
      picturesToDelete: [],
      existingPictures: get(props, 'initialValues.Pictures')
        ? get(props, 'initialValues.Pictures')
        : []
    };
  }

  addPicture = () => {
    this.setState({
      ...this.state,
      picturesToAdd: [...this.state.picturesToAdd, this.state.counter + 1],
      counter: this.state.counter + 1
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
      ],
      picturesToDelete: [...this.state.picturesToDelete, picture]
    });
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
    console.log(this.state);
    this.append(
      formData,
      'picturesToDelete',
      this.state.picturesToDelete.map(picture => picture.Id)
    );
    this.append(formData, 'flatId', get(this.props, 'initialValues.Id'));

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
      <div>
        <h3>Dodaj mieszkanie</h3>

        <div>
          <form onSubmit={handleSubmit(this.onFormSubmit)}>
            <div className="field">
              <label htmlFor="City">Miasto</label>
              <Field
                name="City"
                component="input"
                type="text"
                placeholder="Miasto"
              />
            </div>

            <div className="field">
              <label htmlFor="Street">Ulica</label>
              <Field
                name="Street"
                component="input"
                type="text"
                placeholder="Ulica"
              />
            </div>

            <div className="field">
              <label htmlFor="NumberOfRooms">Liczba pokoi</label>
              <Field name="NumberOfRooms" component="input" type="number" />
            </div>

            <div className="field">
              <label htmlFor="RoomArea">Powierzchnia mieszkania</label>
              <Field name="RoomArea" component="input" type="number" />
            </div>

            <div className="field">
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
            </div>

            <div className="field">
              <label htmlFor="HasBalcony">Posiada balkon</label>
              <Field
                name="HasBalcony"
                id="HasBalcony"
                component="input"
                type="checkbox"
              />
            </div>

            <div className="field">
              <label htmlFor="Description">Krótki opis tekstowy</label>
              <Field name="Description" component="input" type="textarea" />
            </div>

            <div className="field">
              <label htmlFor="Price">Cena</label>
              <Field name="Price" component="input" type="number" />
            </div>

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
              <div key={pictureAdd} className="file">
                <label className="file-label">
                  <Field
                    name={`pictures${pictureAdd}`}
                    component="input"
                    type="file"
                    className="file-input"
                  />
                  <span className="file-cta">
                    <span className="file-icon">
                      <i className="fa fa-upload" />
                    </span>
                    <span className="file-label">Dodaj zdjęcie</span>
                  </span>
                </label>
                <button
                  className="button"
                  type="button"
                  onClick={() => this.deletePicture(pictureAdd)}
                >
                  Usuń zdjęcie
                </button>
              </div>
            ))}

            <button className="button" type="button" onClick={this.addPicture}>
              Dodaj zdjęcie
            </button>

            <input className="button" type="submit" value="Dodaj" />
          </form>
        </div>
      </div>
    );
  }
}

export default reduxForm({
  form: 'editApartmentForm'
})(EditApartamentForm);
