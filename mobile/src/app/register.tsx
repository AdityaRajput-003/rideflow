import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {useState} from 'react';


export default function RegisterScreen() {
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleRegister = () => {
      if(name.trim() === ''){
        setError("name is required");
        return;
      }
      if (mobile.trim() === '') {
        setError("Mobile number is required");
        return;
}



      if (!/^[6-9]\d{9}$/.test(mobile.trim())) {
        setError("Enter a valid 10-digit mobile number");
        return;
}
      if(password.trim() === ''){
        setError("Password is required");
        return;
      }
      if(password.length < 6 ){
        setError("Password must be at least of 6 characters");
        return;
      }
      if(password !== confirmPassword){
        setError("Password do not match");
        return;
      }
      console.log("Registration data is valid");
    };


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Create your account</Text>

        <Text style={styles.subtitle}>
          Register with RideFlow to book your rides.
        </Text>

        {error !== '' && (
          <Text style={styles.error}>
            {error}
  </Text>
)}

        <TextInput
             style={styles.input}
            placeholder="Enter your name"
             value={name}
             onChangeText={(text) => {
                setName(text);
                setError('');
  }}
/>
        <TextInput
            style={styles.input}
            placeholder="Enter your mobile number"
            value={mobile}
            onChangeText={(text) => {
              setMobile(text);
              setError('');
            }}
            keyboardType="phone-pad"
/>
        <TextInput
            style={styles.input}
            placeholder="Enter your password"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setError('');
            }}
            secureTextEntry
/>
        <TextInput
            style={styles.input}
            placeholder="Confirm your password"
            value={confirmPassword}
            onChangeText={(text) => {
              setConfirmPassword(text);
              setError('');
            }}
            secureTextEntry
/>
        <Pressable
          style={styles.button}
          onPress={handleRegister}
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

error: {
  color: 'red',
  fontSize: 14,
  marginTop: 12,
},
  
  
});