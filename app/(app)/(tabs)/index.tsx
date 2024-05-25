import { View, Text, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useAuth } from "@/context/authContext";
import Header from "@/components/ui/home/Header";
import Kategori from "@/components/ui/home/Kategori";
import Popular from "@/components/ui/home/Popular";
import Recommended from "@/components/ui/home/Recommended";

const Home = () => {
  const { user } = useAuth();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header />
        <Kategori />
        <Popular />
        <Recommended />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
