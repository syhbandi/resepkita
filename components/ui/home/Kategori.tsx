import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import useFetch from "@/hooks/useFetch";
import { FlatList } from "react-native";
import CategoryCard from "@/components/common/card/CategoryCard";

type KategorisType = {
  categories: KategoriType[];
};

export type KategoriType = {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
};

const Kategori = () => {
  const { data, loading, error } = useFetch<KategorisType>("/categories.php");

  return (
    <View>
      <View className="flex-row px-5 items-center justify-between mb-3">
        <Text className="text-base font-[poppinsSemiBold] text-neutral-800">
          Category
        </Text>
        <Text className="font-[poppinsMedium] text-red-600">See more</Text>
      </View>
      {loading ? (
        <View className="items-center justify-center h-20">
          <ActivityIndicator size={30} color={"red"} />
        </View>
      ) : error ? (
        <>
          <Text>An error accured, try again </Text>
        </>
      ) : (
        <FlatList
          data={data?.categories}
          horizontal
          renderItem={({ item }) => <CategoryCard category={item} />}
          keyExtractor={(item) => item.idCategory}
          contentContainerStyle={{ columnGap: 10, paddingHorizontal: 20 }}
        />
      )}
    </View>
  );
};

export default Kategori;
