
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-r from-orange-100 to-red-50 py-16">
      <div className="container mx-auto px-4 flex flex-col-reverse md:flex-row items-center">
        <div className="md:w-1/2 space-y-6 mt-8 md:mt-0">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
            Доставка пиццы на дом — Быстро и вкусно!
          </h1>
          <p className="text-lg text-gray-600">
            Мы используем только свежие ингредиенты и готовим с любовью. Доставим вашу пиццу за 30 минут или вернем деньги.
          </p>
          <div className="flex space-x-4">
            <Link to="/menu">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-medium">
                Заказать пиццу
              </Button>
            </Link>
            <Link to="/promotions">
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                Наши акции
              </Button>
            </Link>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-end">
          <img
            src="https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1000&auto=format&fit=crop"
            alt="Аппетитная пицца"
            className="w-full h-auto max-w-md rounded-lg shadow-xl transform rotate-3"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
