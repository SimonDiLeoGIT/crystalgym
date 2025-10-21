import { Category } from "./CategoryInterfaces"
import { Gender } from "./GenderInterfaces"

export interface Product {
  id: number,
  name: string,
  code: string,
  description: string,
  release_date: string,
  gender: Gender,
  category: Category,
}
