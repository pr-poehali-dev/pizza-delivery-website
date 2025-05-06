
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Search, X } from "lucide-react";
import PizzaCard from "@/components/PizzaCard";
import { pizzas } from "@/data/pizzas";

// Типы для фильтров
type Category = "all" | "classic" | "vegetarian" | "seafood" | "gluten-free";
type FilterTag = "spicy" | "meat" | "cheese" | "bbq-sauce" | "mushrooms" | "vegetables";

const Menu = () => {
  const [category, setCategory] = useState<Category>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTags, setActiveTags] = useState<FilterTag[]>([]);

  // Фильтрация пицц
  const filteredPizzas = pizzas.filter((pizza) => {
    // Фильтр по категории
    if (category !== "all" && pizza.category !== category) {
      return false;
    }

    // Фильтр по поисковому запросу
    if (
      searchQuery &&
      !pizza.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !pizza.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    // Фильтр по тегам
    if (activeTags.length > 0) {
      return activeTags.every((tag) => pizza.tags.includes(tag));
    }

    return true;
  });

  // Обработчик изменения тегов
  const toggleTag = (tag: FilterTag) => {
    setActiveTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag]
    );
  };

  // Очистка всех фильтров
  const clearFilters = () => {
    setCategory("all");
    setSearchQuery("");
    setActiveTags([]);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Заголовок страницы */}
        <div className="bg-gradient-to-r from-orange-100 to-red-50 py-10">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Меню пиццы</h1>
            <p className="text-gray-700 max-w-2xl">
              Выберите из нашего разнообразного меню пицц. Используем только свежие 
              ингредиенты и готовим с любовью.
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-10">
          {/* Фильтры */}
          <div className="mb-10 bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  type="text"
                  placeholder="Поиск пиццы..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Button 
                variant="outline" 
                className="text-sm" 
                onClick={clearFilters}
                disabled={category === "all" && !searchQuery && activeTags.length === 0}
              >
                <X className="mr-2 h-4 w-4" /> Очистить фильтры
              </Button>
            </div>
            
            {/* Категории в виде табов */}
            <Tabs defaultValue="all" value={category} onValueChange={(value) => setCategory(value as Category)}>
              <TabsList className="w-full justify-start overflow-auto py-2">
                <TabsTrigger value="all">Все пиццы</TabsTrigger>
                <TabsTrigger value="classic">Классические</TabsTrigger>
                <TabsTrigger value="vegetarian">Вегетарианские</TabsTrigger>
                <TabsTrigger value="seafood">С морепродуктами</TabsTrigger>
                <TabsTrigger value="gluten-free">Без глютена</TabsTrigger>
              </TabsList>
            </Tabs>
            
            {/* Теги для фильтрации */}
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge 
                variant={activeTags.includes("spicy") ? "default" : "outline"} 
                className="cursor-pointer"
                onClick={() => toggleTag("spicy")}
              >
                {activeTags.includes("spicy") && <CheckCircle className="mr-1 h-3 w-3" />}
                Острая
              </Badge>
              <Badge 
                variant={activeTags.includes("meat") ? "default" : "outline"} 
                className="cursor-pointer"
                onClick={() => toggleTag("meat")}
              >
                {activeTags.includes("meat") && <CheckCircle className="mr-1 h-3 w-3" />}
                С мясом
              </Badge>
              <Badge 
                variant={activeTags.includes("cheese") ? "default" : "outline"} 
                className="cursor-pointer"
                onClick={() => toggleTag("cheese")}
              >
                {activeTags.includes("cheese") && <CheckCircle className="mr-1 h-3 w-3" />}
                Сырная
              </Badge>
              <Badge 
                variant={activeTags.includes("bbq-sauce") ? "default" : "outline"} 
                className="cursor-pointer"
                onClick={() => toggleTag("bbq-sauce")}
              >
                {activeTags.includes("bbq-sauce") && <CheckCircle className="mr-1 h-3 w-3" />}
                С соусом BBQ
              </Badge>
              <Badge 
                variant={activeTags.includes("mushrooms") ? "default" : "outline"} 
                className="cursor-pointer"
                onClick={() => toggleTag("mushrooms")}
              >
                {activeTags.includes("mushrooms") && <CheckCircle className="mr-1 h-3 w-3" />}
                С грибами
              </Badge>
              <Badge 
                variant={activeTags.includes("vegetables") ? "default" : "outline"} 
                className="cursor-pointer"
                onClick={() => toggleTag("vegetables")}
              >
                {activeTags.includes("vegetables") && <CheckCircle className="mr-1 h-3 w-3" />}
                С овощами
              </Badge>
            </div>
          </div>
          
          {/* Результаты поиска */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">
              {filteredPizzas.length > 0
                ? `Найдено ${filteredPizzas.length} ${
                    filteredPizzas.length === 1 ? "пицца" : 
                    filteredPizzas.length >= 2 && filteredPizzas.length <= 4 ? "пиццы" : "пицц"
                  }`
                : "Не найдено пицц по вашему запросу"}
            </h2>
          </div>
          
          {/* Сетка с пиццами */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPizzas.map((pizza) => (
              <PizzaCard key={pizza.id} pizza={pizza} />
            ))}
          </div>
          
          {/* Если нет результатов */}
          {filteredPizzas.length === 0 && (
            <div className="text-center py-16">
              <h3 className="text-2xl font-medium text-gray-500 mb-4">
                Пиццы не найдены
              </h3>
              <p className="text-gray-500 mb-6">
                Попробуйте изменить параметры фильтрации или сбросить фильтры
              </p>
              <Button onClick={clearFilters}>Сбросить все фильтры</Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Menu;
