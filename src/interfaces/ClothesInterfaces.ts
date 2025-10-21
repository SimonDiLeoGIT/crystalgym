// import { CategoryDataInterface } from "./CategoryInterfaces";
import { Category } from "./CategoryInterfaces";
import { PaginationInterface } from "./Pagination";

export interface ClotheInterface {
  code: number;
  data: ClotheDataInterface;
  message: string;
}

export interface ClotheDataInterface {
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


export interface ClothesResponse {
  code: number
  data: ClothesCategory
  message: string
}

export interface ClothesCategory {
  category: Category
  gender?: string
  clothes: ClotheDataInterface[]
  pagination: PaginationInterface
}