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
  price: number;
  colors: ClotheColor[];
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

export interface ClothesAdminResponse {
  code: number
  data: AdminClotheData
  message: string
}

export interface AdminClotheData {
  category: CategoryDataInterface
  clothes: ClotheDataInterface[]
  pagination: PaginationInterface
}