import { PaginationInterface } from "./Pagination"

export interface CategoryHttpResponse {
  categories: Category[]
  pagination_data: PaginationInterface
}

export interface Category {
  id: number
  name: string
  description: string
}

export type CategoriesByGender = Record<string, Category[]>;