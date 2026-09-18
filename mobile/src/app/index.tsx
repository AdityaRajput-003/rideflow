import { StyleSheet, Text, View, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>

        <Text style={styles.logo}>🚗 RideFlow</Text>

        <Text style={styles.title}>
          Your ride, your way.
        </Text>

        <Text style={styles.description}>
          Book a ride, track your driver, and reach your destination with ease.
        </Text>

        <View style={styles.buttons}>

          <Pressable
              style={styles.primaryButton}
              onPress={() => router.push('/register')}
          > 
            <Text style={styles.primaryButtonText}>
              Get Started
            </Text>
          </Pressable>

          <Pressable style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>
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
    justifyContent: 'center',
    paddingHorizontal: 24,
  },

  logo: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 40,
  },

  title: {
    fontSize: 38,
    fontWeight: '700',
    marginBottom: 16,
  },

  description: {
    fontSize: 17,
    lineHeight: 26,
    color: '#666666',
    marginBottom: 40,
  },

  buttons: {
    gap: 14,
  },

  primaryButton: {
    backgroundColor: '#111111',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
  },

  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },

  secondaryButton: {
    borderWidth: 1,
    borderColor: '#dddddd',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
  },

  secondaryButtonText: {
    color: '#111111',
    fontSize: 16,
    fontWeight: '600',
  },
});