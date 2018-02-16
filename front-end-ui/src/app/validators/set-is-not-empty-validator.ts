import { ValidationErrors, FormControl } from '@angular/forms';

export class SetIsNotEmptyValidator {

  static isNotEmpty (control: FormControl): ValidationErrors {
    const value = control.value;
    let error = null;

    if (value === null || value === undefined || value.size === 0) {
      error = 'required';
    }
      const message = {
        'emptyError': {
          'message': error
        }
     };

     return error ? message : null;
  }
}
