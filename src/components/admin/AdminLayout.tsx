
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import {
  LayoutDashboard,
  PizzaIcon,
  Package,
  ShoppingCart,
  Users,
  Settings,
  LogOut,
  ChevronDown,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const handleLogout = async () => {
    await logout();
    navigate("/admin/login");
  };
  
  const menuItems = [
    { path: "/admin/dashboard", label: "Панель управления", icon: LayoutDashboard },
    { path: "/admin/pizzas", label: "Пиццы", icon: PizzaIcon },
    { path: "/admin/ingredients", label: "Ингредиенты", icon: Package },
    { path: "/admin/orders", label: "Заказы", icon: ShoppingCart },
    { path: "/admin/customers", label: "Клиенты", icon: Users },
    { path: "/admin/settings", label: "Настройки", icon: Settings },
  ];
  
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Верхняя панель */}
      <header className="bg-white border-b h-16 flex items-center justify-between px-6">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="icon"
            className="mr-4 md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </Button>
          
          <Link to="/admin/dashboard" className="flex items-center">
            <PizzaIcon className="h-6 w-6 text-primary mr-2" />
            <span className="font-bold text-lg">ПиццаАдмин</span>
          </Link>
        </div>
        
        <div className="flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                  <span className="text-primary font-medium">
                    {user?.email.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="mr-2 hidden md:inline-block">{user?.email}</span>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Профиль</DropdownMenuItem>
              <DropdownMenuItem>Настройки</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Выйти
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      
      <div className="flex-grow flex">
        {/* Боковое меню - десктопная версия */}
        <aside className="hidden md:block w-64 bg-white border-r">
          <ScrollArea className="h-[calc(100vh-4rem)]">
            <div className="py-6 px-3">
              <div className="space-y-1">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  
                  return (
                    <Button
                      key={item.path}
                      variant={isActive ? "secondary" : "ghost"}
                      className={`w-full justify-start ${isActive ? 'bg-primary/10' : ''}`}
                      asChild
                    >
                      <Link to={item.path}>
                        <Icon className="h-5 w-5 mr-3" />
                        {item.label}
                      </Link>
                    </Button>
                  );
                })}
              </div>
              
              <Separator className="my-6" />
              
              <Button 
                variant="ghost" 
                className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5 mr-3" />
                Выйти
              </Button>
            </div>
          </ScrollArea>
        </aside>
        
        {/* Мобильное меню */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 bg-black/50 md:hidden" onClick={() => setMobileMenuOpen(false)}>
            <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white overflow-auto" onClick={(e) => e.stopPropagation()}>
              <div className="py-6 px-3">
                <div className="space-y-1">
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    
                    return (
                      <Button
                        key={item.path}
                        variant={isActive ? "secondary" : "ghost"}
                        className={`w-full justify-start ${isActive ? 'bg-primary/10' : ''}`}
                        asChild
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Link to={item.path}>
                          <Icon className="h-5 w-5 mr-3" />
                          {item.label}
                        </Link>
                      </Button>
                    );
                  })}
                </div>
                
                <Separator className="my-6" />
                
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
                  onClick={handleLogout}
                >
                  <LogOut className="h-5 w-5 mr-3" />
                  Выйти
                </Button>
              </div>
            </aside>
          </div>
        )}
        
        {/* Основной контент */}
        <main className="flex-grow">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
