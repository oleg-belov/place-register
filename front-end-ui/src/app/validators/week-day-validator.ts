import { ValidationErrors, FormGroup } from '@angular/forms';

export class WeekDayValidator {

  static required (form: FormGroup): ValidationErrors {
    const openFromControl = form.get('openFrom');
    const openToControl = form.get('openTo');
    const isClosedControl = form.get('isClosed');
    const is24to24Control = form.get('is24to24');
    let error = null;

    if (isClosedControl.value !== true && is24to24Control.value !== true) {
      if (openFromControl.value === null || openToControl.value === null) {
        error = 'required';
      }
    }
      const message = {
        'openFromOpenToRequired': {
          'message': error
        }
     };

     return error ? message : null;
  }

  static invalidFormat (form: FormGroup): ValidationErrors {
    const openFromControl = form.get('openFrom');
    const openToControl = form.get('openTo');
    const isClosedControl = form.get('isClosed');
    const is24to24Control = form.get('is24to24');
    let error = null;

    if (isClosedControl.value !== true && is24to24Control.value !== true) {
      if (openFromControl.value !== null && openToControl.value !== null) {
        const openTimeFrom = openFromControl.value.split(':');
        const openTimeTo = openToControl.value.split(':');
        if ( openTimeFrom[0] > 23 || openTimeFrom[1] > 59 ||
          openTimeTo[0] > 23 || openTimeTo[1] > 59 ) {
          error = 'invalid format';
        }
      }
    }
      const message = {
        'openFromOpenToInvalidFormat': {
          'message': error
        }
     };

     return error ? message : null;
  }

  static invalidRange (form: FormGroup): ValidationErrors {
    const openFromControl = form.get('openFrom');
    const openToControl = form.get('openTo');
    const isClosedControl = form.get('isClosed');
    const is24to24Control = form.get('is24to24');
    let error = null;

    if (isClosedControl.value !== true && is24to24Control.value !== true) {
      if (openFromControl.value !== null && openToControl.value !== null) {
        const openTimeFrom = openFromControl.value.split(':').join('');
        const openTimeTo = openToControl.value.split(':').join('');
        if (openTimeFrom >= openTimeTo) {
          error = 'invalid range';
        }
      }
    }
      const message = {
        'openFromOpenToInvalidRange': {
          'message': error
        }
     };

     return error ? message : null;
  }
}
