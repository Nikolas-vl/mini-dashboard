import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  inject,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product, UpdateProductDto } from '../data-access/products.models';

@Component({
  selector: 'product-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="submit()" class="product-form">
      <label>
        Name
        <input type="text" formControlName="name" />
      </label>

      <label>
        Description
        <textarea rows="4" formControlName="description"></textarea>
      </label>

      <label>
        Category
        <input type="text" formControlName="category" />
      </label>

      <label>
        Price
        <input type="number" min="0" step="0.01" formControlName="price" />
      </label>

      <label>
        Image URL
        <input type="url" formControlName="imageUrl" />
      </label>

      <button type="submit" [disabled]="form.invalid || saving">
        {{ saving ? 'Saving...' : 'Save changes' }}
      </button>
    </form>
  `,
  styles: [
    `
      .product-form {
        display: grid;
        gap: 0.75rem;
        max-width: 560px;
      }

      label {
        display: grid;
        gap: 0.4rem;
        font-weight: 500;
      }

      input,
      textarea {
        border: 1px solid #d1d5db;
        border-radius: 0.5rem;
        padding: 0.5rem 0.75rem;
      }

      button {
        width: fit-content;
        padding: 0.6rem 1rem;
        border: none;
        border-radius: 0.5rem;
        background: #0a66c2;
        color: #ffffff;
        font-weight: 600;
        cursor: pointer;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductFormComponent implements OnChanges {
  private readonly fb = inject(FormBuilder);

  @Input({ required: true }) product: Product | null = null;
  @Input() saving = false;

  @Output() readonly save = new EventEmitter<UpdateProductDto>();

  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.maxLength(120)]],
    description: ['', [Validators.required, Validators.maxLength(1000)]],
    category: ['', [Validators.required, Validators.maxLength(80)]],
    price: [0, [Validators.required, Validators.min(0)]],
    imageUrl: [
      '',
      [Validators.required, Validators.pattern(/^https?:\/\/.+/i)],
    ],
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['product'] || !this.product) {
      return;
    }

    this.form.reset(
      {
        name: this.product.name,
        description: this.product.description,
        category: this.product.category,
        price: this.product.price,
        imageUrl: this.product.imageUrl,
      },
      { emitEvent: false },
    );
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.save.emit(this.form.getRawValue());
  }
}
