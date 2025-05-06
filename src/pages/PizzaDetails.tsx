
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Pizza, PizzaSize } from "@/types/pizza";
import { pizzas } from "@/data/pizzas";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/hooks/use-cart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { 
  ChevronLeft, 
  Plus, 
  Minus, 
  ShoppingCart, 
  Clock,
  Award,
  ThumbsUp
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ExtraIngredient, extraIngredients } from "@/data/extras";

const PizzaDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addToCart } = useCart();
  
  // Состояния
  const [pizza, setPizza] = useState<Pizza | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState<PizzaSize>("medium");
  const [quantity, setQuantity] = useState(1);
  const [selectedExtras, setSelectedExtras] = useState<ExtraIngredient[]>([]);
  
  // Загрузка данных о пицце
  useEffect(() => {
    const pizzaId = parseInt(id || "0");
    const foundPizza = pizzas.find(p => p.id === pizzaId);
    
    if (foundPizza) {
      setPizza(foundPizza);
    }
    
    setLoading(false);
  }, [id]);
  
  // Обработчики количества
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  
  // Обработчик добавления/удаления дополнительных ингредиентов
  const toggleExtraIngredient = (extra: ExtraIngredient) => {
    setSelectedExtras(prev => {
      if (prev.some(item => item.id === extra.id)) {
        return prev.filter(item => item.id !== extra.id);
      } else {
        return [...prev, extra];
      }
    });
  };
  
  // Получение итоговой цены
  const getTotalPrice = () => {
    if (!pizza) return 0;
    
    const basePrice = pizza.prices[selectedSize];
    const extrasPrice = selectedExtras.reduce((total, extra) => total + extra.price, 0);
    
    return (basePrice + extrasPrice) * quantity;
  };
  
  // Добавление в корзину
  const handleAddToCart = () => {
    if (!pizza) return;
    
    const extrasText = selectedExtras.length 
      ? ` (+ ${selectedExtras.map(e => e.name).join(", ")})`
      : "";
    
    addToCart({
      id: `${pizza.id}-${selectedSize}-${Date.now()}`, // Уникальный ID с учетом добавок
      pizzaId: pizza.id,
      name: `${pizza.name}${extrasText}`,
      size: selectedSize,
      price: getTotalPrice() / quantity, // Цена за 1 пиццу с добавками
      quantity,
      image: pizza.image
    });
    
    toast({
      title: "Добавлено в корзину",
      description: `${pizza.name} (${quantity} шт.) добавлена в корзину`
    });
    
    // Сброс добавок после добавления в корзину
    setSelectedExtras([]);
  };
  
  // Рендер страницы загрузки
  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-10 flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-lg">Загрузка...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  // Рендер страницы с ошибкой
  if (!pizza) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-10 flex-grow">
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold mb-4">Пицца не найдена</h2>
            <p className="mb-6">К сожалению, такой пиццы нет в нашем меню</p>
            <Button asChild>
              <Link to="/menu">Вернуться в меню</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  // Размеры пиццы
  const sizeInfo = {
    small: { label: "Маленькая", size: "25 см", weight: "350г" },
    medium: { label: "Средняя", size: "30 см", weight: "550г" },
    large: { label: "Большая", size: "35 см", weight: "750г" }
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Хлебные крошки */}
        <div className="bg-gradient-to-r from-orange-100 to-red-50 py-8">
          <div className="container mx-auto px-4">
            <div className="flex items-center mb-2">
              <Link to="/menu" className="text-primary hover:underline flex items-center">
                <ChevronLeft className="h-4 w-4 mr-1" />
                Вернуться в меню
              </Link>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">{pizza.name}</h1>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Изображение и теги */}
            <div>
              <div className="relative rounded-lg overflow-hidden mb-6">
                <img 
                  src={pizza.image} 
                  alt={pizza.name} 
                  className="w-full h-auto object-cover"
                />
                {pizza.isNew && (
                  <Badge className="absolute top-4 right-4 bg-green-500 px-3 py-1">Новинка</Badge>
                )}
                {pizza.discount > 0 && (
                  <Badge className="absolute top-4 left-4 bg-red-500 px-3 py-1">-{pizza.discount}%</Badge>
                )}
              </div>
              
              {/* Теги */}
              <div className="flex flex-wrap gap-2 mb-6">
                {pizza.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-sm px-3 py-1">
                    {tag === "spicy" && "🌶️ Острая"}
                    {tag === "meat" && "🥩 С мясом"}
                    {tag === "cheese" && "🧀 Сырная"}
                    {tag === "bbq-sauce" && "🍖 С соусом BBQ"}
                    {tag === "mushrooms" && "🍄 С грибами"}
                    {tag === "vegetables" && "🥗 С овощами"}
                    {tag === "seafood" && "🦐 С морепродуктами"}
                  </Badge>
                ))}
              </div>
              
              {/* Преимущества */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="flex items-center p-4">
                    <Clock className="h-6 w-6 text-primary mr-3" />
                    <div>
                      <p className="text-sm font-medium">Время приготовления</p>
                      <p className="text-xs text-muted-foreground">15-20 минут</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="flex items-center p-4">
                    <Award className="h-6 w-6 text-primary mr-3" />
                    <div>
                      <p className="text-sm font-medium">Качество</p>
                      <p className="text-xs text-muted-foreground">Свежие ингредиенты</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="flex items-center p-4">
                    <ThumbsUp className="h-6 w-6 text-primary mr-3" />
                    <div>
                      <p className="text-sm font-medium">Рейтинг</p>
                      <p className="text-xs text-muted-foreground">4.8 из 5</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            {/* Информация о пицце и заказ */}
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">Описание</h2>
                <p className="text-gray-700">{pizza.description}</p>
              </div>
              
              <Separator className="my-6" />
              
              {/* Выбор размера */}
              <div className="mb-6">
                <h2 className="text-xl font-medium mb-4">Выберите размер</h2>
                <Tabs 
                  defaultValue="medium" 
                  value={selectedSize} 
                  onValueChange={(val) => setSelectedSize(val as PizzaSize)}
                  className="w-full"
                >
                  <TabsList className="grid grid-cols-3 w-full">
                    <TabsTrigger value="small" className="text-sm">
                      {sizeInfo.small.label} ({sizeInfo.small.size})
                    </TabsTrigger>
                    <TabsTrigger value="medium" className="text-sm">
                      {sizeInfo.medium.label} ({sizeInfo.medium.size})
                    </TabsTrigger>
                    <TabsTrigger value="large" className="text-sm">
                      {sizeInfo.large.label} ({sizeInfo.large.size})
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="small" className="mt-4 p-4 bg-muted rounded-md">
                    <div className="flex justify-between">
                      <span>Размер: {sizeInfo.small.size}</span>
                      <span>Вес: {sizeInfo.small.weight}</span>
                      <span className="font-medium">{pizza.prices.small} ₽</span>
                    </div>
                  </TabsContent>
                  <TabsContent value="medium" className="mt-4 p-4 bg-muted rounded-md">
                    <div className="flex justify-between">
                      <span>Размер: {sizeInfo.medium.size}</span>
                      <span>Вес: {sizeInfo.medium.weight}</span>
                      <span className="font-medium">{pizza.prices.medium} ₽</span>
                    </div>
                  </TabsContent>
                  <TabsContent value="large" className="mt-4 p-4 bg-muted rounded-md">
                    <div className="flex justify-between">
                      <span>Размер: {sizeInfo.large.size}</span>
                      <span>Вес: {sizeInfo.large.weight}</span>
                      <span className="font-medium">{pizza.prices.large} ₽</span>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
              
              <Separator className="my-6" />
              
              {/* Дополнительные ингредиенты */}
              <div className="mb-6">
                <h2 className="text-xl font-medium mb-4">Дополнительные ингредиенты</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                  {extraIngredients.map((extra) => (
                    <div key={extra.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`extra-${extra.id}`}
                        checked={selectedExtras.some(e => e.id === extra.id)}
                        onCheckedChange={() => toggleExtraIngredient(extra)}
                      />
                      <Label 
                        htmlFor={`extra-${extra.id}`}
                        className="flex items-center justify-between w-full cursor-pointer"
                      >
                        <span>{extra.name}</span>
                        <span className="text-sm">+{extra.price} ₽</span>
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <Separator className="my-6" />
              
              {/* Количество и добавление в корзину */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Button variant="outline" size="icon" onClick={decreaseQuantity} disabled={quantity <= 1}>
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-10 text-center font-medium text-lg">{quantity}</span>
                    <Button variant="outline" size="icon" onClick={increaseQuantity}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Итого:</p>
                    <p className="text-2xl font-bold">{getTotalPrice()} ₽</p>
                    {selectedExtras.length > 0 && (
                      <p className="text-xs text-muted-foreground">
                        Включая добавки: +{selectedExtras.reduce((total, extra) => total + extra.price * quantity, 0)} ₽
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button 
                    variant="outline"
                    onClick={() => navigate(-1)}
                    className="w-full"
                  >
                    Назад к меню
                  </Button>
                  <Button 
                    onClick={handleAddToCart}
                    className="w-full"
                  >
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    В корзину
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Рекомендуемые пиццы */}
          <div className="mt-16">
            <h2 className="text-2xl font-semibold mb-6">Рекомендуем попробовать</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {pizzas
                .filter(p => p.id !== pizza.id)
                .filter(p => p.category === pizza.category)
                .slice(0, 4)
                .map(pizza => (
                  <Card key={pizza.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <div className="h-52 overflow-hidden">
                      <img 
                        src={pizza.image} 
                        alt={pizza.name} 
                        className="w-full h-full object-cover hover:scale-105 transition-transform"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-2">{pizza.name}</h3>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">от {pizza.prices.small} ₽</span>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          asChild
                        >
                          <Link to={`/pizza/${pizza.id}`}>Выбрать</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PizzaDetails;
