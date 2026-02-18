import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SearchBoxComponent } from '../../../shared/components/search/search-box';
import { ProductsFacade } from '../data-access/products.facade';

@Component({
  selector: 'products-toolbar',
  standalone: true,
  imports: [RouterLink, SearchBoxComponent],
  template: `
    <header class="products-toolbar">
      <h1>Products</h1>
      <app-search-box
        [value]="facade.searchTerm()"
        (valueChange)="onSearchChange($event)"
      ></app-search-box>
      <a routerLink="/products" (click)="onShowAll()">All products</a>
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
export class ProductsToolbarComponent {
  readonly facade = inject(ProductsFacade);

  onSearchChange(term: string): void {
    this.facade.setSearchTerm(term);
  }

  onShowAll(): void {
    this.facade.setSearchTerm('');
  }
}
