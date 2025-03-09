import React, { useState } from 'react';
import RecipeList from './components/RecipeList';
import RecipeForm from './components/RecipeForm';
import RecipeDetails from './components/RecipeDetails';
import { Recipe } from './types/Recipe';
import './index.css';

function App() {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="app">
      <header style={{ textAlign: 'center', padding: '20px' }}>
        <h1 style={{ color: '#2c3e50', marginBottom: '20px' }}>Recipe Manager</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          style={{
            background: '#3498db',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '6px',
            cursor: 'pointer',
            marginBottom: '20px',
          }}
        >
          {showForm ? 'View Recipes' : 'Add New Recipe'}
        </button>
      </header>

      {showForm ? (
        <RecipeForm />
      ) : (
        <>
          <RecipeList />
          {selectedRecipe && <RecipeDetails recipe={selectedRecipe} />}
        </>
      )}
    </div>
  );
}

export default App;