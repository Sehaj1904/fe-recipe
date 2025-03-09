import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { getAllRecipes, updateRecipe, getRandomRecipe } from "../api/recipes";
import { Recipe } from "../types/Recipe";
import styles from "../styles/RecipeList.module.css";

const RecipeList: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (selectedRecipe) {
      alert(
        `Selected Recipe: ${selectedRecipe.title}\nCategory: ${selectedRecipe.category}`
      );
    }
  }, [selectedRecipe]);

  console.log("[test] recipes", recipes);

  useEffect(() => {
    loadRecipes();
  }, []);

  const loadRecipes = async () => {
    try {
      setError("");
      const data = await getAllRecipes();
      setRecipes(data);
    } catch (err) {
      setError("Failed to load recipes. Please try again later.");
      console.error(
        "Error loading recipes:",
        err instanceof Error ? err.message : "Unknown error"
      );
    }
  };

  const handleDragEnd = async (result: any) => {
    if (!result.destination) return;

    try {
      const items = Array.from(recipes);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);

      const updatedItems = items.map((item, index) => ({
        ...item,
        order: index,
      }));

      setRecipes(updatedItems);

      await updateRecipe(reorderedItem._id, {
        order: result.destination.index,
      });
    } catch (err) {
      console.error(
        "Error updating recipe order:",
        err instanceof Error ? err.message : "Unknown error"
      );
      loadRecipes();
    }
  };

  const handleSurpriseMe = async () => {
    try {
      setError("");
      const randomRecipe = await getRandomRecipe();
      setSelectedRecipe(randomRecipe);
    } catch (err) {
      setError("Failed to get a random recipe. Please try again.");
      console.error(
        "Error getting random recipe:",
        err instanceof Error ? err.message : "Unknown error"
      );
    }
  };

  const categories = [...new Set(recipes.map((recipe) => recipe.category))];

  if (error) {
    return (
      <div className={styles.error}>
        <p>{error}</p>
        <button onClick={loadRecipes} className={styles.retryButton}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <button className={styles.surpriseButton} onClick={handleSurpriseMe}>
        Surprise Me!
      </button>

      <DragDropContext onDragEnd={handleDragEnd}>
        {categories.map((category) => (
          <div key={category} className={styles.category}>
            <h2 className={styles.categoryTitle}>{category}</h2>
            <Droppable droppableId={category}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={styles.recipeList}
                >
                  {recipes
                    .filter((recipe) => recipe.category === category)
                    .sort((a, b) => a.order - b.order)
                    .map((recipe, index) => (
                      <Draggable
                        key={recipe._id}
                        draggableId={recipe._id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`${styles.recipeCard} ${
                              snapshot.isDragging ? styles.dragging : ""
                            }`}
                          >
                            <h3>{recipe.title}</h3>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </DragDropContext>
    </div>
  );
};

export default RecipeList;
