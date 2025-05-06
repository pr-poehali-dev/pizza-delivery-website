
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { addressApi } from "@/api/client";
import ProfileLayout from "./ProfileLayout";
import { UserAddress } from "@/types/user";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Plus, Edit, Trash2, Home, Building } from "lucide-react";

const Addresses = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [addresses, setAddresses] = useState<UserAddress[]>([]);
  const [addressToDelete, setAddressToDelete] = useState<string | null>(null);
  
  // Состояние формы
  const [formData, setFormData] = useState<Omit<UserAddress, "id" | "userId">>({
    title: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
    isDefault: false
  });
  
  // Загрузка адресов
  useEffect(() => {
    if (user) {
      const fetchAddresses = async () => {
        try {
          const userAddresses = await addressApi.getUserAddresses(user.id);
          setAddresses(userAddresses);
        } catch (error) {
          console.error("Error fetching addresses:", error);
          toast({
            title: "Ошибка",
            description: "Не удалось загрузить адреса доставки",
            variant: "destructive"
          });
        } finally {
          setLoading(false);
        }
      };
      
      fetchAddresses();
    }
  }, [user, toast]);
  
  // Обработчик изменения полей формы
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };
  
  // Добавление нового адреса
  const handleAddAddress = async () => {
    if (!user) return;
    
    try {
      const newAddress = await addressApi.addAddress(user.id, formData);
      setAddresses(prev => [...prev, newAddress]);
      
      // Сброс формы
      setFormData({
        title: "",
        address: "",
        city: "",
        postalCode: "",
        phone: "",
        isDefault: false
      });
      
      toast({
        title: "Адрес добавлен",
        description: "Новый адрес доставки успешно добавлен",
      });
    } catch (error) {
      console.error("Error adding address:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось добавить адрес",
        variant: "destructive"
      });
    }
  };
  
  // Удаление адреса
  const handleDeleteAddress = async () => {
    if (!addressToDelete) return;
    
    try {
      await addressApi.deleteAddress(addressToDelete);
      setAddresses(prev => prev.filter(addr => addr.id !== addressToDelete));
      
      toast({
        title: "Адрес удален",
        description: "Адрес доставки успешно удален",
      });
    } catch (error) {
      console.error("Error deleting address:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось удалить адрес",
        variant: "destructive"
      });
    } finally {
      setAddressToDelete(null);
    }
  };
  
  // Установка адреса по умолчанию
  const handleSetDefaultAddress = async (addressId: string) => {
    try {
      await addressApi.updateAddress(addressId, { isDefault: true });
      
      // Обновляем локальное состояние
      setAddresses(prev => prev.map(addr => ({
        ...addr,
        isDefault: addr.id === addressId
      })));
      
      toast({
        title: "Адрес по умолчанию",
        description: "Адрес доставки установлен по умолчанию",
      });
    } catch (error) {
      console.error("Error setting default address:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось установить адрес по умолчанию",
        variant: "destructive"
      });
    }
  };
  
  return (
    <ProfileLayout>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Адреса доставки</CardTitle>
            <CardDescription>
              Управляйте адресами для доставки заказов
            </CardDescription>
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Добавить адрес
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Добавить новый адрес</DialogTitle>
                <DialogDescription>
                  Заполните все поля для добавления нового адреса доставки
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Название адреса</Label>
                  <Input 
                    id="title" 
                    name="title" 
                    placeholder="Например: Дом, Работа" 
                    value={formData.title}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="address">Адрес</Label>
                  <Input 
                    id="address" 
                    name="address" 
                    placeholder="Улица, дом, квартира" 
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="city">Город</Label>
                    <Input 
                      id="city" 
                      name="city" 
                      placeholder="Москва" 
                      value={formData.city}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="postalCode">Индекс</Label>
                    <Input 
                      id="postalCode" 
                      name="postalCode" 
                      placeholder="123456" 
                      value={formData.postalCode}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="phone">Телефон</Label>
                  <Input 
                    id="phone" 
                    name="phone" 
                    placeholder="+7 (___) ___-__-__" 
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="isDefault" 
                    name="isDefault"
                    checked={formData.isDefault}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isDefault: checked }))}
                  />
                  <Label htmlFor="isDefault">Использовать как адрес по умолчанию</Label>
                </div>
              </div>
              
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Отмена</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button onClick={handleAddAddress}>Добавить</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center my-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : addresses.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed">
              <MapPin className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-500 mb-2">У вас пока нет сохраненных адресов</h3>
              <p className="text-gray-500 mb-4">
                Добавьте адрес доставки для более быстрого оформления заказа
              </p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Добавить первый адрес
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  {/* Содержимое такое же, как выше */}
                </DialogContent>
              </Dialog>
            </div>
          ) : (
            <div className="grid gap-4">
              {addresses.map((address) => (
                <div 
                  key={address.id} 
                  className={`border rounded-lg p-4 ${address.isDefault ? 'border-primary/50 bg-primary/5' : ''}`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-full ${address.isDefault ? 'bg-primary/10 text-primary' : 'bg-gray-100'}`}>
                        {address.title.toLowerCase().includes('дом') ? (
                          <Home className="h-4 w-4" />
                        ) : address.title.toLowerCase().includes('работ') ? (
                          <Building className="h-4 w-4" />
                        ) : (
                          <MapPin className="h-4 w-4" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center">
                          <h3 className="font-medium">{address.title}</h3>
                          {address.isDefault && (
                            <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">
                              По умолчанию
                            </span>
                          )}
                        </div>
                        <p className="text-sm mt-1">{address.address}</p>
                        <p className="text-sm text-muted-foreground">
                          {address.city}, {address.postalCode}
                        </p>
                        <p className="text-sm mt-1">{address.phone}</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          {/* Форма редактирования адреса */}
                        </DialogContent>
                      </Dialog>
                      
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => setAddressToDelete(address.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                  
                  {!address.isDefault && (
                    <div className="mt-3 flex justify-end">
                      <Button 
                        variant="link" 
                        size="sm" 
                        className="h-auto p-0 text-primary"
                        onClick={() => handleSetDefaultAddress(address.id)}
                      >
                        Сделать адресом по умолчанию
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Диалог подтверждения удаления */}
      <AlertDialog open={!!addressToDelete} onOpenChange={(open) => !open && setAddressToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Вы уверены?</AlertDialogTitle>
            <AlertDialogDescription>
              Адрес будет удален. Это действие нельзя отменить.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteAddress}
              className="bg-red-500 hover:bg-red-600"
            >
              Удалить
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </ProfileLayout>
  );
};

export default Addresses;
