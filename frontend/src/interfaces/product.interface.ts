export interface Product {
  _id: string;
  name: string;
  img: string;
  description: string;
  price: number;
}

export interface ProductOrdered {
  _id: string;
  name: string;
  img: string;
  price: number;
  quantity: number;
  observations?: string
}