import useLogin from '@/hooks/useLogin';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const login = () => {
    const router = useRouter();
    const [email, setEmail] = useState('superadmin@example.com');
    const [password, setPassword] = useState('Amit@123');
    const [organizationId, setOrganizationId] = useState('00000');

    const { mutateAsync: login } = useLogin();
    const handleLogin = async () => {
      const response = await login({ email, password, organizationId });
      console.log('response', response);
    }
  return (
    <SafeAreaView style={styles.container}>
      <Text>login page</Text>
      <TextInput value={email} onChangeText={setEmail} placeholder='Email' style={styles.input} />
      <TextInput value={password} onChangeText={setPassword} placeholder='Password' style={styles.input} />
      <TextInput value={organizationId} onChangeText={setOrganizationId} placeholder='Organization' style={styles.input} />
      <Pressable style={styles.button} onPress={handleLogin}>
        <Text>Login</Text>
      </Pressable>
      <Pressable onPress={() => router.push('/(tabs)/profile')}>
  <Text>Go Profile</Text>
</Pressable>
    </SafeAreaView>
  )
}

export default login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
  },
  button: {
    width: '100%',
    height: 40,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});