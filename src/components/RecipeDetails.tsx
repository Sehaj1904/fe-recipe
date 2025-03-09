import React from 'react';
import { Recipe } from '../types/Recipe';
import styles from '../styles/RecipeDetails.module.css';

interface RecipeDetailsProps {
  recipe: Recipe;
}

const RecipeDetails: React.FC<RecipeDetailsProps> = ({ recipe }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{recipe.title}</h1>
      <span className={styles.category}>{recipe.category}</span>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Ingredients</h2>
        <ul className={styles.ingredientsList}>
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index} className={styles.ingredient}>
              {ingredient}
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Instructions</h2>
        <div className={styles.instructions}>{recipe.instructions}</div>
      </div>
    </div>
  );
};

export default RecipeDetails;