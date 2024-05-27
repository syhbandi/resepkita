import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import Header from "@/components/ui/home/Header";
import Kategori from "@/components/ui/home/Kategori";

import MealList from "@/components/ui/home/MealList";

const Home = () => {
  const [categoryId, setCategoryId] = useState("");

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />
      <Header />
      <Kategori categoryId={categoryId} setCategoryId={setCategoryId} />
      <MealList categoryId={categoryId} />
    </SafeAreaView>
  );
};

export default Home;
