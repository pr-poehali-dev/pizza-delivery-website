
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  PlusCircle, 
  Pencil, 
  Trash2, 
  Search, 
  FileDown, 
  FileUp,
  ChevronDown 
} from "lucide-react";
import { Pizza } from "@/types/pizza";
import { pizzaApi } from "@/api/client";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

const PizzaList = () => {
  const { toast } = useToast();
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [deletingPizzaId, setDeletingPizzaId] = useState<number | null>(null);
  
  // Загрузка данных о пиццах
  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const data = await pizzaApi.getAll();
        setPizzas(data);
      } catch (error) {
        console.error("Ошибка при загрузке пицц:", error);
        toast({
          title: "Ошибка",
          description: "Не удалось загрузить список пицц",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchPizzas();
  }, [toast]);
  
  // Фильтрация пицц по поисковому запросу
  const filteredPizzas = pizzas.filter(pizza => 
    pizza.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pizza.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Удаление пиццы
  const handleDelete = async () => {
    if (deletingPizzaId === null) return;
    
    setLoading(true);
    try {
      await pizzaApi.delete(deletingPizzaId);
      setPizzas(prevPizzas => prevPizzas.filter(pizza => pizza.id !== deletingPizzaId));
      toast({
        title: "Успешно",
        description: "Пицца была удалена"
      });
    } catch (error) {
      console.error("Ошибка при удалении пиццы:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось удалить пиццу",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
      setDeletingPizzaId(null);
    }
  };
  
  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
          <h1 className="text-2xl font-bold">Управление меню</h1>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild>
              <Link to="/admin/pizzas/new">
                <PlusCircle className="mr-2 h-4 w-4" />
                Добавить пиццу
              </Link>
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  Действия
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Операции</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <FileDown className="mr-2 h-4 w-4" />
                  Экспорт в CSV
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <FileUp className="mr-2 h-4 w-4" />
                  Импорт из CSV
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        <div className="mb-6">
          <div className="relative w-full md:max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              type="text"
              placeholder="Поиск пиццы..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Фото</TableHead>
                  <TableHead>Название</TableHead>
                  <TableHead>Категория</TableHead>
                  <TableHead>Цена (Средняя)</TableHead>
                  <TableHead>Скидка</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead className="text-right">Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPizzas.length > 0 ? (
                  filteredPizzas.map((pizza) => (
                    <TableRow key={pizza.id}>
                      <TableCell className="font-medium">{pizza.id}</TableCell>
                      <TableCell>
                        <div className="h-10 w-10 rounded-md overflow-hidden">
                          <img
                            src={pizza.image}
                            alt={pizza.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </TableCell>
                      <TableCell>{pizza.name}</TableCell>
                      <TableCell>
                        {pizza.category === "classic" && "Классическая"}
                        {pizza.category === "vegetarian" && "Вегетарианская"}
                        {pizza.category === "seafood" && "С морепродуктами"}
                        {pizza.category === "gluten-free" && "Без глютена"}
                      </TableCell>
                      <TableCell>{pizza.prices.medium} ₽</TableCell>
                      <TableCell>
                        {pizza.discount > 0 ? (
                          <Badge className="bg-red-500">{pizza.discount}%</Badge>
                        ) : (
                          "—"
                        )}
                      </TableCell>
                      <TableCell>
                        {pizza.isNew ? (
                          <Badge className="bg-green-500">Новинка</Badge>
                        ) : (
                          <Badge variant="outline">Обычная</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" asChild>
                            <Link to={`/admin/pizzas/${pizza.id}/edit`}>
                              <Pencil className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => setDeletingPizzaId(pizza.id)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center h-24">
                      Нет пицц, соответствующих запросу
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
      
      {/* Диалог подтверждения удаления */}
      <AlertDialog open={deletingPizzaId !== null} onOpenChange={() => setDeletingPizzaId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Вы уверены?</AlertDialogTitle>
            <AlertDialogDescription>
              Это действие нельзя отменить. Пицца будет удалена из меню.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600"
            >
              Удалить
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
};

export default PizzaList;
