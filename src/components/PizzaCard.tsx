import { useState } from "react");
import { Link } from "react-router-dom";
import { Plus, Minus, ShoppingCart } from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCart } from "@/hooks/use-cart";
import type { Pizza, PizzaSize } from "@/types/pizza";

type PizzaCardProps = {
  pizza: Pizza;
};

const PizzaCard = ({ pizza }: PizzaCardProps) => {
  const [selectedSize, setSelectedSize] = useState<PizzaSize>("medium");
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  // Получение цены в зависимости от размера
  const getCurrentPrice = () => {
    return pizza.prices[selectedSize];
  };

  // Обработчики изменения количества
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  // Добавление в корзину
  const handleAddToCart = () => {
    addToCart({
      id: `${pizza.id}-${selectedSize}`,
      pizzaId: pizza.id,
      name: pizza.name,
      size: selectedSize,
      price: getCurrentPrice(),
      quantity,
      image: pizza.image
    });
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="relative h-48 overflow-hidden">
        <Link to={`/pizza/${pizza.id}`}> 
          <img 
            src={pizza.image} 
            alt={pizza.name} 
            className="w-full h-full object-cover transition-transform hover:scale-105"
          />
        </Link>
        {pizza.isNew && (
          <Badge className="absolute top-3 right-3 bg-green-500">Новинка</Badge>
        )}
        {pizza.discount > 0 && (
          <Badge className="absolute top-3 left-3 bg-red-500">-{pizza.discount}%</Badge>
        )}
      </div>
      
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">
          <Link to={`/pizza/${pizza.id}`} className="hover:text-primary transition-colors">
            {pizza.name}
          </Link>
        </CardTitle>
        <CardDescription className="line-clamp-2 h-10">
          {pizza.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pb-3">
        <div className="flex flex-wrap gap-1 mb-4">
          {pizza.tags.map((tag) => (
            <TooltipProvider key={tag}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge variant="outline" className="text-xs px-2 py-0">
                    {tag === "spicy" && "🌶️"}
                    {tag === "meat" && "🥩"}
                    {tag === "cheese" && "🧀"}
                    {tag === "bbq-sauce" && "🍖"}
                    {tag === "mushrooms" && "🍄"}
                    {tag === "vegetables" && "🥗"}
                    {tag === "seafood" && "🦐"}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  {tag === "spicy" && "Острая"}
                  {tag === "meat" && "С мясом"}
                  {tag === "cheese" && "Сырная"}
                  {tag === "bbq-sauce" && "С соусом BBQ"}
                  {tag === "mushrooms" && "С грибами"}
                  {tag === "vegetables" && "С овощами"}
                  {tag === "seafood" && "С морепродуктами"}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
        
        <Tabs defaultValue="medium" value={selectedSize} onValueChange={(val) => setSelectedSize(val as PizzaSize)}>
          <TabsList className="grid grid-cols-3 w-full mb-2">
            <TabsTrigger value="small">Маленькая</TabsTrigger>
            <TabsTrigger value="medium">Средняя</TabsTrigger>
            <TabsTrigger value="large">Большая</TabsTrigger>
          </TabsList>
          
          <TabsContent value="small" className="text-center text-sm text-muted-foreground mt-1 mb-0">
            25 см, 350г
          </TabsContent>
          <TabsContent value="medium" className="text-center text-sm text-muted-foreground mt-1 mb-0">
            30 см, 550г
          </TabsContent>
          <TabsContent value="large" className="text-center text-sm text-muted-foreground mt-1 mb-0">
            35 см, 750г
          </TabsContent>
        </Tabs>
      </CardContent>
      
      <CardFooter className="flex items-center justify-between pt-0">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={decreaseQuantity} disabled={quantity <= 1}>
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-8 text-center">{quantity}</span>
          <Button variant="outline" size="icon" onClick={increaseQuantity}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex items-center">
          <span className="font-semibold mr-3 whitespace-nowrap">
            {getCurrentPrice() * quantity} ₽
          </span>
          <Button onClick={handleAddToCart}>
            <ShoppingCart className="h-4 w-4 mr-2" />
            В корзину
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PizzaCard;