import {
  View,
  Text,
  Dimensions,
  ActivityIndicator,
  FlatList,
  StyleSheet,
} from "react-native";
import { MealType } from "@/share/types/meal";
import useFetch from "@/hooks/useFetch";
import { useEffect } from "react";
import MealCard from "@/components/common/card/MealCard";

type MealsType = {
  meals: MealType[];
};

const numColumns = 2; // Jumlah kolom di grid
const screenWidth = Dimensions.get("window").width;
const paddingHorizontal = 20;
const gap = 20;
const itemWidth =
  (screenWidth - paddingHorizontal * 2 - gap * (numColumns - 1)) / numColumns;

const MealList = ({ categoryId }: { categoryId: string }) => {
  const { data, loading, error, refetch } = useFetch<MealsType>(
    "/filter.php?c=" + categoryId
  );

  useEffect(() => {
    if (categoryId) refetch();
  }, [categoryId]);

  if (loading) return <ActivityIndicator size={"large"} color={"red"} />;
  if (error)
    return (
      <Text className="font-[poppinsMedium] text-red-600">{error.message}</Text>
    );

  return (
    <>
      {data?.meals ? (
        <FlatList
          data={data?.meals}
          keyExtractor={(item) => item.idMeal.toString()}
          renderItem={({ item }) => <MealCard meal={item} width={itemWidth} />}
          numColumns={numColumns}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.container}
        />
      ) : (
        <Text className="font-[poppinsMedium] text-neutral-700 text-center py-5">
          We have no data to show right now, try select another category
        </Text>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: paddingHorizontal,
  },
  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: gap,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    borderRadius: 10,
    width: itemWidth,
  },
});

export default MealList;
