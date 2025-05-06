
import { Link } from "react-router-dom";
import { ShoppingCart, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold text-primary">ПиццаДоставка</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-sm font-medium hover:text-primary">
            Главная
          </Link>
          <Link to="/menu" className="text-sm font-medium hover:text-primary">
            Меню
          </Link>
          <Link to="/about" className="text-sm font-medium hover:text-primary">
            О нас
          </Link>
          <Link to="/contacts" className="text-sm font-medium hover:text-primary">
            Контакты
          </Link>
          <Link to="/promotions" className="text-sm font-medium hover:text-primary">
            Акции
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Link to="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                0
              </span>
            </Button>
          </Link>
          <Link to="/profile">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </Link>
          <Button className="hidden md:flex">Заказать</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
