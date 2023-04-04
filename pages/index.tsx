import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useState } from "react";
const { Configuration, OpenAIApi } = require("openai");

const config = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [ingredients, setIngredients] = useState("");
  const [recipes, setRecipes] = useState([]);

  const generateRecipes = async () => {
    try {
      const { data } = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Escribe una receta basandote en estos ingredientes: ${ingredients} y calcula las calorias`,
        temperature: 0.3,
        max_tokens: 1200,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      });
      const recipes = data.choices[0]?.text.trim().split("\n");
      console.log(recipes);
      setRecipes(recipes);
    } catch (error) {
      console.error(error);
    }
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
      <main className={styles.main}>
        <div className={styles.description}>
          <div>
            <h1>Recipe Generator</h1>
            <input
              type="text"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
            />
            <button onClick={generateRecipes}>Buscar Receta</button>
            {recipes.length > 0 && (
              <div>
                <h2>Recetas</h2>
                <ul>
                  {recipes.map((recipe, index) => (
                    <li key={index}>{recipe}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
