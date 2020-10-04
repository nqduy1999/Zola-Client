export const MIN_CHARS = 3;
export const MAX_CHARS = 128;

export const required = (nameField, message, isRequired = true) => ({
  required: isRequired,
  message: message || `${nameField} is required.`
});

export const max = (nameField, value = MAX_CHARS, message) => ({
  max: value,
  message: message || `${nameField} must be at most ${value} characters long.`
});

export const min = (nameField, value = MIN_CHARS, message) => ({
  min: value,
  message: message || `${nameField} must be at least ${value} characters long.`
});

export const type = (nameField, typeField, message) => ({
  type: typeField,
  message: message || `${nameField} must be a ${typeField}.`
});

export const pattern = (nameField, regx, message) => ({
  pattern: regx,
  message: message || `Special characters are not allowed in ${nameField}.`
});

export const emailFormat = (nameField, regx, message) => ({
  pattern: regx,
  message: message || `Invalid ${nameField}.`
});

export const whitespace = (nameField, message) => ({
  whitespace: true,
  message: message || `${nameField} cannot be empty.`
});

export const number = (nameField, message) => ({
  pattern: /^\d+$/,
  message: message || `${nameField} must be a number.`
});

export const lowercase = (nameField, message) => ({
  pattern: /^[^A-Z\s]+$/,
  message: message || `${nameField} must be in lowercase.`
});

export const isPassConfirmedValid = (passValue, message) => ({
  validator: async (rule, value) => {
    if (!value || passValue === value) {
      return Promise.resolve();
    }
    return Promise.reject(message);
  }
});

export const hasNumber = value => {
  return new RegExp(/[0-9]/).test(value);
};
export const hasMixed = value => {
  return new RegExp(/[a-z]/).test(value) && new RegExp(/[A-Z]/).test(value);
};
export const hasSpecial = value => {
  return new RegExp(/[#$@!%&*?]/).test(value);
};
