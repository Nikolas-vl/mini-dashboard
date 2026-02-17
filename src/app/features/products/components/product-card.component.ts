import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../data-access/products.models';

@Component({
  selector: 'product-card',
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
  template: `
    <article class="product-card">
      <img [src]="product.imageUrl" [alt]="product.name" loading="lazy" />

      <div class="content">
        <h3>{{ product.name }}</h3>
        <p class="category">{{ product.category }}</p>
        <p class="description">{{ product.description }}</p>
        <p class="price">{{ product.price | currency: 'USD' : 'symbol' : '1.2-2' }}</p>
      </div>

      <div class="actions">
        <a [routerLink]="['/products', product.id]">Details</a>
        <a [routerLink]="['/products', product.id, 'edit']">Edit</a>
      </div>
    </article>
  `,
  styles: [
    `
      .product-card {
        display: grid;
        gap: 1rem;
        border: 1px solid #e5e7eb;
        border-radius: 0.75rem;
        padding: 1rem;
        background: #ffffff;
      }

      img {
        width: 100%;
        height: 180px;
        object-fit: contain;
      }

      h3 {
        margin: 0;
        font-size: 1.1rem;
      }

      .category {
        margin: 0.5rem 0 0;
        color: #6b7280;
        font-size: 0.9rem;
      }

      .description {
        margin: 0.5rem 0;
        color: #374151;
      }

      .price {
        margin: 0;
        font-weight: 700;
      }

      .actions {
        display: flex;
        gap: 1rem;
      }

      .actions a {
        color: #0a66c2;
        text-decoration: none;
        font-weight: 600;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Product;
}
