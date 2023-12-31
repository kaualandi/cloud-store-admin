import { IFilter } from './filters';

export interface IProductVariant {
  id: number;
  product_id: number;
  name: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProductImage {
  id: number;
  product_id: number;
  url: string;
  created_at: string;
  updated_at: string;
}

export interface IProduct {
  id: 5;
  name: string;
  description: string;
  base_price: number;
  trending: boolean;
  discount: number;
  team_id: number;
  sold: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  images: ProductImage[];
  variants: IProductVariant[];
  filters: IFilter[];
  _count: {
    variants: number;
    images: number;
    filters: number;
    avaliations: number;
  };
}
