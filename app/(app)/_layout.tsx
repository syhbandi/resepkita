import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import { Redirect, Stack } from "expo-router";
import { useAuth } from "@/context/authContext";

const AppLayout = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading)
    return (
      <View className="flex-1 bg-white items-center justify-center">
        <ActivityIndicator size={40} color={"green"} />
      </View>
    );
  if (!isAuthenticated) return <Redirect href={"/"} />;
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
};

export default AppLayout;
