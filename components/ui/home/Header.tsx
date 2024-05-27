import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useAuth } from "@/context/authContext";
import { Feather } from "@expo/vector-icons";

const Header = () => {
  const { user, loading } = useAuth();
  return (
    <View className="px-5 my-5">
      <View className="mb-5 flex-row items-center justify-between">
        <View>
          <Text className="font-[poppinsSemiBold] text-neutral-800 text-xl">
            Hi, {user?.username?.split(" ")[0]}
          </Text>
          <Text className="font-[poppinsMedium] text-neutral-400">
            What do you want to cook today?
          </Text>
        </View>
      </View>
      <TouchableOpacity className="flex-row space-x-3 items-center border border-neutral-300 rounded-xl h-11 px-2">
        <Feather name="search" size={20} color={"gray"} />
        <Text className="font-[poppinsMedium] text-neutral-400">
          Search recipes
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Header;
