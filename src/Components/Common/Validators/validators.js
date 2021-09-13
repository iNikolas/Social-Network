export function required(value) {
  return value ? undefined : "This field is required";
}

export function mustBeNumber(value) {
  return isNaN(value) ? "Must be a number" : undefined;
}

export function minLength(min) {
  return function (value) {
    value = value ?? "";
    return value.length > min
      ? undefined
      : `Minimum length for this string is ${min} characters`;
  };
}

export function maxLength(max) {
  return function (value) {
    value = value ?? "";
    return value.length < max
      ? undefined
      : `Maximum length for this string is ${max}`;
  };
}

export function composeValidators(...validators) {
  return function (value) {
    return validators.reduce(
      (error, validator) => error || validator(value),
      undefined
    );
  };
}
