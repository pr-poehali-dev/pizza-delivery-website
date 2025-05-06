
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  BarChart,
  Bar
} from "recharts";
import { ShoppingCart, Users, Package, DollarSign } from "lucide-react";

const Dashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Имитация загрузки данных
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Мок-данные для статистики
  const salesData = [
    { name: "Пн", продажи: 4000 },
    { name: "Вт", продажи: 3000 },
    { name: "Ср", продажи: 5000 },
    { name: "Чт", продажи: 2780 },
    { name: "Пт", продажи: 7800 },
    { name: "Сб", продажи: 9800 },
    { name: "Вс", продажи: 8000 },
  ];
  
  const popularPizzas = [
    { name: "Пепперони", value: 400 },
    { name: "Маргарита", value: 300 },
    { name: "Четыре сыра", value: 250 },
    { name: "Барбекю", value: 200 },
    { name: "Мексиканская", value: 150 },
  ];
  
  const COLORS = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c'];
  
  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Панель администратора</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6 flex items-center">
              <div className="bg-primary/10 p-3 rounded-full mr-4">
                <ShoppingCart className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Заказов сегодня</p>
                <h2 className="text-2xl font-bold">42</h2>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 flex items-center">
              <div className="bg-primary/10 p-3 rounded-full mr-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Клиентов</p>
                <h2 className="text-2xl font-bold">358</h2>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 flex items-center">
              <div className="bg-primary/10 p-3 rounded-full mr-4">
                <Package className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Продуктов</p>
                <h2 className="text-2xl font-bold">12</h2>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 flex items-center">
              <div className="bg-primary/10 p-3 rounded-full mr-4">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Выручка сегодня</p>
                <h2 className="text-2xl font-bold">32,450 ₽</h2>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Продажи за неделю</CardTitle>
              <CardDescription>Динамика продаж за последние 7 дней</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={salesData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="продажи" 
                      stroke="#8884d8" 
                      activeDot={{ r: 8 }} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Популярные пиццы</CardTitle>
              <CardDescription>Топ продаж по популярности</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={popularPizzas}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {popularPizzas.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Заказы по времени суток</CardTitle>
            <CardDescription>Распределение заказов по часам</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { час: "08:00", заказы: 12 },
                    { час: "10:00", заказы: 19 },
                    { час: "12:00", заказы: 37 },
                    { час: "14:00", заказы: 25 },
                    { час: "16:00", заказы: 18 },
                    { час: "18:00", заказы: 43 },
                    { час: "20:00", заказы: 58 },
                    { час: "22:00", заказы: 31 }
                  ]}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="час" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="заказы" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
