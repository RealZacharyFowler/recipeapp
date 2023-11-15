import { FormEvent, useState } from "react";
import "./App.css";
import { Recipe } from "./types";
import * as api from "./api";
import RecipeCard from "./components/RecipeCard";

// src/App.tsx
const App = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const pageNumber = useRef(1);

  const handleSearchSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const recipes = await api.searchRecipes(searchTerm, 1);
      setRecipes(recipes.results);
      pageNumber.current = 1;
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearchSubmit}>
      <input
          type="text"
          required
          placeholder="Enter a search term"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      {recipes.map((recipe) => (
      <RecipeCard key={recipe.id} recipe={recipe} />
    ))}
    <button className="view-more" onClick={handleViewMoreClick}>
  View More
</button>;
    </div>
  );
};

export default App;
