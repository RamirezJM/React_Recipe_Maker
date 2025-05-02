import { useState } from "react"
import IngredientsList from "./IngredientsList"
import ClaudeRecipe from "./ClaudeRecipe"
import {getAIRecipe} from '../functions/aiRecipe'



export default function Main() {
  

  const [ingredients, setIngredients] = useState([])
  const [recipe, setRecipe] = useState('')
  const [loading, setLoading] = useState(false)

  function addIngredient(formData) {
    const newIngredient = formData.get('item')
    setIngredients(prevIngredient => [...prevIngredient, newIngredient])

  }

/******  LOCAL *******/

/*   async function getRecipe() {
    setLoading(true)
    try {
      const recipeMarkdown = await getAIRecipe(ingredients)
      setRecipe(recipeMarkdown)
    }  catch (error) {
      console.error("Failed to fetch recipe:", error);
      setRecipe("Failed to generate recipe.  Please try again."); // set error message
    } finally {
      setLoading(false); // Asegura que se ejecute al final
    }
    
  } */

/*******  NETLIFY FUNCTION ********/

async function getRecipe() {
  setLoading(true);
  try {
    const response = await fetch("/.netlify/functions/aiRecipe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ingredients: ingredients }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData?.error || "Failed to fetch recipe.";
      throw new Error(errorMessage);
    }

    const data = await response.json();
    setRecipe(data.recipe);
  } catch (error) {
    console.error("Failed to fetch recipe:", error);
    setRecipe(`Failed to fetch recipe: ${error.message}`);
  } finally {
    setLoading(false);
  }
}

  return (

    <main>

      <form action={addIngredient}>
        <input type="text" aria-label="add ingredient" placeholder="e.g. meat" name="item" />
        <button type="submit">Add an ingredient</button>
      </form>
      <p className="info">You need to add at least 4 ingredients.</p>
     
      {ingredients.length > 0 && <IngredientsList getRecipe = {getRecipe} ingredients ={ingredients} loading={loading}/>}

      {recipe && <ClaudeRecipe recipe={recipe} />}
    </main>
  )
}