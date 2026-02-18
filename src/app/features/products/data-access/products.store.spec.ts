import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Product } from './products.models';
import { ProductsApi } from './products.api';
import { ProductsStore } from './products.store';

describe('ProductsStore search', () => {
  let store: ProductsStore;
  let api: Pick<ProductsApi, 'getAll' | 'getById' | 'update'>;

  const mockProducts: Product[] = [
    {
      id: '1',
      name: 'Mens Cotton Jacket',
      description: 'Warm winter jacket',
      category: 'men clothing',
      price: 42.5,
      imageUrl: 'https://example.com/jacket.png',
    },
    {
      id: '2',
      name: 'Silver Ring',
      description: 'Handmade jewelry ring',
      category: 'jewelery',
      price: 19.99,
      imageUrl: 'https://example.com/ring.png',
    },
  ];

  beforeEach(() => {
    api = {
      getAll: vi.fn(() => of(mockProducts)),
      getById: vi.fn(() => of(mockProducts[0])),
      update: vi.fn(() => of(mockProducts[0])),
    };

    TestBed.configureTestingModule({
      providers: [
        ProductsStore,
        { provide: ProductsApi, useValue: api },
      ],
    });

    store = TestBed.inject(ProductsStore);
    store.loadProducts();
  });

  it('filters by name (case-insensitive)', () => {
    store.setSearchTerm('JACKET');

    expect(store.filteredProducts().map((product) => product.id)).toEqual(['1']);
  });

  it('filters by category and description', () => {
    store.setSearchTerm('jewelery');
    expect(store.filteredProducts().map((product) => product.id)).toEqual(['2']);

    store.setSearchTerm('winter');
    expect(store.filteredProducts().map((product) => product.id)).toEqual(['1']);
  });

  it('returns all products when search is empty', () => {
    store.setSearchTerm('ring');
    expect(store.filteredProducts().length).toBe(1);

    store.setSearchTerm('   ');
    expect(store.filteredProducts().length).toBe(2);
  });
});
