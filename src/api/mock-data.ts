import { Pizza } from "@/types/pizza");
import { Order } from "@/types/order";
import { User, UserAddress } from "@/types/user";

// Мок-данные для пицц
export const mockPizzas: Pizza[] = [
  {
    id: 1,
    name: "Пепперони",
    description: "Классическая пицца с томатным соусом, сыром Моцарелла и пикантной пепперони",
    category: "classic",
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=800&auto=format&fit=crop",
    prices: {
      small: 399,
      medium: 599,
      large: 799
    },
    tags: ["meat", "cheese"],
    isNew: false,
    discount: 0
  },
  {
    id: 2,
    name: "Маргарита",
    description: "Традиционная итальянская пицца с томатным соусом, сыром Моцарелла и базиликом",
    category: "vegetarian",
    image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?q=80&w=800&auto=format&fit=crop",
    prices: {
      small: 349,
      medium: 499,
      large: 699
    },
    tags: ["cheese", "vegetables"],
    isNew: false,
    discount: 0
  },
  {
    id: 3,
    name: "Четыре сыра",
    description: "Изысканная пицца с комбинацией сыров: Моцарелла, Горгонзола, Пармезан и Эмменталь",
    category: "vegetarian",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800&auto=format&fit=crop",
    prices: {
      small: 449,
      medium: 649,
      large: 849
    },
    tags: ["cheese"],
    isNew: false,
    discount: 10
  },
  {
    id: 4,
    name: "Барбекю",
    description: "Ароматная пицца с соусом барбекю, курицей, беконом, луком и сыром Моцарелла",
    category: "classic",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=800&auto=format&fit=crop",
    prices: {
      small: 449,
      medium: 649,
      large: 849
    },
    tags: ["meat", "bbq-sauce"],
    isNew: false,
    discount: 0
  },
  {
    id: 5,
    name: "Мексиканская",
    description: "Острая пицца с говяжьим фаршем, перцем халапеньо, томатами, луком и специями",
    category: "classic",
    image: "https://images.unsplash.com/photo-1594007654729-407eedc4fe24?q=80&w=800&auto=format&fit=crop",
    prices: {
      small: 499,
      medium: 699,
      large: 899
    },
    tags: ["meat", "spicy"],
    isNew: false,
    discount: 0
  }
];

// Мок-данные для пользователей
export const mockUsers: User[] = [
  {
    id: "1",
    name: "Иван Иванов",
    email: "ivan@example.com",
    role: "user",
    createdAt: "2023-01-15T10:30:00Z"
  },
  {
    id: "2",
    name: "Мария Петрова",
    email: "maria@example.com",
    role: "user",
    createdAt: "2023-02-20T14:15:00Z"
  },
  {
    id: "3",
    name: "Админ",
    email: "admin@example.com",
    role: "admin",
    createdAt: "2022-12-01T09:00:00Z"
  }
];

// Мок-данные для адресов
export const mockAddresses: UserAddress[] = [
  {
    id: "1",
    userId: "1",
    title: "Дом",
    address: "ул. Ленина, 15, кв. 42",
    city: "Москва",
    postalCode: "123456",
    phone: "+7 (999) 123-45-67",
    isDefault: true
  },
  {
    id: "2",
    userId: "1",
    title: "Работа",
    address: "ул. Профсоюзная, 84, офис 200",
    city: "Москва",
    postalCode: "123789",
    phone: "+7 (999) 123-45-67",
    isDefault: false
  },
  {
    id: "3",
    userId: "2",
    title: "Дом",
    address: "ул. Гагарина, 25, кв. 10",
    city: "Санкт-Петербург",
    postalCode: "198001",
    phone: "+7 (999) 765-43-21",
    isDefault: true
  }
];

// Мок-данные для заказов
export const mockOrders: Order[] = [
  {
    id: "1001",
    userId: "1",
    customerName: "Иван Иванов",
    customerEmail: "ivan@example.com",
    customerPhone: "+7 (999) 123-45-67",
    deliveryAddress: "ул. Ленина, 15, кв. 42",
    items: [
      {
        id: "item-1",
        pizzaId: 1,
        name: "Пепперони",
        size: "medium",
        price: 599,
        quantity: 2,
        image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=800&auto=format&fit=crop"
      },
      {
        id: "item-2",
        pizzaId: 3,
        name: "Четыре сыра",
        size: "large",
        price: 849,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800&auto=format&fit=crop"
      }
    ],
    total: 2047,
    status: "completed",
    createdAt: "2023-11-15T18:30:00Z",
    paymentMethod: "card",
    deliveryTime: "asap"
  },
  {
    id: "1002",
    userId: "1",
    customerName: "Иван Иванов",
    customerEmail: "ivan@example.com",
    customerPhone: "+7 (999) 123-45-67",
    deliveryAddress: "ул. Ленина, 15, кв. 42",
    items: [
      {
        id: "item-3",
        pizzaId: 2,
        name: "Маргарита",
        size: "small",
        price: 349,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?q=80&w=800&auto=format&fit=crop"
      }
    ],
    total: 349,
    status: "completed",
    createdAt: "2023-12-02T12:15:00Z",
    paymentMethod: "cash",
    deliveryTime: "asap"
  },
  {
    id: "1003",
    userId: "2",
    customerName: "Мария Петрова",
    customerEmail: "maria@example.com",
    customerPhone: "+7 (999) 765-43-21",
    deliveryAddress: "ул. Гагарина, 25, кв. 10",
    items: [
      {
        id: "item-4",
        pizzaId: 4,
        name: "Барбекю",
        size: "large",
        price: 849,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=800&auto=format&fit=crop"
      },
      {
        id: "item-5",
        pizzaId: 5,
        name: "Мексиканская",
        size: "medium",
        price: 699,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1594007654729-407eedc4fe24?q=80&w=800&auto=format&fit=crop"
      }
    ],
    total: 1548,
    status: "completed",
    createdAt: "2024-01-05T19:45:00Z",
    paymentMethod: "card",
    deliveryTime: "scheduled",
    scheduledTime: "2024-01-05T20:30:00Z"
  }
];