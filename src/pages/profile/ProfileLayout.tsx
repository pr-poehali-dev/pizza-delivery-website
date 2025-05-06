
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  User, 
  PackageOpen, 
  MapPin, 
  Heart, 
  CreditCard, 
  Bell, 
  Settings, 
  LogOut,
  Menu,
  X
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

type ProfileLayoutProps = {
  children: React.ReactNode;
};

const ProfileLayout = ({ children }: ProfileLayoutProps) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const menuItems = [
    { path: "/profile", icon: User, label: "Мой профиль" },
    { path: "/profile/orders", icon: PackageOpen, label: "История заказов" },
    { path: "/profile/addresses", icon: MapPin, label: "Адреса доставки" },
    { path: "/profile/favorites", icon: Heart, label: "Избранное" },
    { path: "/profile/payment", icon: CreditCard, label: "Способы оплаты" },
    { path: "/profile/notifications", icon: Bell, label: "Уведомления" },
    { path: "/profile/settings", icon: Settings, label: "Настройки" },
  ];
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Боковое меню - мобильная версия */}
            <div className="md:hidden flex items-center justify-between bg-white p-4 rounded-lg shadow-sm mb-4">
              <h2 className="font-semibold">Личный кабинет</h2>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X /> : <Menu />}
              </Button>
            </div>
            
            {/* Боковое меню */}
            <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:block md:w-64 shrink-0`}>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-lg">
                    {user?.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium">{user?.name}</p>
                    <p className="text-sm text-muted-foreground">{user?.email}</p>
                  </div>
                </div>
                
                <Separator className="mb-4" />
                
                <nav className="space-y-1">
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                          isActive 
                            ? 'bg-primary/10 text-primary' 
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Icon size={18} />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                  
                  <button
                    onClick={() => logout()}
                    className="flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-red-500 hover:bg-red-50 w-full text-left"
                  >
                    <LogOut size={18} />
                    <span>Выйти</span>
                  </button>
                </nav>
              </div>
            </div>
            
            {/* Основное содержимое */}
            <div className="flex-grow">
              {children}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProfileLayout;
