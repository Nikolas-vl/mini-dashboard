import { Injectable, computed, inject, signal } from '@angular/core';
import { catchError, finalize, tap, throwError } from 'rxjs';
import { ProductsApi } from './products.api';
import { Product, UpdateProductDto } from './products.models';

@Injectable()
export class ProductsStore {
  private readonly api = inject(ProductsApi);

  private readonly _products = signal<readonly Product[]>([]);
  private readonly _selectedProductId = signal<string | null>(null);
  private readonly _searchTerm = signal('');

  private readonly _loading = signal(false);
  private readonly _saving = signal(false);
  private readonly _error = signal<string | null>(null);

  readonly products = this._products.asReadonly();
  readonly searchTerm = this._searchTerm.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly saving = this._saving.asReadonly();
  readonly error = this._error.asReadonly();

  readonly filteredProducts = computed(() => {
    const term = this._searchTerm().trim().toLowerCase();
    if (!term) {
      return this._products();
    }

    return this._products().filter((product) => {
      return (
        product.name.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term)
      );
    });
  });

  readonly selectedProduct = computed(() => {
    const selectedId = this._selectedProductId();
    if (!selectedId) {
      return null;
    }

    return this._products().find((product) => product.id === selectedId) ?? null;
  });

  loadProducts(force = false): void {
    if (this._loading()) {
      return;
    }
    if (!force && this._products().length > 0) {
      return;
    }

    this._loading.set(true);
    this._error.set(null);

    this.api.getAll().subscribe({
      next: (products) => {
        this._products.set(products);
        this._loading.set(false);
      },
      error: () => {
        this._error.set('Failed to load products.');
        this._loading.set(false);
      },
    });
  }

  selectProduct(id: string): void {
    this._selectedProductId.set(id);

    const existingProduct = this._products().find((product) => product.id === id);
    if (existingProduct) {
      return;
    }

    this._loading.set(true);
    this._error.set(null);

    this.api.getById(id).subscribe({
      next: (product) => {
        this.upsertProduct(product);
        this._loading.set(false);
      },
      error: () => {
        this._error.set('Failed to load product details.');
        this._loading.set(false);
      },
    });
  }

  updateProduct(id: string, dto: UpdateProductDto) {
    this._saving.set(true);
    this._error.set(null);

    return this.api.update(id, dto).pipe(
      tap((updatedProduct) => this.upsertProduct(updatedProduct)),
      catchError((error) => {
        this._error.set('Failed to save product.');
        return throwError(() => error);
      }),
      finalize(() => this._saving.set(false)),
    );
  }

  clearError(): void {
    this._error.set(null);
  }

  setSearchTerm(term: string): void {
    this._searchTerm.set(term);
  }

  private upsertProduct(product: Product): void {
    const exists = this._products().some((item) => item.id === product.id);
    if (exists) {
      this._products.update((items) =>
        items.map((item) => (item.id === product.id ? product : item)),
      );
      return;
    }

    this._products.update((items) => [...items, product]);
  }

  reset(): void {
    this._products.set([]);
    this._selectedProductId.set(null);
    this._searchTerm.set('');
    this._loading.set(false);
    this._saving.set(false);
    this._error.set(null);
  }
}
