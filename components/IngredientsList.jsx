export default function IngredientsList({getRecipe, ingredients}){
    const listItems = ingredients.map(item => (
      <li key={item}>{item}</li> 
     
    ))
  
  return(
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
      <button onClick={getRecipe}>Get a recipe</button>
    </div>}
  </section>
    
  )
}