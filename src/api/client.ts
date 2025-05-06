/**
 * API клиент для взаимодействия с бэкендом
 */

import { Pizza } from "@/types/pizza";
import { mockPizzas } from "@/api/mock-data";
import { Order } from "@/types/order";
import { User, UserAddress } from "@/types/user";
import { mockOrders, mockUsers, mockAddresses } from "@/api/mock-data";

// Базовый URL API
const API_BASE_URL = import.meta.env.VITE_API_URL || "https://api.pizzadelivery.ru/api";

// Время имитации задержки сети для мок-данных (мс)
const MOCK_DELAY = 500;

/**
 * Имитация HTTP запроса с задержкой
 */
const mockFetch = <T>(data: T): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, MOCK_DELAY);
  });
};

/**
 * API для работы с пиццами
 */
export const pizzaApi = {
  // Получение всех пицц
  getAll: async (): Promise<Pizza[]> => {
    // В реальном проекте здесь будет запрос к API
    // return fetch(`${API_BASE_URL}/pizzas`).then(res => res.json());
    
    // Мок-данные для демонстрации
    return mockFetch(mockPizzas);
  },
  
  // Получение пиццы по ID
  getById: async (id: number): Promise<Pizza | null> => {
    // return fetch(`${API_BASE_URL}/pizzas/${id}`).then(res => res.json());
    
    // Мок-данные
    const pizza = mockPizzas.find(p => p.id === id) || null;
    return mockFetch(pizza);
  },
  
  // Создание новой пиццы (для админки)
  create: async (pizza: Omit<Pizza, "id">): Promise<Pizza> => {
    // return fetch(`${API_BASE_URL}/pizzas`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(pizza)
    // }).then(res => res.json());
    
    // Мок-данные
    const newPizza: Pizza = {
      ...pizza,
      id: mockPizzas.length + 1
    };
    return mockFetch(newPizza);
  },
  
  // Обновление пиццы (для админки)
  update: async (id: number, pizza: Partial<Pizza>): Promise<Pizza> => {
    // return fetch(`${API_BASE_URL}/pizzas/${id}`, {
    //   method: 'PATCH',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(pizza)
    // }).then(res => res.json());
    
    // Мок-данные
    const pizzaIndex = mockPizzas.findIndex(p => p.id === id);
    if (pizzaIndex === -1) {
      throw new Error(`Pizza with id ${id} not found`);
    }
    
    const updatedPizza: Pizza = {
      ...mockPizzas[pizzaIndex],
      ...pizza
    };
    return mockFetch(updatedPizza);
  },
  
  // Удаление пиццы (для админки)
  delete: async (id: number): Promise<void> => {
    // return fetch(`${API_BASE_URL}/pizzas/${id}`, {
    //   method: 'DELETE'
    // }).then(() => undefined);
    
    // Мок-данные
    return mockFetch(undefined);
  }
};

/**
 * API для работы с заказами
 */
export const orderApi = {
  // Создание заказа
  create: async (order: Omit<Order, "id" | "status" | "createdAt">): Promise<Order> => {
    // return fetch(`${API_BASE_URL}/orders`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(order)
    // }).then(res => res.json());
    
    // Мок-данные
    const newOrder: Order = {
      ...order,
      id: Math.floor(Math.random() * 10000).toString(),
      status: "pending",
      createdAt: new Date().toISOString()
    };
    return mockFetch(newOrder);
  },
  
  // Получение всех заказов (для админки)
  getAll: async (): Promise<Order[]> => {
    // return fetch(`${API_BASE_URL}/orders`).then(res => res.json());
    
    // Мок-данные
    return mockFetch([]);
  },
  
  // Получение заказа по ID
  getById: async (id: string): Promise<Order | null> => {
    // return fetch(`${API_BASE_URL}/orders/${id}`).then(res => res.json());
    
    // Мок-данные
    return mockFetch(null);
  },
  
  // Обновление статуса заказа (для админки)
  updateStatus: async (id: string, status: Order["status"]): Promise<Order> => {
    // return fetch(`${API_BASE_URL}/orders/${id}/status`, {
    //   method: 'PATCH',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ status })
    // }).then(res => res.json());
    
    // Мок-данные
    return mockFetch({
      id,
      status,
      customerName: "Тестовый пользователь",
      customerEmail: "test@example.com",
      customerPhone: "+7 (999) 999-99-99",
      deliveryAddress: "Тестовый адрес",
      items: [],
      total: 0,
      createdAt: new Date().toISOString()
    });
  },
  // Получение заказов пользователя
  getUserOrders: async (userId: string): Promise<Order[]> => {
    // return fetch(`${API_BASE_URL}/users/${userId}/orders`).then(res => res.json());
    
    // Мок-данные
    return mockFetch(mockOrders.filter(order => order.userId === userId));
  },
  
  // Повторение заказа
  repeatOrder: async (orderId: string): Promise<Order> => {
    // return fetch(`${API_BASE_URL}/orders/${orderId}/repeat`, {
    //   method: 'POST'
    // }).then(res => res.json());
    
    // Мок-данные
    const order = mockOrders.find(o => o.id === orderId);
    if (!order) {
      throw new Error("Order not found");
    }
    
    const newOrder: Order = {
      ...order,
      id: Math.floor(Math.random() * 10000).toString(),
      status: "pending",
      createdAt: new Date().toISOString()
    };
    
    return mockFetch(newOrder);
  }
};

