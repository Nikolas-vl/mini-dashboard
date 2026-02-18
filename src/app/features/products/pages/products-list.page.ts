import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { ProductCardComponent } from '../components/product-card.component';
import { ProductsFacade } from '../data-access/products.facade';

@Component({
  standalone: true,
  selector: 'products-list-page',
  imports: [ProductCardComponent],
  template: `
    <section class="products-page">
      @if (facade.loading()) {
        <p class="loading">Loading products...</p>
      }

      @if (facade.error(); as error) {
        <p class="error">
          {{ error }}
        </p>
      }

      @if (!facade.loading() && !facade.error()) {
        @if (facade.hasProducts()) {
          <div class="products-list">
            @for (product of facade.filteredProducts(); track product.id) {
              <product-card [product]="product"></product-card>
            }
          </div>
        } @else {
          <p>
            {{
              facade.searchTerm()
                ? 'No products match your search.'
                : 'No products found.'
            }}
          </p>
        }
      }
    </section>
  `,
  styles: [
    `
      .products-page {
        margin-top: 1rem;
      }

      .products-list {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 1rem;
      }

      .loading {
        color: #1f2937;
      }

      .error {
        color: #b91c1c;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsListPage implements OnInit {
  readonly facade = inject(ProductsFacade);

  ngOnInit(): void {
    this.facade.loadProducts();
  }
}
