import React from "react";

type RecipesProps = {
  recipes: string[];
};
const Recipes = ({ recipes }: RecipesProps) => {
	return (
		<div>
			<ul>
				{recipes.map((recipe, index) => {
					return recipe.includes("<h1>") ? (
					<li className="text-xl mt-10" key={index}> {recipe.replace("<h1>", "").replace("</h1>", "")} </li>) 
					:
					(<li key={index}>{recipe}</li>);
				})}
			</ul>
		</div>
	);
};

export default Recipes;
