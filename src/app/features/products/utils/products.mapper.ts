import {
  Product,
  ProductApiModel,
  UpdateProductDto,
} from '../data-access/products.models';

export function mapApiProductToProduct(apiProduct: ProductApiModel): Product {
  return {
    id: String(apiProduct.id),
    name: apiProduct.title,
    description: apiProduct.description,
    category: apiProduct.category,
    price: apiProduct.price,
    imageUrl: apiProduct.image,
  };
}

export function mapUpdateProductDtoToApiPayload(
  dto: UpdateProductDto,
): Partial<ProductApiModel> {
  return {
    title: dto.name,
    description: dto.description,
    category: dto.category,
    price: dto.price,
    image: dto.imageUrl,
  };
}
