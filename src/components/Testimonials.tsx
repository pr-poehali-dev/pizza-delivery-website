
import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    id: 1,
    content: "Лучшая пицца в городе! Всегда горячая, всегда вовремя. Заказываю не реже раза в неделю.",
    author: "Мария К.",
    avatar: "https://i.pravatar.cc/150?img=1",
    rating: 5
  },
  {
    id: 2,
    content: "Очень вкусная пицца с хрустящей корочкой. Доставка была даже раньше обещанного времени.",
    author: "Алексей В.",
    avatar: "https://i.pravatar.cc/150?img=2",
    rating: 5
  },
  {
    id: 3,
    content: "Разнообразное меню и отличный сервис. Теперь это моя любимая пиццерия.",
    author: "Екатерина Д.",
    avatar: "https://i.pravatar.cc/150?img=3",
    rating: 4
  },
  {
    id: 4,
    content: "Заказывал на день рождения. Все гости были в восторге. Спасибо за прекрасный вечер!",
    author: "Дмитрий М.",
    avatar: "https://i.pravatar.cc/150?img=4",
    rating: 5
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Отзывы наших клиентов</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Узнайте, что говорят о нас наши довольные клиенты
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <Card className="bg-gray-50 border-none shadow-md">
            <CardContent className="p-8">
              <div className="text-center">
                <Quote className="h-12 w-12 mx-auto mb-6 text-primary opacity-20" />
                
                <p className="text-lg md:text-xl mb-6">
                  {testimonials[currentIndex].content}
                </p>
                
                <div className="flex items-center justify-center mb-4">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                
                <div className="flex flex-col items-center">
                  <Avatar className="h-16 w-16 mb-4">
                    <AvatarImage src={testimonials[currentIndex].avatar} />
                    <AvatarFallback>{testimonials[currentIndex].author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{testimonials[currentIndex].author}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-center mt-6 space-x-4">
            <Button 
              onClick={prevTestimonial} 
              variant="outline" 
              size="icon" 
              className="rounded-full"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button 
              onClick={nextTestimonial} 
              variant="outline" 
              size="icon" 
              className="rounded-full"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
