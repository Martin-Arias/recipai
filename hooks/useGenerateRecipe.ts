import { useState } from "react";
const { Configuration, OpenAIApi } = require("openai");

const config = new Configuration({
	apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

export const useGenerateRecipe = () => {

	const [recipes, setRecipes] = useState<string[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const generateRecipes = async (ingredients: string
	) => {

		try {
			setIsLoading(true);
			const { data } = await openai.createCompletion({
				model: "text-davinci-003",
				prompt: `Escribe 2 recetas basandote en estos ingredientes: ${ingredients} y calcula las calorias. No tengas en cuenta ingredientes que no sean comestibles,toxicos o drogas. Pon el nombre de cada con la etiqueta html h1`,
				temperature: 0.3,
				max_tokens: 1200,
				top_p: 1.0,
				frequency_penalty: 0.0,
				presence_penalty: 0.0,
			});
			const recipes = data.choices[0]?.text.trim().split("\n");
			setIsLoading(false);
			setRecipes(recipes);
		} catch (error) {
			console.error(error);
		}
	};
	return {
		recipes,
		isLoading,
		generateRecipes
	}
}
