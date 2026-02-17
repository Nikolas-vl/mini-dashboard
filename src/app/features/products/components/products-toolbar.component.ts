import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'products-toolbar',
  standalone: true,
  imports: [RouterLink],
  template: `
    <header class="products-toolbar">
      <h1>Products</h1>
      <a routerLink="/products">All products</a>
    </header>
  `,
  styles: [
    `
      .products-toolbar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
      }

      .products-toolbar a {
        color: #0a66c2;
        text-decoration: none;
        font-weight: 600;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsToolbarComponent {}
