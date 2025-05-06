import { useState, useRef, useEffect} from "react"
import IngredientsList from "./IngredientsList"
import ClaudeRecipe from "./ClaudeRecipe"
import { getAIRecipe } from '../functions/aiRecipe'

export default function Main() {

  const [ingredients, setIngredients] = useState([])
  const [recipe, setRecipe] = useState('')
  const [loading, setLoading] = useState(false)
  const recipeSection = useRef(null)
  
  useEffect(() =>{
    if(recipe !== "" && recipeSection.current !== null){
      recipeSection.current.scrollIntoView({behavior:'smooth'})
    }
  },[recipe])



  function addIngredient(formData) {
    const newIngredient = formData.get('item')
    setIngredients(prevIngredient => [...prevIngredient, newIngredient])

  }

  /******  LOCAL *******/

  async function getRecipe() {
    setLoading(true)
    try {
      const recipeMarkdown = await getAIRecipe(ingredients)
      setRecipe(recipeMarkdown)
    } catch (error) {
      console.error("Failed to fetch recipe:", error);
      setRecipe("Failed to generate recipe.  Please try again."); 
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

      {ingredients.length > 0 && <IngredientsList getRecipe={getRecipe} ingredients={ingredients} loading={loading} ref={recipeSection}/>}

      {recipe && <ClaudeRecipe recipe={recipe} />}
    </main>
  )
}