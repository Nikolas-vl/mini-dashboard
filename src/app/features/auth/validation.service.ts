import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { VALIDATION_MESSAGES } from './validation.message';

@Injectable({ providedIn: 'root' })
export class ValidationService {

  getErrorMessage(control: AbstractControl | null): string | null {
    if (!control || !control.errors || !control.touched) {
      return null;
    }

    const firstErrorKey = Object.keys(control.errors)[0];
    const errorValue = control.errors[firstErrorKey];

    const messageFn = VALIDATION_MESSAGES[firstErrorKey];

    return messageFn ? messageFn(errorValue) : 'Invalid field';
  }
}
