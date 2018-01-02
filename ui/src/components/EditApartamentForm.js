import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { get } from 'lodash';
import { floorConverter } from '../helpers/floors';
import { mapErrors, minValue0, number, required } from '../helpers/validation';
import { InputField } from './InputField';
import { FormNotification } from './FormNotification';
import { baseUrl } from '../constants/Config';
import { SelectField } from './SelectField';
import { TextareaField } from './TextareaField';
import { FileInput } from './FileInput';

class EditApartamentForm extends Component {
  constructor(props) {
    super();
    this.state = {
      counter: 0,
      picturesToAdd: [],
      picturesToDelete: [],
      picturesContent: {},
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
    let content = this.state.picturesContent[`pictures${number}`];
    if (content) {
      let newContent = {
        ...this.state.picturesContent
      };
      delete newContent[`pictures${number}`];
      this.setState({
        ...this.state,
        picturesToAdd: [
          ...this.state.picturesToAdd.slice(0, index),
          ...this.state.picturesToAdd.slice(index + 1)
        ],
        picturesContent: newContent
      });
    } else {
      this.setState({
        ...this.state,
        picturesToAdd: [
          ...this.state.picturesToAdd.slice(0, index),
          ...this.state.picturesToAdd.slice(index + 1)
        ]
      });
    }
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
      let picture = this.state.picturesContent[
        `pictures${this.state.picturesToAdd[i]}`
      ];
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

    return this.props.submitToServer(formData).catch(mapErrors);
  };

  handleFileChange = (id, file) => {
    this.setState({
      ...this.state,
      picturesContent: {
        ...this.state.picturesContent,
        [id]: file
      }
    });
  };

  render() {
    const {
      error,
      handleSubmit,
      submitting,
      initialValues,
      deleteFlat
    } = this.props;
    return (
      <div className="columns">
        <div className="column">
          <h1 className="title">
            {initialValues ? 'Edytuj mieszkanie' : 'Dodaj mieszkanie'}
          </h1>
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

            <Field
              name="Floor"
              component={SelectField}
              validate={[required]}
              label="Piętro"
            >
              <option />
              <option value="0">{floorConverter(0)}</option>
              <option value="1">{floorConverter(1)}</option>
              <option value="2">{floorConverter(2)}</option>
              <option value="3">{floorConverter(3)}</option>
              <option value="4">{floorConverter(4)}</option>
              <option value="5">{floorConverter(5)}</option>
            </Field>

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

            <Field
              name="Description"
              component={TextareaField}
              label="Krótki opis tekstowy"
              validate={[required]}
            />

            <Field
              name="Price"
              component={InputField}
              type="number"
              label="Cena"
              validate={[required, number, minValue0]}
            />

            {this.state.picturesToAdd.map(pictureAdd => (
              <div key={pictureAdd} className="file">
                <label className="file-label">
                  <Field
                    name={`pictures${pictureAdd}`}
                    component={FileInput}
                    onChange={(e, file) =>
                      this.handleFileChange(`pictures${pictureAdd}`, file)
                    }
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
            <div className={initialValues ? '' : 'is-hidden'}>
              <div className="field">
                <div className="control">
                  <button
                    className="button is-danger"
                    disabled={submitting}
                    type="button"
                    onClick={() => deleteFlat(initialValues.Id)}
                  >
                    Usuń mieszkanie
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="column">
          {this.state.existingPictures.map(picture => (
            <div className="card" key={picture.Id}>
              <div className="card-image">
                <figure className="image">
                  <img
                    src={`${baseUrl}uploads/${picture.Filename}`}
                    alt={picture.Filename}
                  />
                </figure>
              </div>
              <div className="card-content">
                <div className="content">{picture.Filename}</div>
              </div>
              <footer className="card-footer">
                <a
                  href="javascript:void(0)"
                  className="card-footer-item"
                  onClick={() => this.deleteExistingPicture(picture)}
                >
                  Usuń zdjęcie
                </a>
              </footer>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default reduxForm({
  form: 'editApartmentForm'
})(EditApartamentForm);
