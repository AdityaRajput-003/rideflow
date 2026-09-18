import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="register"
        options={{ title: 'Create Account' }}
      />

      <Stack.Screen
        name="explore"
        options={{ title: 'Explore' }}
      />
    </Stack>
  );
}