import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Stack } from "expo-router";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { MealType } from "@/share/types/meal";
import MealCard from "@/components/common/card/MealCard";

type RecipeType = {
  bookmarked: boolean;
  meal: MealType;
};

const numColumns = 2; // Jumlah kolom di grid
const screenWidth = Dimensions.get("window").width;
const paddingHorizontal = 20;
const gap = 20;
const itemWidth =
  (screenWidth - paddingHorizontal * 2 - gap * (numColumns - 1)) / numColumns;

const Saved = () => {
  const [recipes, setRecipes] = useState<RecipeType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any | null>(null);

  useEffect(() => {
    const q = query(
      collection(db, "bookmark"),
      where("bookmarked", "==", true),
      orderBy("dateAdd", "desc")
    );
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const newData: any = [];
        querySnapshot.forEach((data) => {
          newData.push(data.data());
        });
        setRecipes(newData);
        setLoading(false);
      },
      (error) => {
        setError(error);
        setLoading(false);
        console.log(error);
      }
    );

    return unsubscribe;
  }, []);

  if (loading)
    return (
      <View className="flex-1 bg-white items-center justify-center">
        <ActivityIndicator size={"large"} color={"red"} />
      </View>
    );

  if (error)
    return (
      <View className="flex-1 bg-white items-center justify-center">
        <Text className="font-[poppinsMedium] text-red-600">
          An error accured, please try again{" "}
        </Text>
      </View>
    );

  if (!recipes.length)
    return (
      <View className="flex-1 bg-white items-center justify-center">
        <Text className="font-[poppinsMedium] text-neutral-800">
          No saved recipes
        </Text>
      </View>
    );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.meal.idMeal.toString()}
        renderItem={({ item }) => (
          <MealCard meal={item.meal} width={itemWidth} />
        )}
        numColumns={numColumns}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.container}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: paddingHorizontal,
    marginTop: 20,
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

export default Saved;
