import { ICategory } from './categorys';

export interface IFilter {
  id: number;
  name: string;
  category_id: number;
  category: ICategory;
  created_at?: string;
  updated_at?: string;
}
