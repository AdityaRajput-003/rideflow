import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as SecureStore from 'expo-secure-store';
import { useRouter } from 'expo-router';

export default function LoginScreen() {

    const router = useRouter();

  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
  if (mobile.trim() === '') {
    setError('Mobile number is required');
    return;
  }

  if (!/^[6-9]\d{9}$/.test(mobile.trim())) {
    setError('Enter a valid 10-digit mobile number');
    return;
  }

  if (password.trim() === '') {
    setError('Password is required');
    return;
  }

  try {
    const response = await fetch(
      'http://192.168.29.181:5000/api/auth/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mobile: mobile.trim(),
          password: password,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      setError(data.message || 'Login failed');
      return;
    }

    await SecureStore.setItemAsync('authToken', data.token);

        console.log('Login successful:', data);

        router.replace('/home');

  } catch (error) {
    console.error('Login error:', error);
    setError('Unable to connect to server');
  }
};

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>

        <Text style={styles.title}>Welcome back</Text>

        <Text style={styles.subtitle}>
          Log in to continue with RideFlow.
        </Text>

        <View style={styles.form}>

          <TextInput
            style={styles.input}
            placeholder="Mobile number"
            keyboardType="phone-pad"
            value={mobile}
            onChangeText={setMobile}
            maxLength={10}
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          {error !== '' && (
            <Text style={styles.error}>
            {error}
     </Text>
)}

          <Pressable
                style={styles.button}
                onPress={handleLogin}
>
            <Text style={styles.buttonText}>
              Log In
            </Text>
          </Pressable>

        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 50,
  },

  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 35,
  },

  form: {
    gap: 16,
  },

  input: {
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 15,
    fontSize: 16,
  },

  button: {
    backgroundColor: '#111111',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },

  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  error: {
  color: 'red',
  fontSize: 14,
},

});