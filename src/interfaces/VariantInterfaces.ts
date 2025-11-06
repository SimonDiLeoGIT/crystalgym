import { ColorInterface } from "./ColorInterfaces"
import { ProductInterface } from "./ProductInterfaces"

export interface Variants {
  id: number,
  product: number,
  name: string,
  sku: string,
  price: string,
  stock: string,
  sizes: Size[],
  color: ColorInterface,
  image: Image
  category: string
}

export interface Size {
  id: number
  size: string
}

export interface Image {
  id: number,
  image: string
  alt_text: string | null
  variant: number
}

export interface VariantWithProductInterface {
  id: number,
  product: ProductInterface,
  name: string,
  sku: string,
  color: ColorInterface,
  images: Image[],
  code: string,
  description: string,
  release_date: string,
}