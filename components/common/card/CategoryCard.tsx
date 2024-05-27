import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { KategoriType } from "@/components/ui/home/Kategori";

const CategoryCard = ({
  category,
  categoryId,
  setCategoryId,
  index,
  handleScrollToIndex,
}: {
  index: number;
  category: KategoriType;
  categoryId: string;
  setCategoryId: React.Dispatch<React.SetStateAction<string>>;
  handleScrollToIndex: (index: number) => void;
}) => {
  const handleSelect = () => {
    setCategoryId(category.strCategory);
    handleScrollToIndex(index);
  };

  return (
    <TouchableOpacity
      className={`w-20 h-20 items-center border  rounded-xl ${
        category.strCategory === categoryId
          ? "border-red-600"
          : "border-neutral-200"
      }`}
      onPress={handleSelect}
    >
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
