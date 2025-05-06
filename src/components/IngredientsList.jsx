import Loader from "./Loader"

export default function IngredientsList({getRecipe, ingredients, loading, ref}){
    const listItems = ingredients.map(item => (
      <li key={item}>{item}</li> 
     
    ))
  
  return(
    <section>
    <h2>Ingredients on hand:</h2>
    <ul className="list-items">
      {listItems}
    </ul>
    {ingredients.length> 3 && <div className="recipe">
      <div ref={ref}> 
        <h3>Ready for a recipe?</h3>
        <p>Generate a recipe from your list of ingredients.</p>
      </div>
      {loading && <Loader/>                                                                                                                                                                                       }
      <button onClick={getRecipe} disabled={loading}>{loading ? 'Thinking recipe...': 'Get a Recipe'}</button>
    </div>}
  </section>
    
  )
}