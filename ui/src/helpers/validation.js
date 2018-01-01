import { get, mapValues } from 'lodash';
import { SubmissionError } from 'redux-form';

export const required = value => (value ? undefined : 'Wymagane');
export const number = value =>
  value && isNaN(Number(value)) ? 'Musi być liczbą' : undefined;
export const minValue = min => value =>
  value && value < min ? `Minimalna wartość to ${min}` : undefined;
export const minValue0 = minValue(0);
export const phoneNumber = value =>
  value && !/^([0-9]{9})$/i.test(value)
    ? 'Nieprawidłowy numer telefonu, musi mieć 9 cyfr'
    : undefined;
export const minLength = min => value =>
  value && value.length < min
    ? `Musi mieć przynajmniej ${min} znaków`
    : undefined;
export const minLength5 = minLength(5);
export const hasNumber = value =>
  value && !/\d+/i.test(value) ? 'Musi zawierać cyfrę' : undefined;
export const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Nieprawidłowy adres email'
    : undefined;

export const mapErrors = reason => {
  const errors = get(reason, 'response.data.errors');
  if (errors) {
    const mapped = mapValues(errors, value => value.msg);
    throw new SubmissionError(mapped);
  } else {
    const error = get(reason, 'response.data');
    const mapped = { _error: error };
    throw new SubmissionError(mapped);
  }
};
