/* =======  HUGGINGFACE =========
***** NETLIFY FUNCTION ********
*/

const { HfInference } = require('@huggingface/inference');

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page
`
const hf = new HfInference(import.meta.env.VITE_HF_ACCESS_TOKEN)

exports.handler = async (event, context) => {
  const ingredientsArr = JSON.parse(event.body)?.ingredients || [];
  const ingredientsString = ingredientsArr.join(", ");

  if (!HF_ACCESS_TOKEN) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "HF_ACCESS_TOKEN is not defined in environment variables" }),
    };
  }
  const hf = new HfInference(HF_ACCESS_TOKEN);

  try {
    const response = await hf.chatCompletion({
      model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` },
      ],
      max_tokens: 1024,
    });
    const recipe = response.choices[0].message.content;
    return {
      statusCode: 200,
      body: JSON.stringify({ recipe }),
    };
  } catch (err) {
    console.error("Error from Hugging Face:", err.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to get recipe from Hugging Face" }),
    };
  }
};






/*netlify function */

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