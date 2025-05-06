
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Pizza, PizzaCategory, PizzaTag } from "@/types/pizza";
import { pizzaApi } from "@/api/client";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

const PizzaForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEditing = !!id;
  
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  
  // Состояние формы
  const [formData, setFormData] = useState<Partial<Pizza>>({
    name: "",
    description: "",
    category: "classic",
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=800&auto=format&fit=crop",
    prices: {
      small: 0,
      medium: 0,
      large: 0
    },
    tags: [],
    isNew: false,
    discount: 0
  });
  
  // Загрузка данных о пицце для редактирования
  useEffect(() => {
    if (isEditing) {
      const fetchPizza = async () => {
        try {
          const pizzaId = parseInt(id || "0");
          const pizza = await pizzaApi.getById(pizzaId);
          
          if (pizza) {
            setFormData(pizza);
          } else {
            navigate("/admin/pizzas");
            toast({
              title: "Ошибка",
              description: "Пицца не найдена",
              variant: "destructive"
            });
          }
        } catch (error) {
          console.error("Ошибка при загрузке пиццы:", error);
          toast({
            title: "Ошибка",
            description: "Не удалось загрузить данные о пицце",
            variant: "destructive"
          });
          navigate("/admin/pizzas");
        } finally {
          setLoading(false);
        }
      };
      
      fetchPizza();
    }
  }, [id, isEditing, navigate, toast]);
  
  // Обработчик изменения полей
  const handleChange = (field: string, value: unknown) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  // Обработчик изменения цен
  const handlePriceChange = (size: keyof Pizza["prices"], value: string) => {
    const numValue = parseInt(value) || 0;
    setFormData(prev => ({
      ...prev,
      prices: {
        ...prev.prices,
        [size]: numValue
      }
    }));
  };
  
  // Обработчик изменения тегов
  const handleTagToggle = (tag: PizzaTag) => {
    setFormData(prev => {
      const currentTags = prev.tags || [];
      
      if (currentTags.includes(tag)) {
        return {
          ...prev,
          tags: currentTags.filter(t => t !== tag)
        };
      } else {
        return {
          ...prev,
          tags: [...currentTags, tag]
        };
      }
    });
  };
  
  // Сохранение формы
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.description) {
      toast({
        title: "Ошибка валидации",
        description: "Заполните все обязательные поля",
        variant: "destructive"
      });
      return;
    }
    
    setSaving(true);
    
    try {
      if (isEditing && id) {
        await pizzaApi.update(parseInt(id), formData);
        toast({
          title: "Успешно",
          description: "Пицца успешно обновлена"
        });
      } else {
        await pizzaApi.create(formData as Omit<Pizza, "id">);
        toast({
          title: "Успешно",
          description: "Новая пицца успешно добавлена"
        });
      }
      
      navigate("/admin/pizzas");
    } catch (error) {
      console.error("Ошибка при сохранении пиццы:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось сохранить пиццу",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };
  
  // Список категорий пиццы
  const categories = [
    { value: "classic", label: "Классическая" },
    { value: "vegetarian", label: "Вегетарианская" },
    { value: "seafood", label: "С морепродуктами" },
    { value: "gluten-free", label: "Без глютена" }
  ];
  
  // Список тегов
  const tags = [
    { value: "spicy", label: "Острая" },
    { value: "meat", label: "С мясом" },
    { value: "cheese", label: "Сырная" },
    { value: "bbq-sauce", label: "С соусом BBQ" },
    { value: "mushrooms", label: "С грибами" },
    { value: "vegetables", label: "С овощами" },
    { value: "seafood", label: "С морепродуктами" }
  ];
  
  if (loading) {
    return (
      <AdminLayout>
        <div className="p-6 flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </AdminLayout>
    );
  }
  
  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">
          {isEditing ? "Редактирование пиццы" : "Добавление новой пиццы"}
        </h1>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Основная информация</CardTitle>
                  <CardDescription>
                    Укажите основные данные о пицце
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Название *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      placeholder="Например: Пепперони"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Описание *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleChange("description", e.target.value)}
                      placeholder="Описание пиццы и ее ингредиентов"
                      rows={4}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Категория</Label>
                      <Select
                        value={formData.category as string}
                        onValueChange={(value) => handleChange("category", value as PizzaCategory)}
                      >
                        <SelectTrigger id="category">
                          <SelectValue placeholder="Выберите категорию" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.value} value={category.value}>
                              {category.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="image">URL изображения</Label>
                      <Input
                        id="image"
                        value={formData.image}
                        onChange={(e) => handleChange("image", e.target.value)}
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Цены</CardTitle>
                  <CardDescription>
                    Укажите цены для разных размеров пиццы
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="price-small">Маленькая (25 см)</Label>
                      <div className="relative">
                        <Input
                          id="price-small"
                          type="number"
                          min="0"
                          value={formData.prices?.small || ""}
                          onChange={(e) => handlePriceChange("small", e.target.value)}
                          className="pr-8"
                        />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                          ₽
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="price-medium">Средняя (30 см)</Label>
                      <div className="relative">
                        <Input
                          id="price-medium"
                          type="number"
                          min="0"
                          value={formData.prices?.medium || ""}
                          onChange={(e) => handlePriceChange("medium", e.target.value)}
                          className="pr-8"
                        />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                          ₽
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="price-large">Большая (35 см)</Label>
                      <div className="relative">
                        <Input
                          id="price-large"
                          type="number"
                          min="0"
                          value={formData.prices?.large || ""}
                          onChange={(e) => handlePriceChange("large", e.target.value)}
                          className="pr-8"
                        />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                          ₽
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Теги</CardTitle>
                  <CardDescription>
                    Выберите теги, которые характеризуют пиццу
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {tags.map((tag) => (
                      <div key={tag.value} className="flex items-center space-x-2">
                        <Checkbox
                          id={`tag-${tag.value}`}
                          checked={(formData.tags || []).includes(tag.value as PizzaTag)}
                          onCheckedChange={() => handleTagToggle(tag.value as PizzaTag)}
                        />
                        <Label htmlFor={`tag-${tag.value}`}>{tag.label}</Label>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Превью</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="rounded-lg overflow-hidden mb-4 h-48">
                    <img
                      src={formData.image}
                      alt={formData.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://placehold.co/600x400?text=Pizza+Image";
                      }}
                    />
                  </div>
                  <p className="font-semibold text-lg">{formData.name || "Название пиццы"}</p>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-3">
                    {formData.description || "Описание пиццы"}
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Настройки</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="is-new">Отметить как новинку</Label>
                    <Switch
                      id="is-new"
                      checked={formData.isNew}
                      onCheckedChange={(checked) => handleChange("isNew", checked)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="discount">Скидка (%)</Label>
                    <Input
                      id="discount"
                      type="number"
                      min="0"
                      max="100"
                      value={formData.discount}
                      onChange={(e) => handleChange("discount", parseInt(e.target.value) || 0)}
                    />
                  </div>
                </CardContent>
              </Card>
              
              <div className="flex justify-end space-x-4 mt-6">
                <Button variant="outline" type="button" onClick={() => navigate("/admin/pizzas")}>
                  Отмена
                </Button>
                <Button type="submit" disabled={saving}>
                  {saving ? "Сохранение..." : (isEditing ? "Сохранить" : "Добавить")}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default PizzaForm;
