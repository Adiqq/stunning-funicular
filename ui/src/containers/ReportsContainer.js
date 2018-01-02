import React, { Component } from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { FormNotification } from '../components/FormNotification';
import { maxValue12, minValue1, required } from '../helpers/validation';
import { InputField } from '../components/InputField';
import reports from '../api/reports';
import { get } from 'lodash';

class ReportsContainer extends Component {
  onSubmit = data => {
    return reports
      .get(data.year, data.month)
      .then(result => {
        this.setState(result.data);
      })
      .catch(reason => {
        const error = get(reason, 'response.data');
        const mapped = { _error: error };
        throw new SubmissionError(mapped);
      });
  };

  render() {
    const { handleSubmit, submitting, error } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <FormNotification error={error} />
          <Field
            name="year"
            type="number"
            component={InputField}
            label="Rok"
            validate={[required]}
          />
          <Field
            name="month"
            type="number"
            component={InputField}
            label="Miesiąc"
            validate={[required, minValue1, maxValue12]}
          />
          <div className="field">
            <p className="control">
              <input
                className="button is-success"
                type="submit"
                value="Generuj raport"
                disabled={submitting}
              />
            </p>
          </div>
        </form>
        <div className={this.state ? '' : 'is-hidden'}>
          <h3 className="subtitle">Raport</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Liczba mieszkań</th>
                <th>Średnia cena</th>
                <th>Średnia powierzchnia</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{this.state ? this.state.count : ''}</td>
                <td>{this.state ? this.state.price : ''}</td>
                <td>{this.state ? this.state.area : ''}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default reduxForm({
  form: 'reportsForm'
})(ReportsContainer);
