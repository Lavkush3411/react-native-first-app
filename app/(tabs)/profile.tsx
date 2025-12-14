import { useAuth } from '@/hooks/useAuth';
import React from 'react'
import { Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const profile = () => {
    const {data: user} = useAuth();
  return (
    <SafeAreaView>
      <Text>profile</Text>
      <Text>{user?.email}</Text>
    </SafeAreaView>
  )
}

export default profile