export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  imageUrl: string;
}

export interface ProductApiModel {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  image: string;
}

export interface UpdateProductDto {
  name: string;
  description: string;
  category: string;
  price: number;
  imageUrl: string;
}
