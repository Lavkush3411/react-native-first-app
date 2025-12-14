import { useAuth } from '@/hooks/useAuth';
import { Redirect, Tabs } from 'expo-router';
import React from 'react';
import { Text } from 'react-native';

const _layout = () => {
  const { data: user, isPending } = useAuth();
  if (isPending) {
    return <Text>Loading...</Text>
  }
  if(!user && !isPending){
    console.log('going to login');
    return <Redirect href="/(auth)/login" />
  }

  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
    </Tabs>
  )
}

export default _layout