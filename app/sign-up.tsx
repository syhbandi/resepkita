import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Feather } from "@expo/vector-icons";
import { TextInput } from "react-native";
import { Link, Redirect } from "expo-router";
import { useAuth } from "@/context/authContext";

const signUp = () => {
  const { isAuthenticated, loading, register } = useAuth();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleDaftar = async () => {
    if (!username || !email || !password) {
      Alert.alert("Oops!", "Pastikan data lengkap");
      return;
    }

    if (loading) return;

    await register({ username, email, password });
  };

  if (isAuthenticated) return <Redirect href={"/(app)"} />;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="min-h-screen px-5 items-center justify-center">
          <Text className="text-3xl font-[poppinsSemiBold] text-neutral-800 mb-5">
            Sign Up
          </Text>
          <View className="h-11 flex-row bg-white border border-neutral-300 rounded-xl items-center px-3 mb-3 space-x-2">
            <Feather name="user" size={20} color={"gray"} />
            <TextInput
              placeholder="Username"
              className="flex-1 font-[poppinsMedium]"
              value={username}
              onChangeText={(text) => setUsername(text)}
            />
          </View>
          <View className="h-11 flex-row bg-white border border-neutral-300 rounded-xl items-center px-3 mb-3 space-x-2">
            <Feather name="mail" size={20} color={"gray"} />
            <TextInput
              placeholder="Email"
              className="flex-1 font-[poppinsMedium]"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </View>
          <View className="flex-row h-12 w-full bg-white border border-neutral-300 rounded-xl items-center px-3 space-x-2">
            <Feather name="lock" size={20} color={"gray"} />
            <TextInput
              placeholder="Password"
              textContentType="emailAddress"
              className="flex-1 font-[poppinsMedium]"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Feather
                name={showPassword ? "eye-off" : "eye"}
                color={"gray"}
                size={20}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            className={`bg-red-600 h-12 rounded-xl items-center justify-center w-full my-5`}
            onPress={handleDaftar}
          >
            {loading ? (
              <ActivityIndicator color={"white"} size={30} />
            ) : (
              <Text className="text-white font-[poppinsSemiBold] text-base">
                Sign Up
              </Text>
            )}
          </TouchableOpacity>
          <Text className="font-[poppins] text-neutral-800 text-center">
            Already have an account?{" "}
            <Link
              href={"sign-in"}
              className="font-[poppinsSemiBold] text-red-600"
            >
              Sign In
            </Link>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default signUp;
