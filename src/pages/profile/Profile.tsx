
import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import ProfileLayout from "./ProfileLayout";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    // Имитация обновления профиля
    setTimeout(() => {
      setLoading(false);
      
      // В реальном приложении здесь будет запрос к API
      toast({
        title: "Профиль обновлен",
        description: "Ваши данные успешно сохранены",
      });
    }, 1000);
  };
  
  return (
    <ProfileLayout>
      <Card>
        <CardHeader>
          <CardTitle>Мой профиль</CardTitle>
          <CardDescription>
            Здесь вы можете изменить свои личные данные
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Имя</Label>
                <Input 
                  id="name" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Телефон</Label>
                <Input 
                  id="phone" 
                  type="tel" 
                  placeholder="+7 (___) ___-__-__" 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button type="submit" disabled={loading}>
                {loading && <span className="mr-2 animate-spin">⊚</span>}
                {loading ? "Сохранение..." : "Сохранить изменения"}
              </Button>
            </div>
          </form>
          
          <div className="mt-8">
            <h3 className="text-lg font-medium mb-4">Смена пароля</h3>
            
            <form className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Текущий пароль</Label>
                  <Input id="currentPassword" type="password" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="newPassword">Новый пароль</Label>
                  <Input id="newPassword" type="password" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Подтверждение пароля</Label>
                  <Input id="confirmPassword" type="password" />
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button type="submit" variant="outline">
                  Изменить пароль
                </Button>
              </div>
            </form>
          </div>
        </CardContent>
      </Card>
    </ProfileLayout>
  );
};

export default Profile;
