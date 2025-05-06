
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const AboutUs = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Заголовок страницы */}
        <div className="bg-gradient-to-r from-orange-100 to-red-50 py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">О нас</h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Мы любим пиццу и делаем её с душой уже более 10 лет
            </p>
          </div>
        </div>
        
        {/* История компании */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <Badge className="mb-4">Наша история</Badge>
                <h2 className="text-3xl font-bold mb-6">Как всё начиналось</h2>
                <p className="text-gray-700 mb-4">
                  Наша компания основана в 2013 году группой друзей, объединенных страстью к итальянской кухне. 
                  Мы начинали с небольшой пиццерии в центре города, где все делали своими руками: 
                  от замешивания теста до доставки пиццы на велосипедах.
                </p>
                <p className="text-gray-700 mb-4">
                  За 10 лет мы выросли из маленькой пиццерии в сеть ресторанов, 
                  но наши ценности остались неизменными: свежие ингредиенты, традиционные рецепты и любовь к пицце.
                </p>
                <p className="text-gray-700">
                  Сегодня мы готовим более 50 видов пицц и обслуживаем тысячи клиентов ежедневно, 
                  но каждый заказ для нас особенный.
                </p>
              </div>
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1616538523432-32e08e354ba1?q=80&w=1000&auto=format&fit=crop" 
                  alt="История пиццерии" 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Наши ценности */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge className="mb-4">Наши ценности</Badge>
              <h2 className="text-3xl font-bold mb-4">Что для нас важно</h2>
              <p className="text-gray-700 max-w-2xl mx-auto">
                Мы придерживаемся нескольких простых, но важных принципов, которые помогают нам делать лучшую пиццу
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-white border-none shadow">
                <CardContent className="p-6 text-center">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Качество</h3>
                  <p className="text-gray-700">
                    Мы используем только свежие и качественные ингредиенты от проверенных поставщиков.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-white border-none shadow">
                <CardContent className="p-6 text-center">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Скорость</h3>
                  <p className="text-gray-700">
                    Мы ценим ваше время и гарантируем доставку в течение 30 минут или возврат денег.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-white border-none shadow">
                <CardContent className="p-6 text-center">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Клиентоориентированность</h3>
                  <p className="text-gray-700">
                    Мы прислушиваемся к вашим пожеланиям и делаем всё, чтобы вы остались довольны.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Наша команда */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge className="mb-4">Наша команда</Badge>
              <h2 className="text-3xl font-bold mb-4">Люди, которые делают пиццу с любовью</h2>
              <p className="text-gray-700 max-w-2xl mx-auto">
                Знакомьтесь с профессионалами, которые каждый день стараются сделать вашу пиццу идеальной
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  name: "Алексей Петров",
                  position: "Шеф-повар",
                  image: "https://i.pravatar.cc/300?img=5"
                },
                {
                  name: "Мария Иванова",
                  position: "Су-шеф",
                  image: "https://i.pravatar.cc/300?img=6"
                },
                {
                  name: "Дмитрий Соколов",
                  position: "Пиццайоло",
                  image: "https://i.pravatar.cc/300?img=7"
                },
                {
                  name: "Елена Смирнова",
                  position: "Менеджер",
                  image: "https://i.pravatar.cc/300?img=8"
                }
              ].map((member, index) => (
                <div key={index} className="text-center">
                  <div className="rounded-full overflow-hidden w-40 h-40 mx-auto mb-4">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-gray-600">{member.position}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Цифры и факты */}
        <section className="py-16 bg-primary/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">Цифры и факты</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { number: "10+", text: "лет на рынке" },
                { number: "5000+", text: "пицц ежемесячно" },
                { number: "15", text: "ресторанов в городе" },
                { number: "98%", text: "довольных клиентов" }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{stat.number}</div>
                  <p className="text-gray-700 text-lg">{stat.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutUs;
