
import { CartItem } from "./cart";

export type OrderStatus = "pending" | "confirmed" | "preparing" | "delivering" | "completed" | "cancelled";

export type OrderPaymentMethod = "card" | "cash" | "card-courier";

export type OrderDeliveryTime = "asap" | "scheduled";

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryAddress: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  createdAt: string;
  comments?: string;
  paymentMethod?: OrderPaymentMethod;
  deliveryTime?: OrderDeliveryTime;
  scheduledTime?: string;
}

export interface CreateOrderDto {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryAddress: string;
  items: CartItem[];
  total: number;
  comments?: string;
  paymentMethod: OrderPaymentMethod;
  deliveryTime: OrderDeliveryTime;
  scheduledTime?: string;
}
