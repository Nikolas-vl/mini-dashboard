import { Injectable, computed, inject } from '@angular/core';
import { UpdateProductDto } from './products.models';
import { ProductsStore } from './products.store';

@Injectable()
export class ProductsFacade {
  private readonly store = inject(ProductsStore);

  readonly products = this.store.products;
  readonly selectedProduct = this.store.selectedProduct;
  readonly loading = this.store.loading;
  readonly saving = this.store.saving;
  readonly error = this.store.error;
  readonly hasProducts = computed(() => this.products().length > 0);

  loadProducts(force = false): void {
    this.store.loadProducts(force);
  }

  selectProduct(id: string): void {
    this.store.selectProduct(id);
  }

  saveProduct(id: string, dto: UpdateProductDto) {
    return this.store.updateProduct(id, dto);
  }

  clearError(): void {
    this.store.clearError();
  }
}
