import { Component, Input, inject } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ValidationService } from './validation.service';

@Component({
  selector: 'app-control-errors',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if(errorMessage){
      <small class="error">{{ errorMessage }}</small>
    }
  `
})
export class ControlErrors {

  @Input({ required: true }) control!: AbstractControl | null;

  private validation = inject(ValidationService);

  get errorMessage(): string | null {
    return this.validation.getErrorMessage(this.control);
  }
}
