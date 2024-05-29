import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useAuth } from "@/context/authContext";
import { Feather } from "@expo/vector-icons";

const profile = () => {
  const { user, logout, loading } = useAuth();

  const handleSignOut = async () => {
    if (loading) return;
    await logout();
  };

  return (
    <View className="flex-1 bg-white px-5 pb-3">
      <View className="mx-auto h-32 w-32 bg-red-600 items-center justify-center rounded-full mb-10">
        <Feather name="user" size={50} color={"white"} />
      </View>

      <View className="py-2 border-b border-neutral-200">
        <Text className="font-[poppins] text-neutral-400 text-xs">
          Username
        </Text>
        <Text className="font-[poppinsMedium] text-neutral-800 text-base">
          {user?.username}
        </Text>
      </View>

      <View className="py-2 border-b border-neutral-200">
        <Text className="font-[poppins] text-neutral-400 text-xs">Email</Text>
        <Text className="font-[poppinsMedium] text-neutral-800 text-base">
          {user?.email}
        </Text>
      </View>

      <TouchableOpacity
        className={`bg-red-600 rounded-xl py-3 flex-row items-center justify-center mt-auto space-x-3 ${
          loading ? "bg-opacity-80" : ""
        }`}
        onPress={handleSignOut}
      >
        {loading ? (
          <Text className="font-[poppinsMedium] text-white">Processing</Text>
        ) : (
          <>
            <Feather name="log-out" size={16} color={"white"} />
            <Text className="font-[poppinsMedium] text-white">Sign Out</Text>
          </>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default profile;
