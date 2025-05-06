
export interface ExtraIngredient {
  id: number;
  name: string;
  price: number;
  category: "cheese" | "meat" | "vegetables" | "sauce"; 
}

export const extraIngredients: ExtraIngredient[] = [
  { 
    id: 1, 
    name: "Дополнительный сыр", 
    price: 50, 
    category: "cheese" 
  },
  { 
    id: 2, 
    name: "Пепперони", 
    price: 70, 
    category: "meat" 
  },
  { 
    id: 3, 
    name: "Грибы", 
    price: 40, 
    category: "vegetables" 
  },
  { 
    id: 4, 
    name: "Оливки", 
    price: 30, 
    category: "vegetables" 
  },
  { 
    id: 5, 
    name: "Ветчина", 
    price: 60, 
    category: "meat" 
  },
  { 
    id: 6, 
    name: "Бекон", 
    price: 70, 
    category: "meat" 
  },
  { 
    id: 7, 
    name: "Соус BBQ", 
    price: 20, 
    category: "sauce" 
  },
  { 
    id: 8, 
    name: "Халапеньо", 
    price: 30, 
    category: "vegetables" 
  }
];
