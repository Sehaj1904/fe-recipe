import React, { useEffect, useState } from "react";
import { createRecipe } from "../api/recipes";
import { RecipeFormData } from "../types/Recipe";
import { Plus, X } from "lucide-react";
import styles from "../styles/RecipeForm.module.css";

const RecipeForm: React.FC = () => {
  const [formData, setFormData] = useState<RecipeFormData>({
    title: "",
    ingredients: [""],
    instructions: "",
    category: "",
  });

  const [errors, setErrors] = useState<Partial<RecipeFormData>>({});

  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/categories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const validateForm = () => {
    const newErrors: Partial<RecipeFormData> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.category.trim()) {
      newErrors.category = "Category is required";
    }

    if (!formData.instructions.trim()) {
      newErrors.instructions = "Instructions are required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await createRecipe(formData);
      setFormData({
        title: "",
        ingredients: [""],
        instructions: "",
        category: "",
      });
      setErrors({});
    } catch (error) {
      console.error("Error creating recipe:", error);
    }
  };

  const handleIngredientChange = (index: number, value: string) => {
    const newIngredients = [...formData.ingredients];
    newIngredients[index] = value;
    setFormData({ ...formData, ingredients: newIngredients });
  };

  const addIngredient = () => {
    setFormData({
      ...formData,
      ingredients: [...formData.ingredients, ""],
    });
  };

  const removeIngredient = (index: number) => {
    const newIngredients = formData.ingredients.filter((_, i) => i !== index);
    setFormData({ ...formData, ingredients: newIngredients });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <label className={styles.label}>Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className={styles.input}
        />
        {errors.title && <span className={styles.error}>{errors.title}</span>}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Category</label>
        <input
          type="text"
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
          className={styles.input}
        />
        {errors.category && (
          <span className={styles.error}>{errors.category}</span>
        )}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Ingredients</label>
        <div className={styles.ingredientList}>
          {formData.ingredients.map((ingredient, index) => (
            <div key={index} className={styles.ingredientItem}>
              <input
                type="text"
                value={ingredient}
                onChange={(e) => handleIngredientChange(index, e.target.value)}
                className={styles.input}
              />
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removeIngredient(index)}
                  className={styles.removeButton}
                >
                  <X size={16} />
                </button>
              )}
            </div>
          ))}
        </div>
        {errors.ingredients && (
          <span className={styles.error}>{errors.ingredients}</span>
        )}
        <button
          type="button"
          onClick={addIngredient}
          className={styles.addButton}
        >
          <Plus size={16} /> Add Ingredient
        </button>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Instructions</label>
        <textarea
          value={formData.instructions}
          onChange={(e) =>
            setFormData({ ...formData, instructions: e.target.value })
          }
          className={styles.textarea}
        />
        {errors.instructions && (
          <span className={styles.error}>{errors.instructions}</span>
        )}
      </div>

      <button type="submit" className={styles.submitButton}>
        Create Recipe
      </button>
    </form>
  );
};

export default RecipeForm;
