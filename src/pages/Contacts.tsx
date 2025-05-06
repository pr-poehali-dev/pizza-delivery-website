
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Facebook, 
  Instagram, 
  Twitter 
} from "lucide-react";

const Contacts = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Валидация формы
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, заполните все обязательные поля",
        variant: "destructive"
      });
      return;
    }
    
    // Имитация отправки формы
    toast({
      title: "Сообщение отправлено",
      description: "Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время."
    });
    
    // Сброс формы
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: ""
    });
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Заголовок страницы */}
        <div className="bg-gradient-to-r from-orange-100 to-red-50 py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Контакты</h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Мы всегда рады вашим вопросам и предложениям. Свяжитесь с нами любым удобным способом.
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Контактная информация */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Связаться с нами</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-primary mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Адрес</h3>
                    <p className="text-gray-700">
                      г. Москва, ул. Пиццы, д. 42<br />
                      115000, Россия
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="h-6 w-6 text-primary mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Телефон</h3>
                    <p className="text-gray-700">
                      <a href="tel:+74951234567" className="hover:text-primary">+7 (495) 123-45-67</a><br />
                      <a href="tel:+74951234568" className="hover:text-primary">+7 (495) 123-45-68</a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-primary mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Email</h3>
                    <p className="text-gray-700">
                      <a href="mailto:info@pizzadelivery.ru" className="hover:text-primary">info@pizzadelivery.ru</a><br />
                      <a href="mailto:support@pizzadelivery.ru" className="hover:text-primary">support@pizzadelivery.ru</a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="h-6 w-6 text-primary mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Время работы</h3>
                    <p className="text-gray-700">
                      Пн-Вс: 10:00 - 23:00<br />
                      Без выходных
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="font-semibold text-lg mb-4">Мы в социальных сетях</h3>
                <div className="flex space-x-4">
                  <a href="https://facebook.com" className="bg-primary/10 hover:bg-primary/20 p-3 rounded-full transition-colors">
                    <Facebook className="h-6 w-6 text-primary" />
                  </a>
                  <a href="https://instagram.com" className="bg-primary/10 hover:bg-primary/20 p-3 rounded-full transition-colors">
                    <Instagram className="h-6 w-6 text-primary" />
                  </a>
                  <a href="https://twitter.com" className="bg-primary/10 hover:bg-primary/20 p-3 rounded-full transition-colors">
                    <Twitter className="h-6 w-6 text-primary" />
                  </a>
                </div>
              </div>
              
              {/* Карта */}
              <div className="mt-8">
                <h3 className="font-semibold text-lg mb-4">Наше расположение</h3>
                <div className="rounded-lg overflow-hidden shadow-md h-80 bg-gray-200">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2245.347142767!2d37.61839391566778!3d55.75547998055649!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b54a50b315e573%3A0xa886bf5a3d9b2e68!2sRed%20Square%2C%20Moskva%2C%20Russia!5e0!3m2!1sen!2s!4v1652521302874!5m2!1sen!2s" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Карта расположения"
                  ></iframe>
                </div>
              </div>
            </div>
            
            {/* Форма обратной связи */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-6">Напишите нам</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Ваше имя *</Label>
                    <Input 
                      id="name" 
                      name="name" 
                      value={formData.name} 
                      onChange={handleChange} 
                      placeholder="Иван Иванов"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      value={formData.email} 
                      onChange={handleChange} 
                      placeholder="example@mail.ru"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Телефон</Label>
                    <Input 
                      id="phone" 
                      name="phone" 
                      value={formData.phone} 
                      onChange={handleChange} 
                      placeholder="+7 (___) ___-__-__"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Тема</Label>
                    <Input 
                      id="subject" 
                      name="subject" 
                      value={formData.subject} 
                      onChange={handleChange} 
                      placeholder="Тема сообщения"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Сообщение *</Label>
                  <Textarea 
                    id="message" 
                    name="message" 
                    value={formData.message} 
                    onChange={handleChange} 
                    placeholder="Ваше сообщение..."
                    rows={6}
                    required
                  />
                </div>
                
                <Button type="submit" className="w-full">Отправить сообщение</Button>
                
                <p className="text-sm text-gray-500 text-center">
                  * Поля, обязательные для заполнения
                </p>
              </form>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contacts;
