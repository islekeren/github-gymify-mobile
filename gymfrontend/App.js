// Önce gerekli polyfill'leri import edin
import 'fast-text-encoding';
import 'react-native-get-random-values';
import '@ethersproject/shims';

import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './src/navigation/AuthNavigator';
import MainNavigator from './src/navigation/MainNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import 'react-native-gesture-handler';
import { PrivyProvider } from '@privy-io/expo';
import { createStackNavigator } from '@react-navigation/stack';

import {Inter_400Regular, Inter_500Medium, Inter_600SemiBold} from '@expo-google-fonts/inter';
import {useFonts} from 'expo-font';
import { PrivyElements } from '@privy-io/expo';

const Stack = createStackNavigator();

// Auth context'i oluştur
export const AuthContext = React.createContext();

export default function App() {
  useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });

  return (
    <SafeAreaProvider>
      <PrivyProvider
        appId={'cm6xtnslz00neio2ypzksbfid'}
        clientId={'client-WY5gJhSvTwLZTwzaDjYfKAAasUJoNAgF3eRtK8pNtpMb5'}
      >
        <StatusBar barStyle="light-content" />
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Auth" component={AuthNavigator} />
            <Stack.Screen name="MainNavigator" component={MainNavigator} />
          </Stack.Navigator>
        </NavigationContainer>
        <PrivyElements />
      </PrivyProvider>
    </SafeAreaProvider>
  );
}