/**
 * API для аутентификации и управления пользователями
 */
export const authApi = {
  // Вход в систему
  login: async (email: string, password: string): Promise<{ token: string; user: { id: string; email: string; role: string } }> => {
    // return fetch(`${API_BASE_URL}/auth/login`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email, password })
    // }).then(res => res.json());
    
    // Мок-данные для демонстрации
    if (email === "admin@example.com" && password === "admin") {
      return mockFetch({
        token: "mock-jwt-token",
        user: {
          id: "1",
          email: "admin@example.com",
          role: "admin"
        }
      });
    }
    
    throw new Error("Неверный email или пароль");
  },
  
  // Выход из системы
  logout: async (): Promise<void> => {
    // return fetch(`${API_BASE_URL}/auth/logout`, {
    //   method: 'POST'
    // }).then(() => undefined);
    
    // Мок-данные
    return mockFetch(undefined);
  },
  // Регистрация нового пользователя
  register: async (email: string, password: string, name: string): Promise<{ token: string; user: User }> => {
    // return fetch(`${API_BASE_URL}/auth/register`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email, password, name })
    // }).then(res => res.json());
    
    // Мок-данные
    // Проверка, существует ли пользователь с таким email
    if (mockUsers.some(user => user.email === email)) {
      throw new Error("Пользователь с таким email уже существует");
    }
    
    const newUser: User = {
      id: (mockUsers.length + 1).toString(),
      email,
      name,
      role: "user",
      createdAt: new Date().toISOString()
    };
    
    // Добавляем пользователя в мок-данные
    mockUsers.push(newUser);
    
    return mockFetch({
      token: "mock-jwt-token-" + newUser.id,
      user: newUser
    });
  }
};

/**
 * API для работы с адресами пользователей
 */
export const addressApi = {
  // Получение адресов пользователя
  getUserAddresses: async (userId: string): Promise<UserAddress[]> => {
    // return fetch(`${API_BASE_URL}/users/${userId}/addresses`).then(res => res.json());
    
    // Мок-данные
    return mockFetch(mockAddresses.filter(address => address.userId === userId));
  },
  
  // Добавление адреса
  addAddress: async (userId: string, address: Omit<UserAddress, "id" | "userId">): Promise<UserAddress> => {
    // return fetch(`${API_BASE_URL}/users/${userId}/addresses`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(address)
    // }).then(res => res.json());
    
    // Мок-данные
    const newAddress: UserAddress = {
      ...address,
      id: (mockAddresses.length + 1).toString(),
      userId,
      isDefault: address.isDefault || false
    };
    
    // Если новый адрес по умолчанию, сбрасываем предыдущий адрес по умолчанию
    if (newAddress.isDefault) {
      mockAddresses.forEach(addr => {
        if (addr.userId === userId && addr.isDefault) {
          addr.isDefault = false;
        }
      });
    }
    
    mockAddresses.push(newAddress);
    return mockFetch(newAddress);
  },
  
  // Обновление адреса
  updateAddress: async (addressId: string, data: Partial<UserAddress>): Promise<UserAddress> => {
    // return fetch(`${API_BASE_URL}/addresses/${addressId}`, {
    //   method: 'PATCH',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data)
    // }).then(res => res.json());
    
    // Мок-данные
    const addressIndex = mockAddresses.findIndex(a => a.id === addressId);
    if (addressIndex === -1) {
      throw new Error("Address not found");
    }
    
    const updatedAddress = {
      ...mockAddresses[addressIndex],
      ...data
    };
    
    // Если обновленный адрес становится адресом по умолчанию, сбрасываем остальные
    if (data.isDefault) {
      mockAddresses.forEach(addr => {
        if (addr.userId === updatedAddress.userId && addr.id !== addressId && addr.isDefault) {
          addr.isDefault = false;
        }
      });
    }
    
    mockAddresses[addressIndex] = updatedAddress;
    return mockFetch(updatedAddress);
  },
  
  // Удаление адреса
  deleteAddress: async (addressId: string): Promise<void> => {
    // return fetch(`${API_BASE_URL}/addresses/${addressId}`, {
    //   method: 'DELETE'
    // }).then(() => undefined);
    
    // Мок-данные
    const addressIndex = mockAddresses.findIndex(a => a.id === addressId);
    if (addressIndex !== -1) {
      mockAddresses.splice(addressIndex, 1);
    }
    
    return mockFetch(undefined);
  }
};