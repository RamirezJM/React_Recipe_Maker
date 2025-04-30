import Markdown from "react-markdown"

export default function ClaudeRecipe({recipe}){
  return(
    <section aria-live="polite">
      <h2>AI Chef recommends:</h2>
       <Markdown>{recipe}</Markdown>
      </section>
  )
}