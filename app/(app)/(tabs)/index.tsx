import {
  View,
  Text,
  ScrollView,
  Dimensions,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useAuth } from "@/context/authContext";
import Header from "@/components/ui/home/Header";
import Kategori from "@/components/ui/home/Kategori";
import Popular from "@/components/ui/home/Popular";
import Recommended from "@/components/ui/home/Recommended";
import useFetch from "@/hooks/useFetch";
import { MealType } from "@/share/types/meal";
import PopularCard from "@/components/common/card/PopularCard";
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

const Home = () => {
  const [categoryId, setCategoryId] = useState("");
  const { data, loading, error, refetch } = useFetch<MealsType>(
    "/filter.php?c=" + categoryId
  );

  useEffect(() => {
    if (categoryId) refetch();
  }, [categoryId]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />
      <Header />
      <Kategori categoryId={categoryId} setCategoryId={setCategoryId} />
      {loading ? (
        <ActivityIndicator size={"large"} color={"red"} />
      ) : error ? (
        <Text className="font-[poppinsMedium] text-red-600">
          {error.message}
        </Text>
      ) : data?.meals ? (
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
    </SafeAreaView>
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

export default Home;
