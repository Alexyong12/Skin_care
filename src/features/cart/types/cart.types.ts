export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  image?: string | null;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  shipping?: number;
  total: number;
}

export interface AddCartItemDto {
  productId: string;
  quantity?: number;
}
