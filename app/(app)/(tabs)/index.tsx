import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useAuth } from "@/context/authContext";
import Header from "@/components/ui/home/Header";

const Home = () => {
  const { user } = useAuth();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />
      <Header />
    </SafeAreaView>
  );
};

export default Home;
