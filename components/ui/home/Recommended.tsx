import { View, Text, Image, ActivityIndicator } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import useFetch from "@/hooks/useFetch";
import { MealType } from "@/share/types/meal";
import RecommendedCard from "@/components/common/card/RecommendedCard";

type MealsType = {
  meals: MealType[];
};

const Recommended = () => {
  const { data, loading, error } = useFetch<MealsType>("/search.php?s=fish");
  return (
    <View className="px-5">
      <View className="flex-row items-center justify-between mb-3">
        <Text className="font-[poppinsSemiBold] text-base text-neutral-800">
          Recommended
        </Text>
        <Text className="font-[poppinsMedium]  text-red-600">See more</Text>
      </View>
      {loading ? (
        <View className="py-3 items-center justify-center">
          <ActivityIndicator color={"red"} size={30} />
        </View>
      ) : error ? (
        <Text className="py-3 text-center">
          we have some errors, try again{" "}
        </Text>
      ) : (
        <>
          {data?.meals?.map((item, index) => (
            <RecommendedCard meal={item} key={index} />
          ))}
        </>
      )}
    </View>
  );
};

export default Recommended;
