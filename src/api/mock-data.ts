
import { Pizza } from "@/types/pizza";

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
