import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { Products } from './products';
import { ProductsApi } from './data-access/products.api';
import { ProductsFacade } from './data-access/products.facade';
import { ProductsStore } from './data-access/products.store';

describe('Products', () => {
  let component: Products;
  let fixture: ComponentFixture<Products>;

  beforeEach(async () => {
    const productsApiMock: Pick<ProductsApi, 'getAll' | 'getById' | 'update'> = {
      getAll: vi.fn(() => of([])),
      getById: vi.fn(),
      update: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [Products],
      providers: [
        provideRouter([]),
        ProductsStore,
        ProductsFacade,
        { provide: ProductsApi, useValue: productsApiMock },
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(Products);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
