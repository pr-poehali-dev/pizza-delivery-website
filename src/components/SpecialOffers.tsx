
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const offers = [
  {
    id: 1,
    title: "2 по цене 1",
    description: "Две пиццы по цене одной! Закажите любую пиццу из меню и получите вторую в подарок",
    imageUrl: "https://images.unsplash.com/photo-1594007654729-407eedc4fe24?q=80&w=800&auto=format&fit=crop",
    badge: "Хит",
    expiresAt: "До 10 мая"
  },
  {
    id: 2,
    title: "Пицца недели",
    description: "Каждую неделю новая пицца со скидкой 30%. На этой неделе - 'Четыре сыра'",
    imageUrl: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=800&auto=format&fit=crop",
    badge: "Скидка 30%",
    expiresAt: "До 7 мая"
  },
  {
    id: 3,
    title: "Комбо-набор",
    description: "Большая пицца + напиток + картофель фри всего за 999 рублей!",
    imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=800&auto=format&fit=crop",
    badge: "Выгодно",
    expiresAt: "Постоянная акция"
  }
];

const SpecialOffers = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Специальные предложения</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Не упустите возможность попробовать наши лучшие пиццы по выгодным ценам
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offers.map((offer) => (
            <Card key={offer.id} className="overflow-hidden transition-all hover:shadow-lg">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={offer.imageUrl} 
                  alt={offer.title} 
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
                <Badge className="absolute top-3 right-3 bg-primary">{offer.badge}</Badge>
              </div>
              <CardHeader>
                <CardTitle>{offer.title}</CardTitle>
                <CardDescription>{offer.expiresAt}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{offer.description}</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Заказать со скидкой</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialOffers;
