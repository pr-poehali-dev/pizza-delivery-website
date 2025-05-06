
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  ChevronLeft, 
  ShoppingCart, 
  Trash2, 
  CreditCard, 
  DollarSign,
  Truck,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";
import CartItem from "@/components/CartItem";

const Cart = () => {
  const navigate = useNavigate();
  const { cart, totalPrice, clearCart } = useCart();
  const { toast } = useToast();
  
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("asap");
  const [comments, setComments] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");
  
  const deliveryFee = 0; // Бесплатная доставка
  const discount = 0; // Скидка
  
  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Проверка формы
    if (!name || !phone || !email || !address) {
      toast({
        title: "Заполните все обязательные поля",
        description: "Пожалуйста, заполните все обязательные поля перед оформлением заказа",
        variant: "destructive"
      });
      return;
    }
    
    // Проверка корзины
    if (cart.length === 0) {
      toast({
        title: "Корзина пуста",
        description: "Добавьте пиццу в корзину перед оформлением заказа",
        variant: "destructive"
      });
      return;
    }
    
    // Имитация отправки заказа
    toast({
      title: "Заказ оформлен!",
      description: "Ваш заказ успешно оформлен и скоро будет доставлен",
    });
    
    clearCart();
    
    // Переход на страницу успешного оформления
    setTimeout(() => {
      navigate("/order-success");
    }, 1500);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Заголовок страницы */}
        <div className="bg-gradient-to-r from-orange-100 to-red-50 py-8">
          <div className="container mx-auto px-4">
            <div className="flex items-center mb-2">
              <Link to="/menu" className="text-primary hover:underline flex items-center">
                <ChevronLeft className="h-4 w-4 mr-1" />
                Вернуться в меню
              </Link>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold flex items-center">
              <ShoppingCart className="mr-3 h-8 w-8" />
              Корзина
            </h1>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-10">
          {cart.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingCart className="h-16 w-16 mx-auto mb-4 text-gray-400" />
              <h2 className="text-2xl font-medium text-gray-500 mb-4">
                Ваша корзина пуста
              </h2>
              <p className="text-gray-500 mb-6">
                Добавьте что-нибудь из меню, чтобы сделать заказ
              </p>
              <Button asChild>
                <Link to="/menu">Перейти в меню</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Левая колонка: Корзина */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-xl">Ваш заказ</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[80px]">Фото</TableHead>
                          <TableHead>Наименование</TableHead>
                          <TableHead>Размер</TableHead>
                          <TableHead className="text-right">Цена</TableHead>
                          <TableHead className="text-center">Кол-во</TableHead>
                          <TableHead className="text-right">Сумма</TableHead>
                          <TableHead className="w-[50px]"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {cart.map((item) => (
                          <CartItem key={item.id} item={item} />
                        ))}
                      </TableBody>
                    </Table>
                    
                    <div className="mt-4 flex justify-end">
                      <Button variant="outline" size="sm" onClick={clearCart} className="text-red-500">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Очистить корзину
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Правая колонка: Оформление заказа */}
              <div>
                <Card className="mb-6">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-xl">Сумма заказа</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Стоимость:</span>
                        <span>{totalPrice} ₽</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Доставка:</span>
                        <span>{deliveryFee === 0 ? "Бесплатно" : `${deliveryFee} ₽`}</span>
                      </div>
                      {discount > 0 && (
                        <div className="flex justify-between text-green-600">
                          <span>Скидка:</span>
                          <span>-{discount} ₽</span>
                        </div>
                      )}
                      <Separator />
                      <div className="flex justify-between font-bold text-lg">
                        <span>Итого:</span>
                        <span>{totalPrice + deliveryFee - discount} ₽</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-xl">Оформление заказа</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmitOrder} className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="font-medium">Контактная информация</h3>
                        <div className="grid gap-3">
                          <div className="grid gap-2">
                            <Label htmlFor="name">Ваше имя *</Label>
                            <Input 
                              id="name" 
                              placeholder="Иван Иванов" 
                              value={name} 
                              onChange={(e) => setName(e.target.value)}
                              required
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="phone">Телефон *</Label>
                            <Input 
                              id="phone" 
                              type="tel" 
                              placeholder="+7 (___) ___-__-__" 
                              value={phone} 
                              onChange={(e) => setPhone(e.target.value)}
                              required
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="email">Email *</Label>
                            <Input 
                              id="email" 
                              type="email" 
                              placeholder="example@mail.ru" 
                              value={email} 
                              onChange={(e) => setEmail(e.target.value)}
                              required
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h3 className="font-medium">Адрес доставки</h3>
                        <div className="grid gap-2">
                          <Label htmlFor="address">Адрес *</Label>
                          <Input 
                            id="address" 
                            placeholder="Улица, дом, квартира" 
                            value={address} 
                            onChange={(e) => setAddress(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h3 className="font-medium">Время доставки</h3>
                        <RadioGroup 
                          value={deliveryTime} 
                          onValueChange={setDeliveryTime}
                          className="flex flex-col space-y-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="asap" id="asap" />
                            <Label htmlFor="asap" className="flex items-center">
                              <Clock className="h-4 w-4 mr-2" /> Как можно скорее
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="scheduled" id="scheduled" />
                            <Label htmlFor="scheduled">Ко времени (доступно с 10:00 до 23:00)</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      
                      <div className="space-y-4">
                        <h3 className="font-medium">Способ оплаты</h3>
                        <RadioGroup 
                          value={paymentMethod} 
                          onValueChange={setPaymentMethod}
                          className="flex flex-col space-y-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="card" id="card" />
                            <Label htmlFor="card" className="flex items-center">
                              <CreditCard className="h-4 w-4 mr-2" /> Картой онлайн
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="cash" id="cash" />
                            <Label htmlFor="cash" className="flex items-center">
                              <DollarSign className="h-4 w-4 mr-2" /> Наличными при получении
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="card-courier" id="card-courier" />
                            <Label htmlFor="card-courier" className="flex items-center">
                              <Truck className="h-4 w-4 mr-2" /> Картой курьеру
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>
                      
                      <div className="space-y-4">
                        <h3 className="font-medium">Комментарий к заказу</h3>
                        <div className="grid gap-2">
                          <Textarea 
                            placeholder="Укажите особые пожелания к заказу или доставке..." 
                            value={comments}
                            onChange={(e) => setComments(e.target.value)}
                          />
                        </div>
                      </div>
                      
                      <Button type="submit" className="w-full">
                        Оформить заказ
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;
