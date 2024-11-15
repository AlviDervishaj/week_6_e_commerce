import { User } from './user';

export interface Cart {
  id: number,
  userId: Pick<User, "id">,
  date: string,
  products: { productId: number, quantity: number }[],
}


export interface CartItem { id: number, quantity: number };
