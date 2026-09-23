import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.logo}>🚗 RideFlow</Text>

        <Text style={styles.title}>
          Where are you going?
        </Text>

        <Text style={styles.subtitle}>
          Book a ride and get to your destination with ease.
        </Text>
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

  logo: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 60,
  },

  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 12,
  },

  subtitle: {
    fontSize: 17,
    lineHeight: 26,
    color: '#666666',
  },
});