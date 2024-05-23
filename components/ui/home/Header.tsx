import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useAuth } from "@/context/authContext";
import { Feather } from "@expo/vector-icons";

const Header = () => {
  const { user } = useAuth();
  return (
    <View className="my-5 px-5">
      <View className="mb-5 flex-row items-center justify-between">
        <View>
          <Text className="font-[poppinsMedium] text-neutral-400 text-base">
            Hai,
          </Text>
          <Text className="font-[poppinsSemiBold] text-neutral-800 text-xl">
            {user?.username}
          </Text>
        </View>
        <TouchableOpacity>
          <Feather name="bell" size={20} color={"black"} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity className="flex-row space-x-3 items-center border border-neutral-300 rounded-xl h-11 px-2">
        <Feather name="search" size={20} color={"gray"} />
        <Text className="font-[poppinsMedium] text-neutral-400">
          Cari Resep
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Header;
