export interface IValidationResult {
  isValid: boolean;
  message: string;
  property?: string;
}

export interface IValidatable {
  validate(): IValidationResult[];
}
