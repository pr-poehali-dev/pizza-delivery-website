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
import Login from "./pages/Login";
import Register from "./pages/Register";
import RequireAuth from "./components/RequireAuth";

// Личный кабинет
import Profile from "./pages/profile/Profile";
import OrderHistory from "./pages/profile/OrderHistory";
import Addresses from "./pages/profile/Addresses";

// Админ панель
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminPizzaList from "./pages/admin/PizzaList";
import AdminPizzaForm from "./pages/admin/PizzaForm";

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
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Личный кабинет (защищенные маршруты) */}
              <Route path="/profile" element={
                <RequireAuth>
                  <Profile />
                </RequireAuth>
              } />
              <Route path="/profile/orders" element={
                <RequireAuth>
                  <OrderHistory />
                </RequireAuth>
              } />
              <Route path="/profile/addresses" element={
                <RequireAuth>
                  <Addresses />
                </RequireAuth>
              } />
              
              {/* Административная часть (защищенные маршруты) */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={
                <RequireAuth allowedRoles={["admin"]}>
                  <AdminDashboard />
                </RequireAuth>
              } />
              <Route path="/admin/pizzas" element={
                <RequireAuth allowedRoles={["admin"]}>
                  <AdminPizzaList />
                </RequireAuth>
              } />
              <Route path="/admin/pizzas/new" element={
                <RequireAuth allowedRoles={["admin"]}>
                  <AdminPizzaForm />
                </RequireAuth>
              } />
              <Route path="/admin/pizzas/:id/edit" element={
                <RequireAuth allowedRoles={["admin"]}>
                  <AdminPizzaForm />
                </RequireAuth>
              } />
              
              {/* Редиректы */}
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