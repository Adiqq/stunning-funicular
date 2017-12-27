import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { post } from 'axios/index';

const EditApartamentForm = props => {
  const {
    handleSubmit,
    pristine,
    reset,
    submitting,
    flat,
    submitToServer
  } = props;
  const append = (form, fieldName, field) => {
    if (typeof field !== 'undefined') {
      form.append(fieldName, field);
    }
  };
  const onFormSubmit = data => {
    let formData = new FormData();
    append(formData, 'city', data.city);
    append(formData, 'street', data.street);
    append(formData, 'pictures', data.pictures[0]);
    append(formData, 'numberOfRooms', data.numberOfRooms);
    append(formData, 'roomArea', data.roomArea);
    append(formData, 'floor', data.floor);
    append(formData, 'hasBalcony', data.hasBalcony || false);
    append(formData, 'description', data.description);
    append(formData, 'price', data.price);

    submitToServer(formData);
  };
  return (
    <div className="wrapper">
      <h3>Dodaj mieszkanie</h3>

      <div>
        <form onSubmit={handleSubmit(onFormSubmit)}>
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

          <label htmlFor="pictures">Zdjęcie</label>
          <Field name="pictures" component="input" type="file" />

          <label htmlFor="numberOfRooms">Liczba pokoi</label>
          <Field name="numberOfRooms" component="input" type="number" />

          <label htmlFor="roomArea">Powierzchnia mieszkania</label>
          <Field name="roomArea" component="input" type="number" />

          <Field name="floor" component="select">
            <option />
            <option value="zero">Parter</option>
            <option value="first">1</option>
            <option value="second">2</option>
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

          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
};

export default reduxForm({
  form: 'editApartmentForm'
})(EditApartamentForm);
