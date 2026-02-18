import { CurrencyPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  computed,
  inject,
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductsFacade } from '../data-access/products.facade';

@Component({
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
  template: `
    @if (facade.loading()) {
      <p>Loading product...</p>
    }

    @if (facade.error(); as error) {
      <p class="error">{{ error }}</p>
    }

    @if (!facade.loading() && product(); as selectedProduct) {
      <article class="details">
        <img
          [src]="selectedProduct.imageUrl"
          [alt]="selectedProduct.name"
          width="260"
          height="260"
        />
        <h2>{{ selectedProduct.name }}</h2>
        <p class="category">{{ selectedProduct.category }}</p>
        <p>{{ selectedProduct.description }}</p>
        <p class="price">
          {{ selectedProduct.price | currency: 'USD' : 'symbol' : '1.2-2' }}
        </p>
        <a [routerLink]="['/products', selectedProduct.id, 'edit']">Edit product</a>
      </article>
    } @else if (!facade.loading()) {
      <p>Product not found.</p>
    }
  `,
  styles: [
    `
      .details {
        margin-top: 1rem;
        display: grid;
        gap: 0.75rem;
      }

      .details img {
        object-fit: contain;
      }

      .category {
        margin: 0;
        color: #6b7280;
      }

      .price {
        font-weight: 700;
      }

      .error {
        color: #b91c1c;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailsPage implements OnInit {
  private readonly route = inject(ActivatedRoute);

  readonly facade = inject(ProductsFacade);
  readonly id = this.route.snapshot.paramMap.get('id') ?? '';
  readonly product = computed(() => this.facade.selectedProduct());

  ngOnInit(): void {
    if (!this.id) {
      return;
    }

    this.facade.selectProduct(this.id);
  }
}
