
import type { Pizza } from "@/types/pizza";

export const pizzas: Pizza[] = [
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
  },
  {
    id: 6,
    name: "Гавайская",
    description: "Сладко-соленая пицца с ветчиной, ананасами и сыром Моцарелла",
    category: "classic",
    image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?q=80&w=800&auto=format&fit=crop",
    prices: {
      small: 449,
      medium: 649,
      large: 849
    },
    tags: ["meat", "cheese"],
    isNew: false,
    discount: 0
  },
  {
    id: 7,
    name: "Грибная",
    description: "Ароматная пицца с шампиньонами, лесными грибами, луком и сыром Моцарелла",
    category: "vegetarian",
    image: "https://images.unsplash.com/photo-1590947132387-155cc02f3212?q=80&w=800&auto=format&fit=crop",
    prices: {
      small: 399,
      medium: 599,
      large: 799
    },
    tags: ["mushrooms", "cheese", "vegetables"],
    isNew: false,
    discount: 0
  },
  {
    id: 8,
    name: "Морская",
    description: "Изысканная пицца с креветками, мидиями, кальмарами и сыром Моцарелла",
    category: "seafood",
    image: "https://images.unsplash.com/photo-1625740822008-e45abf4e01d0?q=80&w=800&auto=format&fit=crop",
    prices: {
      small: 549,
      medium: 749,
      large: 949
    },
    tags: ["seafood", "cheese"],
    isNew: true,
    discount: 0
  },
  {
    id: 9,
    name: "Вегетарианская",
    description: "Легкая пицца с баклажанами, цуккини, болгарским перцем, томатами и оливками",
    category: "vegetarian",
    image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?q=80&w=800&auto=format&fit=crop",
    prices: {
      small: 399,
      medium: 599,
      large: 799
    },
    tags: ["vegetables"],
    isNew: false,
    discount: 15
  },
  {
    id: 10,
    name: "Карбонара",
    description: "Классическая пицца с соусом на основе сливок, беконом, яйцом и сыром Пармезан",
    category: "classic",
    image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=800&auto=format&fit=crop",
    prices: {
      small: 499,
      medium: 699,
      large: 899
    },
    tags: ["meat", "cheese"],
    isNew: false,
    discount: 0
  },
  {
    id: 11,
    name: "Супер Мясная",
    description: "Сытная пицца с пятью видами мяса: пепперони, ветчина, бекон, курица и говядина",
    category: "classic",
    image: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?q=80&w=800&auto=format&fit=crop",
    prices: {
      small: 549,
      medium: 749,
      large: 949
    },
    tags: ["meat", "cheese"],
    isNew: false,
    discount: 0
  },
  {
    id: 12,
    name: "Безглютеновая Классика",
    description: "Пицца на безглютеновом тесте с томатным соусом, сыром Моцарелла и оливками",
    category: "gluten-free",
    image: "https://images.unsplash.com/photo-1595708684082-a173bb3a06c5?q=80&w=800&auto=format&fit=crop",
    prices: {
      small: 449,
      medium: 649,
      large: 849
    },
    tags: ["cheese", "vegetables"],
    isNew: true,
    discount: 0
  }
];
