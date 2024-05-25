import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { KategoriType } from "@/components/ui/home/Kategori";

const CategoryCard = ({ category }: { category: KategoriType }) => {
  return (
    <TouchableOpacity className="w-20 items-center border border-neutral-200 rounded-xl">
      <Image
        source={{ uri: category.strCategoryThumb }}
        resizeMode="contain"
        className="h-12 w-12 rounded-full"
      />
      <Text
        className="font-[poppinsMedium] text-center text-xs text-neutral-500 m-2"
        numberOfLines={1}
      >
        {category.strCategory}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryCard;
