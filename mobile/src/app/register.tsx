import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {useState} from 'react';


export default function RegisterScreen() {
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Create your account</Text>

        <Text style={styles.subtitle}>
          Register with RideFlow to book your rides.
        </Text>

        <TextInput
             style={styles.input}
            placeholder="Enter your name"
             value={name}
            onChangeText={setName}
/>
        <TextInput
            style={styles.input}
            placeholder="Enter your mobile number"
            value={mobile}
            onChangeText={setMobile}
            keyboardType="phone-pad"
/>
        <TextInput
            style={styles.input}
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
/>
        <TextInput
            style={styles.input}
            placeholder="Confirm your password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
/>
        <Pressable
            style={styles.button}
            onPress={() => {
            console.log(name);
            console.log(mobile);
            console.log(password);
            console.log(confirmPassword);
  }}
>
  <Text style={styles.buttonText}>Register</Text>
</Pressable>
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
    justifyContent: 'center',
    paddingHorizontal: 24,
  },

  title: {
    fontSize: 30,
    fontWeight: '700',
    marginBottom: 12,
  },

  subtitle: {
    fontSize: 16,
    color: '#666666',
    lineHeight: 24,
  },

  input: {
  borderWidth: 1,
  borderColor: '#dddddd',
  borderRadius: 10,
  paddingHorizontal: 16,
  paddingVertical: 14,
  fontSize: 16,
  marginTop: 24,
},

button: {
  backgroundColor: '#111111',
  paddingVertical: 16,
  borderRadius: 10,
  alignItems: 'center',
  marginTop: 24,
},

buttonText: {
  color: '#ffffff',
  fontSize: 16,
  fontWeight: '600',
},
  
  
});