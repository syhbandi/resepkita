import { MealType } from "@/share/types/meal";
import { useMemo } from "react";

const useIngredients = (recipe: MealType | any) => {
  if (!recipe) return null;
  return useMemo(() => {
    const ingredientsArray = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];

      if (
        ingredient &&
        ingredient.trim() !== "" &&
        measure &&
        measure.trim() !== ""
      ) {
        ingredientsArray.push({ ingredient, measure });
      }
    }
    return ingredientsArray;
  }, [recipe]);
};

export default useIngredients;
