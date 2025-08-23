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
  gender: string,
  category: string,
}


