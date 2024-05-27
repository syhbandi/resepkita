import MealCard from "@/components/common/card/MealCard";
import useFetch from "@/hooks/useFetch";
import { MealType } from "@/share/types/meal";
import { Feather } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  FlatList,
} from "react-native";
import { TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDebounce } from "use-debounce";

type MealsType = {
  meals: MealType[];
};

const numColumns = 2; // Jumlah kolom di grid
const screenWidth = Dimensions.get("window").width;
const paddingHorizontal = 20;
const gap = 20;
const itemWidth =
  (screenWidth - paddingHorizontal * 2 - gap * (numColumns - 1)) / numColumns;

const Search = () => {
  const [name, setName] = useState("");
  const [debouncedName] = useDebounce(name, 1000);
  const { data, loading, error } = useFetch<MealsType>(
    "/search.php?s=" + debouncedName
  );

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
  if (!data?.meals)
    return (
      <View className="flex-1 bg-white items-center justify-center">
        <Text className="font-[poppinsMedium] text-neutral-600">
          We got nothing here, try another food
        </Text>
      </View>
    );

  return (
    <View className="flex-1 bg-white">
      <Stack.Screen
        options={{
          header: () => (
            <SafeAreaView className="bg-white px-5 py-3">
              <View className="flex-row items-center py-2 px-3 space-x-3 bg-neutral-100 rounded-xl border border-neutral-200 ">
                <Feather name="search" size={20} color={"gray"} />
                <TextInput
                  className="flex-1 font-[poppinsMedium]"
                  placeholder="Search food name"
                  value={name}
                  onChangeText={(text) => setName(text)}
                  inputMode="search"
                  autoFocus={true}
                />
              </View>
            </SafeAreaView>
          ),
        }}
      />
      <FlatList
        data={data?.meals}
        keyExtractor={(item) => item.idMeal.toString()}
        renderItem={({ item }) => <MealCard meal={item} width={itemWidth} />}
        numColumns={numColumns}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.container}
      />
    </View>
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
});

export default Search;
