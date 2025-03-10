import axios from "axios";
import { Recipe, RecipeFormData } from "../types/Recipe";

export const API_URL = "https://b387-2401-4900-8840-c1d5-99c4-7983-2dc-6d8c.ngrok-free.app/recipes";

export const getAllRecipes = async (): Promise<Recipe[]> => {
  const response = await axios.get(`${API_URL}/recipes`);
  return response.data;
};

export const getRandomRecipe = async (): Promise<Recipe> => {
  const recipes = await getAllRecipes();
  const randomIndex = Math.floor(Math.random() * recipes.length);
  return recipes[randomIndex];
};

export const createRecipe = async (recipe: RecipeFormData): Promise<Recipe> => {
  const response = await axios.post(`${API_URL}/recipes`, recipe);
  return response.data;
};

export const updateRecipe = async (
  id: string,
  recipe: Partial<Recipe>
): Promise<Recipe> => {
  const response = await axios.put(`${API_URL}/recipes/${id}`, recipe);
  return response.data;
};
