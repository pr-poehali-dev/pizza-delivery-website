
export interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  createdAt: string;
}

export interface UserAddress {
  id: string;
  userId: string;
  title: string;  // Например: "Дом", "Работа"
  address: string;
  city: string;
  postalCode: string;
  phone: string;
  isDefault: boolean;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  name: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}
