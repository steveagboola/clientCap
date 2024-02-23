
import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";

export const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = useGetUserID();

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };
 
    fetchSavedRecipes();
  }, [userID]);
  return (
    <div className="saved-recipes-container">
      <h1 className="saved-recipes-heading">Saved Recipes</h1>
      <div className="recipe-list">
        {savedRecipes.map((recipe) => (
          <div key={recipe._id} className="recipe-card">
            <img src={recipe.imageUrl} alt={recipe.name} className="recipe-image" />
            <div className="recipe-details">
              <h2 className="recipe-name">{recipe.name}</h2>
              <p className="recipe-description">{recipe.description}</p>
              <p className="cooking-time">Cooking Time: {recipe.cookingTime} minutes</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


