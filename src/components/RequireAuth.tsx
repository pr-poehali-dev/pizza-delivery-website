
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";

type RequireAuthProps = {
  children: JSX.Element;
  allowedRoles?: string[];
};

const RequireAuth = ({ children, allowedRoles }: RequireAuthProps) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();
  
  // Пока идет загрузка информации о пользователе
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  // Если пользователь не авторизован
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  // Если указаны разрешенные роли и роль пользователя не входит в них
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/forbidden" replace />;
  }
  
  return children;
};

export default RequireAuth;
