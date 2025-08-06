export interface ClotheFormDataInterface {
  name: string
  description: string
  price: number
  id_category: number
  id_gender: number
  colors: ClotheFormColor[]
}

export interface ClotheFormColor {
  id_color: number;
  stock: number;
  images: File[]; // o string[] si estás usando URLs
}