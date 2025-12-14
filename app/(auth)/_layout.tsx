import { useAuth } from '@/hooks/useAuth';
import { Stack } from 'expo-router';
import React from 'react';

const _layout = () => {
  return (
   <Stack screenOptions={{ headerShown: false }}>
    <Stack.Screen  name="login" options={{ title: 'Login' }} />
   </Stack>
  )
}

export default _layout