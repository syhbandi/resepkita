import { MealType } from "@/share/types/meal";

export default function getIngredients(meal: MealType | any) {
  if (!meal) return null;
  const ingredientsArray = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];

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
}
