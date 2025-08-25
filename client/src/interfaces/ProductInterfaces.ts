import { PaginationInterface } from "./Pagination"

export interface ProductHttpResponse {
  product: Product[]
  pagination_data: PaginationInterface
}

export interface Product {
  name: string,
  code: string,
  description: string,
  release_date: string,
  gender_id: number,
  category_id: number,
}


