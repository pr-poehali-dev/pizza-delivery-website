
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  TableCell, 
  TableRow
} from "@/components/ui/table";
import { useCart } from "@/hooks/use-cart";
import type { CartItem as CartItemType } from "@/types/cart";

type CartItemProps = {
  item: CartItemType;
};

const CartItem = ({ item }: CartItemProps) => {
  const { updateCartItemQuantity, removeFromCart } = useCart();
  
  const handleDecreaseQuantity = () => {
    if (item.quantity > 1) {
      updateCartItemQuantity(item.id, item.quantity - 1);
    } else {
      removeFromCart(item.id);
    }
  };
  
  const handleIncreaseQuantity = () => {
    updateCartItemQuantity(item.id, item.quantity + 1);
  };
  
  // Преобразование размера в текст
  const sizeText = () => {
    switch(item.size) {
      case "small": return "Маленькая";
      case "medium": return "Средняя";
      case "large": return "Большая";
      default: return item.size;
    }
  };

  return (
    <TableRow>
      <TableCell>
        <div className="w-16 h-16 rounded overflow-hidden">
          <img 
            src={item.image} 
            alt={item.name} 
            className="w-full h-full object-cover"
          />
        </div>
      </TableCell>
      <TableCell className="font-medium">{item.name}</TableCell>
      <TableCell>{sizeText()}</TableCell>
      <TableCell className="text-right">{item.price} ₽</TableCell>
      <TableCell>
        <div className="flex items-center justify-center space-x-2">
          <Button variant="outline" size="icon" onClick={handleDecreaseQuantity} className="h-7 w-7">
            <Minus className="h-3 w-3" />
          </Button>
          <span className="w-6 text-center">{item.quantity}</span>
          <Button variant="outline" size="icon" onClick={handleIncreaseQuantity} className="h-7 w-7">
            <Plus className="h-3 w-3" />
          </Button>
        </div>
      </TableCell>
      <TableCell className="text-right font-medium">
        {item.price * item.quantity} ₽
      </TableCell>
      <TableCell>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => removeFromCart(item.id)}
          className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default CartItem;
