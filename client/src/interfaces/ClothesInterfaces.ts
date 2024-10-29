import { CategoryDataInterface } from "./CategoryInterfaces";
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
  image: Image;
  category: CategoryDataInterface;
}

export interface ClotheColor {
  id: number;
  id_clothe: number;
  id_color: number; 
  stock: number;
  images: Image[];
}

export interface Image {
  hashcode: string;
  id: number;
  id_clothe: number;
  id_color: number;
  name: string;
  signed_image_url: string;
  url: string;
}

export interface ClothesResponse {
  code: number
  data: ClothesCategory
  message: string
}

export interface ClothesCategory {
  category: CategoryDataInterface
  gender?: string
  clothes: ClotheDataInterface[]
  pagination: PaginationInterface
}

export interface PostClotheInterface {
  name: string
  description: string
  id_category: number
  id_gender: number
  price: number
  colors: PostClotheColor[]
}

export interface PostClotheColor {
  id_color: number; 
  stock: number;
  images: File[];
}
