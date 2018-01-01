export const required = value => (value ? undefined : 'Wymagane');
export const number = value =>
  value && isNaN(Number(value)) ? 'Musi być liczbą' : undefined;
export const minValue = min => value =>
  value && value < min ? `Minimalna wartość to ${min}` : undefined;
export const minValue0 = minValue(0);
