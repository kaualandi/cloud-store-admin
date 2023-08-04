import { IFilter } from './filters';
import { ISection } from './section';

export interface ICategory {
  id: number;
  name: string;
  filters: IFilter[];
  section: ISection;
  section_id: number;
  created_at?: string;
  updated_at?: string;
}
