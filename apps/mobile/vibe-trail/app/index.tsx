import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

export default function Home() {
  return (
    <SafeAreaView className="flex-1 bg-slate-900">
      <StatusBar style="light" />
      <View className="flex-1 items-center justify-center p-6">
        <View className="mb-8 items-center">
          <Text className="text-4xl font-bold text-white mb-2">Vibe Trail</Text>
          <Text className="text-slate-400 text-lg text-center">
            AI 기반 트레일러닝 가이드
          </Text>
        </View>

        <TouchableOpacity 
          className="w-full bg-emerald-500 py-4 rounded-2xl items-center shadow-lg shadow-emerald-500/50"
          activeOpacity={0.8}
        >
          <Text className="text-white font-bold text-lg">러닝 시작하기</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          className="mt-4 w-full border border-slate-700 py-4 rounded-2xl items-center"
          activeOpacity={0.7}
        >
          <Text className="text-slate-300 font-semibold text-lg">경로 탐색</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
