import { ValidationError } from 'yup';

export interface ErrorMessages {
  [key: string]: string;
}

export function getValidationErrors(err: ValidationError): ErrorMessages {
  const validationErrors: ErrorMessages = {};

  err.inner.forEach(error => {
    validationErrors[error.path!] = error.message;
  });

  return validationErrors;
}
