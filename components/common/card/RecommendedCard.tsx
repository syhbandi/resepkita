import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { MealType } from "@/share/types/meal";
import { Feather } from "@expo/vector-icons";

const RecommendedCard = ({ meal }: { meal: MealType }) => {
  return (
    <View className="relative my-4">
      <TouchableOpacity className="absolute top-2 right-2 z-10 h-8 w-8 items-center justify-center rounded-full bg-white">
        <Feather name="bookmark" size={16} color={"red"} />
      </TouchableOpacity>
      <TouchableOpacity className="flex-1">
        <Image
          source={{
            uri: meal.strMealThumb,
          }}
          resizeMode="cover"
          className="h-36 w-full rounded-2xl mb-3"
        />
        <View>
          <Text className="font-[poppinsMedium] text-neutral-800">
            {meal.strMeal}
          </Text>
          <Text className="font-[poppins] text-neutral-500 text-xs">
            {meal.strArea} • {meal.strCategory}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default RecommendedCard;
