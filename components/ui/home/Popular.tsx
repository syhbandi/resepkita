import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React from "react";
import PopularCard from "@/components/common/card/PopularCard";
import { MealType } from "@/share/types/meal";
import useFetch from "@/hooks/useFetch";

type MealsType = {
  meals: MealType[];
};

const Popular = () => {
  const { data, loading, error } = useFetch<MealsType>("/search.php?s=chicken");
  return (
    <View className="my-5">
      <View className="flex-row items-center justify-between px-5 mb-3">
        <Text className="font-[poppinsSemiBold] text-base text-neutral-800">
          Popular
        </Text>
        <Text className="font-[poppinsMedium] text-red-600">See more</Text>
      </View>
      {loading ? (
        <View className="items-center py-5">
          <ActivityIndicator color={"red"} size={30} />
        </View>
      ) : error ? (
        <Text>an error accoured, please try again</Text>
      ) : (
        <FlatList
          horizontal
          data={data?.meals}
          renderItem={({ item }) => <PopularCard meal={item} />}
          contentContainerStyle={{ columnGap: 10, paddingHorizontal: 20 }}
          pagingEnabled
          snapToAlignment="center"
        />
      )}
    </View>
  );
};

export default Popular;
