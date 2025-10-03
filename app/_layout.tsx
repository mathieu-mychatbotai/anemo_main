import { Stack } from "expo-router";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { AuthProvider } from './contexts/AuthContext';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({});

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
      <Stack screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#FFFFFF' }
      }}>
        <Stack.Screen name="auth" options={{ headerShown: false }} />
        <Stack.Screen name="index" />
        <Stack.Screen name="memories" options={{ headerShown: true, title: 'My Memories' }} />
      </Stack>
    </AuthProvider>
  );
}
