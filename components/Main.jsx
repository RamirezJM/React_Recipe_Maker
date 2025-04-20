import { useState } from "react"

export default function Main() {

  const [ingredients, setIngredients] = useState([])
  const listItems = ingredients.map(item => (
    <li key={item}>{item}</li>
  ))

  function addIngredient(formData) {
    const newIngredient = formData.get('item')
    setIngredients(prevIngredient => [...prevIngredient, newIngredient])

  }

  return (

    <main>

      <form action={addIngredient}>
        <input type="text" aria-label="add ingredient" placeholder="e.g. meat" name="item" />
        <button type="submit">Add an ingredient</button>
      </form>
      <p className="info">You need to add at least 4 ingredients.</p>
      {ingredients.length > 0 &&
        <section>
        <h2>Ingredients on hand:</h2>
        <ul className="list-items">
          {listItems}
        </ul>
        {ingredients.length > 3 && <div className="recipe">
          <div>
            <h3>Ready for a recipe?</h3>
            <p>Generate a recipe from your list of ingredients.</p>
          </div>
          <button>Get a recipe</button>
        </div>}
      </section>}
    </main>
  )
}