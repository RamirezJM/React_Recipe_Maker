import { useState } from "react"
import IngredientsList from "./IngredientsList"
import ClaudeRecipe from "./ClaudeRecipe"
import { getRecipeFromMistral } from "../ai"


export default function Main() {
  

  const [ingredients, setIngredients] = useState([])

  const [recipe, setRecipe] = useState('')

  function addIngredient(formData) {
    const newIngredient = formData.get('item')
    setIngredients(prevIngredient => [...prevIngredient, newIngredient])

  }

  async function getRecipe() {
    const recipeMarkdown = await getRecipeFromMistral(ingredients)
    setRecipe(recipeMarkdown)
  }

  return (

    <main>

      <form action={addIngredient}>
        <input type="text" aria-label="add ingredient" placeholder="e.g. meat" name="item" />
        <button type="submit">Add an ingredient</button>
      </form>
      <p className="info">You need to add at least 4 ingredients.</p>
      {ingredients.length > 0 && <IngredientsList getRecipe = {getRecipe} ingredients ={ingredients}/>}

      {recipe && <ClaudeRecipe recipe={recipe} />}
    </main>
  )
}