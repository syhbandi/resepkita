import React from "react";
import { Tabs } from "expo-router";
import { Feather } from "@expo/vector-icons";

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarLabelStyle: { fontFamily: "poppinsSemiBold" },
        tabBarActiveTintColor: "red",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="home" size={20} color={color} />
          ),
          title: "Home",
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="resep"
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="list" size={20} color={color} />
          ),
          title: "Resep",
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="favorit"
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="heart" size={20} color={color} />
          ),
          title: "Favorit",
        }}
      />
      <Tabs.Screen
        name="profil"
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="user" size={20} color={color} />
          ),
          title: "Profil",
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
