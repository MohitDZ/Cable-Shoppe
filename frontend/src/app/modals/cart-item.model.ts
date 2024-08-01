export interface CartItem {
    id: string;
    name: string;
    qty: number;
    discountPrice: number;
    stock: number;
    images: { url: string }[];
  }
  