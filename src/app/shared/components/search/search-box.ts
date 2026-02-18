import { ChangeDetectionStrategy, Component, model } from '@angular/core';

@Component({
  selector: 'app-search-box',
  standalone: true,
  template: `
    <input
      type="search"
      [value]="value()"
      (input)="onInput($event)"
      placeholder="Search products"
      aria-label="Search products"
    />
  `,
  styles: [
    `
      :host {
        display: block;
        min-width: 280px;
      }

      input {
        width: 100%;
        padding: 0.55rem 0.75rem;
        border: 1px solid #d1d5db;
        border-radius: 0.6rem;
        font: inherit;
      }

      input:focus-visible {
        outline: 0.1px solid grey;
        outline-offset: -1px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBoxComponent {
  readonly value = model('');

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement | null;
    this.value.set(target?.value ?? '');
  }
}
