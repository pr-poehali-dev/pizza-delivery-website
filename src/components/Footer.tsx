
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white text-lg font-bold mb-4">ПиццаДоставка</h3>
            <p className="mb-4">
              Доставка вкуснейшей пиццы из печи прямо к вашей двери. Свежие ингредиенты, отличный вкус!
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="hover:text-white">
                <Facebook size={20} />
              </a>
              <a href="https://instagram.com" className="hover:text-white">
                <Instagram size={20} />
              </a>
              <a href="https://twitter.com" className="hover:text-white">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Меню</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/menu" className="hover:text-white">Все пиццы</Link>
              </li>
              <li>
                <Link to="/menu/classic" className="hover:text-white">Классические</Link>
              </li>
              <li>
                <Link to="/menu/vegetarian" className="hover:text-white">Вегетарианские</Link>
              </li>
              <li>
                <Link to="/menu/seafood" className="hover:text-white">С морепродуктами</Link>
              </li>
              <li>
                <Link to="/menu/gluten-free" className="hover:text-white">Без глютена</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Информация</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="hover:text-white">О нас</Link>
              </li>
              <li>
                <Link to="/contacts" className="hover:text-white">Контакты</Link>
              </li>
              <li>
                <Link to="/delivery" className="hover:text-white">Доставка</Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white">Частые вопросы</Link>
              </li>
              <li>
                <Link to="/policy" className="hover:text-white">Политика конфиденциальности</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Контакты</h3>
            <address className="not-italic">
              <p className="mb-2">г. Москва, ул. Пиццы, д. 42</p>
              <p className="mb-2">Телефон: <a href="tel:+74951234567" className="hover:text-white">+7 (495) 123-45-67</a></p>
              <p className="mb-2">Email: <a href="mailto:info@pizzadelivery.ru" className="hover:text-white">info@pizzadelivery.ru</a></p>
              <p>Время работы: 10:00 - 23:00, без выходных</p>
            </address>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} ПиццаДоставка. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
