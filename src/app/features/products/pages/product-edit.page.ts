import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  computed,
  inject,
} from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductFormComponent } from '../components/product-form.component';
import { ProductsFacade } from '../data-access/products.facade';
import { UpdateProductDto } from '../data-access/products.models';

@Component({
  standalone: true,
  imports: [ProductFormComponent, RouterLink],
  template: `
    @if (facade.loading()) {
      <p>Loading product...</p>
    }

    @if (facade.error(); as error) {
      <p class="error">{{ error }}</p>
    }

    @if (!facade.loading() && product(); as selectedProduct) {
      <div class="header">
        <h2>Edit Product</h2>
        <a [routerLink]="['/products', selectedProduct.id]">Back to details</a>
      </div>

      <product-form
        [product]="selectedProduct"
        [saving]="facade.saving()"
        (save)="onSave($event)"
      ></product-form>
    } @else if (!facade.loading()) {
      <p>Product not found.</p>
    }
  `,
  styles: [
    `
      .header {
        margin: 1rem 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .header a {
        color: #0a66c2;
        text-decoration: none;
        font-weight: 600;
      }

      .error {
        color: #b91c1c;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductEditPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly facade = inject(ProductsFacade);
  readonly id = this.route.snapshot.paramMap.get('id') ?? '';
  readonly product = computed(() => this.facade.selectedProduct());

  ngOnInit(): void {
    if (!this.id) {
      return;
    }

    this.facade.selectProduct(this.id);
  }

  onSave(dto: UpdateProductDto): void {
    if (!this.id) {
      return;
    }

    this.facade.saveProduct(this.id, dto).subscribe({
      next: (updatedProduct) => {
        this.router.navigate(['/products', updatedProduct.id]);
      },
      error: () => {},
    });
  }
}
