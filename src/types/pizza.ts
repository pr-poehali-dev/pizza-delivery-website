
export type PizzaSize = "small" | "medium" | "large";

export type PizzaCategory = "classic" | "vegetarian" | "seafood" | "gluten-free";

export type PizzaTag = "spicy" | "meat" | "cheese" | "bbq-sauce" | "mushrooms" | "vegetables" | "seafood";

export interface Pizza {
  id: number;
  name: string;
  description: string;
  category: PizzaCategory;
  image: string;
  prices: {
    [key in PizzaSize]: number;
  };
  tags: PizzaTag[];
  isNew: boolean;
  discount: number;
}
