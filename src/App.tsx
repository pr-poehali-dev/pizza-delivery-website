import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CartProvider } from "@/hooks/use-cart";
import { AuthProvider } from "@/hooks/use-auth";
import Index from "./pages/Index";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import PizzaDetails from "./pages/PizzaDetails";
import AboutUs from "./pages/AboutUs";
import Contacts from "./pages/Contacts";
import NotFound from "./pages/NotFound";

// Админ панель
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminPizzaList from "./pages/admin/PizzaList";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Клиентская часть */}
              <Route path="/" element={<Index />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/pizza/:id" element={<PizzaDetails />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contacts" element={<Contacts />} />
              
              {/* Административная часть */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/pizzas" element={<AdminPizzaList />} />
              
              {/* Редирект с /admin на /admin/dashboard */}
              <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
              
              {/* 404 страница */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;