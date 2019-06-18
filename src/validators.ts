import { TodoItem, TodoItemState } from './models';

/*
 *
 * The Validators illustrate the concept of Class Decorators
 *
 */

export class ValidatableTodo implements TodoItem {
  id = 0;
  task = '';
  state = TodoItemState.Active;
}

export interface ValidatableTodo extends IValidatable {}

export interface IValidatable {
  validate(): IValidationResult[];
}

export interface IValidationResult {
  isValid: boolean;
  message: string;
  property?: string;
}

export interface IValidator {
  (instance: Object): IValidationResult;
}

function validate(): IValidationResult[] {
  // this = the object which runs `validate`
  console.log(this);

  const validators: IValidator[] = [].concat(this._validators);
  const errors: IValidationResult[] = [];

  for (const validator of validators) {
    const result = validator(this);

    if (!result.isValid) {
      errors.push(result);
    }
  }

  return errors;
}

/**
 * Validatable Decorator
 */
export function validatable(target: Function) {
  console.log(target);

  // extend the target's prototype with the validate method
  target.prototype.validate = validate;
}

// tests
const i = new ValidatableTodo();
