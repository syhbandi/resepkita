import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useAuth } from "@/context/authContext";

const Home = () => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <SafeAreaView>
      <StatusBar style="dark" />
      <Text onPress={handleLogout}>Home</Text>
    </SafeAreaView>
  );
};

export default Home;
