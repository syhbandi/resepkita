import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
  Linking,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { Entypo, Feather, Ionicons } from "@expo/vector-icons";
import useFetch from "@/hooks/useFetch";
import { MealType } from "@/share/types/meal";
import getIngredients from "@/scripts/getIngredients";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";

type MealsType = {
  meals: MealType[];
};

const MealDetail = () => {
  const { mealId } = useLocalSearchParams();
  const { data, loading, error } = useFetch<MealsType>(
    `lookup.php?i=${mealId}`
  );
  const [more, setMore] = useState(false);
  const [meal, setMeal] = useState<MealType | null>(null);
  const [ingredients, setIngredients] = useState<any[] | null>(null);
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    if (data) {
      setMeal(data.meals[0]);
      setIngredients(getIngredients(data.meals[0]));
    }
  }, [data]);

  const handleOpenYT = () => {
    Linking.openURL(meal?.strYoutube!);
  };

  const handleBookmark = async () => {
    await setDoc(
      doc(db, "bookmark", `${mealId}`),
      {
        bookmarked: !bookmarked,
        ...data,
      },
      { merge: true }
    );
  };

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "bookmark", `${mealId}`), (doc) => {
      const data = doc.data();
      if (data?.bookmarked) {
        setBookmarked(true);
      } else {
        setBookmarked(false);
      }
    });
    return unsub;
  });

  return (
    <>
      <Stack.Screen
        options={{
          title: "",
          headerLeft: () => (
            <TouchableOpacity>
              <Feather name="chevron-left" size={24} color={"black"} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity>
              <Entypo name="dots-two-vertical" size={24} color={"black"} />
            </TouchableOpacity>
          ),
          headerShadowVisible: false,
        }}
      />
      {loading ? (
        <View className="flex-1 items-center justify-center bg-white">
          <ActivityIndicator size={"large"} color={"red"} />
        </View>
      ) : error ? (
        <View className="flex-1 items-center justify-center bg-white">
          <Text className="font-[poppinsSemiBold] text-xl">
            Something strange happened, try again
          </Text>
        </View>
      ) : (
        <View className="flex-1 bg-white">
          <ScrollView showsVerticalScrollIndicator={false}>
            <View className="px-5 py-3">
              <Image
                source={{ uri: meal?.strMealThumb }}
                resizeMode="cover"
                className="w-full h-48 rounded-2xl"
              />
              <View className="flex-row justify-between mt-5">
                <Text className="font-[poppinsSemiBold] text-xl text-neutral-800 flex-1">
                  {meal?.strMeal}
                </Text>
                <TouchableOpacity onPress={handleBookmark}>
                  <Ionicons
                    name={bookmarked ? "bookmark" : "bookmark-outline"}
                    size={24}
                    color={"red"}
                  />
                </TouchableOpacity>
              </View>
              <Text className="font-[poppins] text-neutral-400 mb-5">
                {meal?.strCategory} • {meal?.strArea}
              </Text>

              <View className="mb-5">
                <Text className="font-[poppinsMedium] text-lg text-neutral-800 mb-3">
                  Instructions
                </Text>
                <Text className="font-[poppins] text-neutral-700">
                  {more ? (
                    <>
                      <Text>{meal?.strInstructions} </Text>
                      <Text
                        className="font-[poppinsSemiBold] text-red-600"
                        onPress={() => setMore(false)}
                      >
                        Less
                      </Text>
                    </>
                  ) : (
                    <>
                      <Text>{meal?.strInstructions.slice(0, 150) + "..."}</Text>
                      <Text
                        className="font-[poppinsSemiBold] text-red-600"
                        onPress={() => setMore(true)}
                      >
                        Show More
                      </Text>
                    </>
                  )}
                </Text>
              </View>
              <View className="mb-5">
                <Text className="font-[poppinsMedium] text-lg text-neutral-800 mb-3">
                  Ingredients
                </Text>
                {ingredients?.map((res, index) => (
                  <View
                    key={`recipe-${index}`}
                    className="flex-row items-center justify-between border border-neutral-200 rounded-2xl py-3 px-5 my-2"
                  >
                    <Text className="font-[poppinsMedium] text-neutral-600">
                      {res.ingredient}
                    </Text>
                    <Text className="font-[poppinsMedium] text-neutral-600">
                      {res.measure}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </ScrollView>
          <TouchableOpacity
            className="mx-5 mt-3 rounded-2xl bg-red-600 py-3 items-center justify-center"
            onPress={handleOpenYT}
          >
            <Text className="font-[poppinsMedium] text-white">
              Watch Youtube
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default MealDetail;
