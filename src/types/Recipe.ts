export interface Recipe {
  _id: string;
  title: string;
  ingredients: string[];
  instructions: string;
  category: string;
  order: number;
}

export interface RecipeFormData {
  title: string;
  ingredients: string[];
  instructions: string;
  category: string;
}