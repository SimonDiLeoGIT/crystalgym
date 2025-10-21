import { Color } from "@mui/material"

export interface Variants {
  id: number,
  product: number,
  name: string,
  sku: string,
  price: string,
  stock: string,
  sizes: Size[],
  color: Color,
  image: Image
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