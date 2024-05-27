import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { MealType } from "@/share/types/meal";
import { useRouter } from "expo-router";

const MealCard = ({ meal, width }: { meal: MealType; width: number }) => {
  const router = useRouter();

  const handleMealPress = () => {
    router.push(`meal/${meal.idMeal}`);
  };

  return (
    <View className="relative">
      {/* <TouchableOpacity className="absolute top-2 right-2 z-10 h-8 w-8 items-center justify-center rounded-full bg-white">
        <Feather name="bookmark" size={16} color={"red"} />
      </TouchableOpacity> */}
      <TouchableOpacity onPress={handleMealPress} style={{ width }}>
        <Image
          source={{
            uri: meal.strMealThumb,
          }}
          resizeMode="cover"
          className="w-full rounded-2xl"
          style={{ height: width }}
        />
        <View className="p-2">
          <Text
            className="font-[poppinsMedium] text-neutral-800"
            numberOfLines={2}
          >
            {meal.strMeal}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default MealCard;
