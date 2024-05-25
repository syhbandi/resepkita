import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { MealType } from "@/share/types/meal";

const PopularCard = ({ meal }: { meal: MealType }) => {
  return (
    <View className="relative">
      <TouchableOpacity className="absolute top-2 right-2 z-10 h-8 w-8 items-center justify-center rounded-full bg-white">
        <Feather name="bookmark" size={16} color={"red"} />
      </TouchableOpacity>
      <TouchableOpacity className="w-[220]">
        <Image
          source={{
            uri: meal.strMealThumb,
          }}
          resizeMode="cover"
          className="w-full h-32 rounded-2xl"
        />
        <View className="p-2">
          <Text
            className="font-[poppinsMedium] text-neutral-800"
            numberOfLines={1}
          >
            {meal.strMeal}
          </Text>
          <Text className="text-xs text-neutral-500 font-[poppins]">
            {meal.strCategory} • {meal.strArea}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default PopularCard;
