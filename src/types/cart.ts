
import type { PizzaSize } from "./pizza";

export interface CartItem {
  id: string;
  pizzaId: number;
  name: string;
  size: PizzaSize;
  price: number;
  quantity: number;
  image: string;
}
