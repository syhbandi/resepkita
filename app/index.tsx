import { useAuth } from "@/context/authContext";
import { Redirect, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  if (isAuthenticated) return <Redirect href={"/(app)"} />;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex-1  items-center justify-center min-h-screen px-5">
          <Text className="text-3xl font-[poppinsSemiBold] text-center text-neutral-800">
            Memasak seperti seorang Chef
          </Text>
          <Text className="font-[poppins] text-center text-neutral-500 mt-3">
            Jelajahi semua rasa di dunia dengan resep menakjubkan di dapur kamu
            sendiri
          </Text>
          <TouchableOpacity
            className="mt-5 px-10 h-11 bg-red-600 items-center justify-center rounded-xl"
            onPress={() => router.replace("/sign-in")}
          >
            <Text className="text-white font-[poppinsSemiBold]">Mulai</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
