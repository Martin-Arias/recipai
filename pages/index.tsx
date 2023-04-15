import Head from "next/head";
import { useState } from "react";
import { useGenerateRecipe } from "@/hooks/useGenerateRecipe";
import Loader from "@/components/Loader";
import Recipes from "@/components/Recipes";
import SearchInput from "@/components/SearchInput";

export default function Home() {
	const [ingredients, setIngredients] = useState("");
	const { recipes, isLoading, generateRecipes } = useGenerateRecipe();

	const handleSubmit = async (
		e: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
	) => {
		e.preventDefault();
		await generateRecipes(ingredients);
	};

	return (
		<>
			<Head>
				<title>RecipAI</title>
				<meta
					name="description"
					content="Busca cualquier receta con los ingredientes que tengas"
				/>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className="p-10">
				<SearchInput
					inputValue={ingredients}
					onInputChange={setIngredients}
					isDisabled={isLoading}
					OnSubmit={handleSubmit}
				/>
				{isLoading ? <Loader /> : <Recipes recipes={recipes} />}
			</main>
		</>
	);
}
