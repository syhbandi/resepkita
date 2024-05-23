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

const signIn = () => {
  const { loading, isAuthenticated, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (loading) return;
    if (!email || !password) {
      Alert.alert("Oops!", "Input tidak lengkap");
      return;
    }
    await login(email, password);
  };

  if (isAuthenticated) return <Redirect href={"/(app)"} />;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="min-h-screen px-5 items-center justify-center">
          <Text className="text-3xl font-[poppinsSemiBold] text-neutral-800 mb-5">
            Login
          </Text>
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
          <TouchableOpacity className="self-end my-3">
            <Text className="font-[poppins] text-neutral-600">
              Lupa Password?
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`bg-red-600 h-12 rounded-xl items-center justify-center w-full mb-5`}
            onPress={handleLogin}
          >
            {loading ? (
              <ActivityIndicator size={30} color={"white"} />
            ) : (
              <Text className="text-white font-[poppinsSemiBold] text-base">
                Login
              </Text>
            )}
          </TouchableOpacity>
          <Text className="font-[poppins] text-neutral-800 text-center">
            Belum punya akun?{" "}
            <Link
              href={"sign-up"}
              className="font-[poppinsSemiBold] text-red-600"
            >
              Daftar
            </Link>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default signIn;
