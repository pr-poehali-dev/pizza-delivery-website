
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { orderApi } from "@/api/client";
import ProfileLayout from "./ProfileLayout";
import { Order } from "@/types/order";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Clock, RefreshCw, Truck } from "lucide-react";

const OrderHistory = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);
  
  // Загрузка заказов
  useEffect(() => {
    if (user) {
      const fetchOrders = async () => {
        try {
          const userOrders = await orderApi.getUserOrders(user.id);
          setOrders(userOrders);
        } catch (error) {
          console.error("Error fetching orders:", error);
          toast({
            title: "Ошибка",
            description: "Не удалось загрузить историю заказов",
            variant: "destructive"
          });
        } finally {
          setLoading(false);
        }
      };
      
      fetchOrders();
    }
  }, [user, toast]);
  
  // Функция повторения заказа
  const handleRepeatOrder = async (orderId: string) => {
    try {
      await orderApi.repeatOrder(orderId);
      toast({
        title: "Заказ повторен",
        description: "Ваш заказ добавлен в корзину",
      });
    } catch (error) {
      console.error("Error repeating order:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось повторить заказ",
        variant: "destructive"
      });
    }
  };
  
  // Функция для форматирования даты
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  // Получение статуса заказа
  const getStatusBadge = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-600 border-yellow-200">Ожидает подтверждения</Badge>;
      case "confirmed":
        return <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">Подтвержден</Badge>;
      case "preparing":
        return <Badge variant="outline" className="bg-purple-50 text-purple-600 border-purple-200">Готовится</Badge>;
      case "delivering":
        return <Badge variant="outline" className="bg-orange-50 text-orange-600 border-orange-200">В пути</Badge>;
      case "completed":
        return <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">Доставлен</Badge>;
      case "cancelled":
        return <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">Отменен</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  return (
    <ProfileLayout>
      <Card>
        <CardHeader>
          <CardTitle>История заказов</CardTitle>
          <CardDescription>
            Все ваши заказы за последнее время
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center my-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-500 mb-2">У вас пока нет заказов</h3>
              <p className="text-gray-500 mb-4">Сделайте свой первый заказ прямо сейчас!</p>
              <Button asChild>
                <Link to="/menu">Перейти в меню</Link>
              </Button>
            </div>
          ) : (
            <Accordion type="single" collapsible className="space-y-4">
              {orders.map((order) => (
                <AccordionItem key={order.id} value={order.id} className="border rounded-lg p-0 overflow-hidden">
                  <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-gray-50">
                    <div className="flex flex-col md:flex-row justify-between w-full items-start md:items-center gap-2 text-left">
                      <div className="flex items-center gap-2">
                        <div className="font-medium">Заказ #{order.id}</div>
                        {getStatusBadge(order.status)}
                      </div>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(order.createdAt)}</span>
                        </div>
                        <div className="font-medium text-foreground">{order.total} ₽</div>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <div className="space-y-4">
                      <div className="grid gap-2">
                        <h4 className="font-medium">Детали заказа</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Способ доставки:</p>
                            <p className="flex items-center gap-1 mt-1">
                              <Truck className="h-4 w-4" />
                              {order.deliveryTime === "asap" ? "Как можно скорее" : "По расписанию"}
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Способ оплаты:</p>
                            <p className="mt-1">
                              {order.paymentMethod === "card" ? "Картой онлайн" : 
                               order.paymentMethod === "cash" ? "Наличными при получении" : 
                               "Картой курьеру"}
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Адрес доставки:</p>
                            <p className="mt-1">{order.deliveryAddress}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Время заказа:</p>
                            <p className="flex items-center gap-1 mt-1">
                              <Clock className="h-4 w-4" />
                              {formatDate(order.createdAt)}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Состав заказа</h4>
                        <div className="space-y-3">
                          {order.items.map((item) => (
                            <div key={item.id} className="flex items-center justify-between border-b pb-2">
                              <div className="flex items-center gap-3">
                                <div className="h-12 w-12 rounded overflow-hidden">
                                  <img 
                                    src={item.image} 
                                    alt={item.name} 
                                    className="h-full w-full object-cover"
                                  />
                                </div>
                                <div>
                                  <p className="font-medium">{item.name}</p>
                                  <p className="text-sm text-muted-foreground">
                                    {item.size === "small" ? "Маленькая" : 
                                     item.size === "medium" ? "Средняя" : 
                                     "Большая"}
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p>{item.quantity} x {item.price} ₽</p>
                                <p className="font-medium">{item.price * item.quantity} ₽</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="flex justify-between items-center font-medium mt-3">
                          <span>Итого:</span>
                          <span>{order.total} ₽</span>
                        </div>
                      </div>
                      
                      <div className="flex justify-end mt-4">
                        <Button 
                          variant="outline" 
                          className="flex items-center gap-2"
                          onClick={() => handleRepeatOrder(order.id)}
                        >
                          <RefreshCw className="h-4 w-4" />
                          Повторить заказ
                        </Button>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </CardContent>
      </Card>
    </ProfileLayout>
  );
};

export default OrderHistory;
