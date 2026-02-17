import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
  mapApiProductToProduct,
  mapUpdateProductDtoToApiPayload,
} from '../utils/products.mapper';
import { Product, ProductApiModel, UpdateProductDto } from './products.models';

@Injectable()
export class ProductsApi {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'https://fakestoreapi.com/products';

  getAll(): Observable<Product[]> {
    return this.http.get<ProductApiModel[]>(this.baseUrl).pipe(
      map((products) => products.map(mapApiProductToProduct)),
    );
  }

  getById(id: string): Observable<Product> {
    return this.http
      .get<ProductApiModel>(`${this.baseUrl}/${id}`)
      .pipe(map(mapApiProductToProduct));
  }

  update(id: string, dto: UpdateProductDto): Observable<Product> {
    return this.http
      .put<ProductApiModel>(
        `${this.baseUrl}/${id}`,
        mapUpdateProductDtoToApiPayload(dto),
      )
      .pipe(map(mapApiProductToProduct));
  }
}
