import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect, useRef } from "react";
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

const Kategori = ({
  categoryId,
  setCategoryId,
}: {
  categoryId: string;
  setCategoryId: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { data, loading, error } = useFetch<KategorisType>("/categories.php");
  const flatListRef = useRef<FlatList>(null);

  const handleScrollToIndex = (index: number) => {
    flatListRef.current?.scrollToIndex({
      index,
      animated: true,
      viewOffset: 20,
    });
  };

  useEffect(() => {
    if (data?.categories.length) {
      setCategoryId(data.categories[0].strCategory);
    }
  }, [data]);

  if (loading)
    return (
      <View className="items-center justify-center h-20">
        <ActivityIndicator size="large" color={"red"} />
      </View>
    );

  if (error)
    return (
      <View className="items-center justify-center h-20">
        <Text className="font-[poppinsMedium] text-red-600">
          {error.message}
        </Text>
      </View>
    );

  return (
    <View className="mb-5">
      <FlatList
        ref={flatListRef}
        data={data?.categories}
        horizontal
        renderItem={({ item, index }) => (
          <CategoryCard
            category={item}
            categoryId={categoryId}
            setCategoryId={setCategoryId}
            index={index}
            handleScrollToIndex={handleScrollToIndex}
          />
        )}
        keyExtractor={(item) => item.idCategory}
        contentContainerStyle={{
          columnGap: 10,
          paddingHorizontal: 20,
        }}
      />
    </View>
  );
};

export default Kategori;
