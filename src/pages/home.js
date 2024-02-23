
import  { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID.js";
import axios from "axios";

export const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);

  const userID = useGetUserID();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get("http://localhost:3001/recipes");
        setRecipes(response.data);

      } catch (err) {
        console.log(err);
      }
    };

    const fetchSavedRecipe = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/ids/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchRecipe();
    fetchSavedRecipe();
  }, []);



  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put("http://localhost:3001/recipes", {
        recipeID,
        userID,
      });
//should automatically refresh when i save
      setSavedRecipes(response.data.savedRecipes);
    } catch (err) {
      console.log(err);
    }
  };

  const isRecipeSaved = (id) => savedRecipes.includes(id);

  return (
    <div className="home-container">
      <h1 className="home-heading">Discover Amazing Recipes</h1>
      <div className="recipe-list">
        {recipes.map((recipe) => (
          <div key={recipe._id} className="recipe-card">
            <img src={recipe.imageUrl} alt={recipe.name} className="recipe-image" />
            <div className="recipe-details">
              <h2 className="recipe-name">{recipe.name}</h2>
              <p className="recipe-instructions">{recipe.instructions}</p>
              <p className="cooking-time">Cooking Time: {recipe.cookingTime} minutes</p>
              <button
                className={`save-button ${isRecipeSaved(recipe._id) ? "saved" : ""}`}
                onClick={() => saveRecipe(recipe._id)}
                disabled={isRecipeSaved(recipe._id)}
              >
                {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};




