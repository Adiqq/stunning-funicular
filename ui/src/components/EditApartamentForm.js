import React, { Component } from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { get, mapValues } from 'lodash';
import { floorConverter } from '../helpers/floors';
import { minValue0, number, required } from '../helpers/validation';
import { InputField } from './InputField';
import { FormNotification } from './FormNotification';

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

    return this.props.submitToServer(formData).catch(reason => {
      const errors = get(reason, 'response.data.errors');
      if (errors) {
        const mapped = mapValues(errors, value => value.msg);
        console.log(mapped);
        throw new SubmissionError(mapped);
      } else {
        const error = get(reason, 'response.data');
        const mapped = { _error: error };
        console.log(mapped);
        throw new SubmissionError(mapped);
      }
    });
  };

  render() {
    const { error, handleSubmit, submitting } = this.props;
    return (
      <div>
        <h1 className="title">Dodaj mieszkanie</h1>
        <FormNotification error={error} />
        <form onSubmit={handleSubmit(this.onFormSubmit)}>
          <Field
            name="City"
            component={InputField}
            type="text"
            label="Miasto"
            validate={[required]}
          />
          <Field
            name="Street"
            component={InputField}
            type="text"
            label="Ulica"
            validate={[required]}
          />

          <Field
            name="NumberOfRooms"
            component={InputField}
            type="number"
            label="Liczba pokoi"
            validate={[required, number, minValue0]}
          />

          <Field
            name="RoomArea"
            component={InputField}
            type="number"
            label="Powierzchnia mieszkania"
            validate={[required, number, minValue0]}
          />

          <div className="field">
            <label className="label">Piętro</label>
            <div className="control">
              <div className="select">
                <Field name="Floor" component="select" validate={[required]}>
                  <option />
                  <option value="0">{floorConverter(0)}</option>
                  <option value="1">{floorConverter(1)}</option>
                  <option value="2">{floorConverter(2)}</option>
                  <option value="3">{floorConverter(3)}</option>
                  <option value="4">{floorConverter(4)}</option>
                  <option value="5">{floorConverter(5)}</option>
                </Field>
              </div>
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label className="checkbox">
                <Field
                  name="HasBalcony"
                  id="HasBalcony"
                  component="input"
                  type="checkbox"
                />
                &nbsp;Posiada balkon
              </label>
            </div>
          </div>

          <div className="field">
            <label className="label">Krótki opis tekstowy</label>
            <div className="control">
              <Field
                className="textarea"
                name="Description"
                component="textarea"
                validate={[required]}
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Cena</label>
            <div className="control">
              <Field
                className="input"
                name="Price"
                component="input"
                type="number"
                validate={[required, number, minValue0]}
              />
            </div>
          </div>

          {this.state.existingPictures.map(picture => (
            <div key={picture.Filename}>
              <label>{picture.Filename}</label>
              <img src={`http://localhost:3001/uploads/${picture.Filename}`} />
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

          <div className="field">
            <div className="control">
              <button
                className="button"
                type="button"
                onClick={this.addPicture}
              >
                Dodaj zdjęcie
              </button>
            </div>
          </div>

          <div className="field">
            <div className="control">
              <input
                className="button is-link"
                type="submit"
                value="Zapisz"
                disabled={submitting}
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'editApartmentForm'
})(EditApartamentForm);
