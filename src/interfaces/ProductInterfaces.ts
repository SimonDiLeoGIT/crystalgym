import { Category } from "./CategoryInterfaces"
import { Gender } from "./GenderInterfaces"
import { PaginationInterface } from "./Pagination"

export interface ProductHttpResponse {
  product: Product[]
  pagination_data: PaginationInterface
}

export interface Product {
  id: number,
  name: string,
  code: string,
  description: string,
  release_date: string,
  gender: Gender,
  category: Category,
}

export interface ProductDataInterface {
  id: number;
  name: string;
  description: string;
  new: boolean,
  off: boolean,
  accessory: boolean,
  gender: string,
  id_color: number,
  price: number;
  images: string[];
  // category: CategoryDataInterface;
}