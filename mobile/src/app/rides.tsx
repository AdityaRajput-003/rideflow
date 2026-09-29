import {
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';

import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as SecureStore from 'expo-secure-store';

export default function RidesScreen() {
  const [rides, setRides] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRides = async () => {
      try {
        const token = await SecureStore.getItemAsync('authToken');

        if (!token) {
          console.log('No authentication token found');
          return;
        }

        const response = await fetch(
          'http://192.168.29.181:5000/api/rides',
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          console.log('Failed to fetch rides:', data.message);
          return;
        }

        setRides(data.rides);
      } catch (error) {
        console.error('Fetch rides error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRides();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>

        <Text style={styles.title}>
          Ride History
        </Text>

        {loading ? (
          <Text style={styles.message}>
            Loading rides...
          </Text>
        ) : rides.length === 0 ? (
          <Text style={styles.message}>
            No rides yet.
          </Text>
        ) : (
          rides.map((ride) => (
            <View
              key={ride.id}
              style={styles.rideCard}
            >
              <View style={styles.rideInfo}>

                <Text style={styles.route}>
                  {ride.pickup} → {ride.destination}
                </Text>

                <Text style={styles.details}>
                  {ride.ride_type}
                </Text>

                <Text style={styles.status}>
                  {ride.status}
                </Text>

              </View>

              <Text style={styles.price}>
                ₹{ride.estimated_fare}
              </Text>

            </View>
          ))
        )}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  content: {
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 20,
  },

  message: {
    fontSize: 15,
    color: '#666666',
  },

  rideCard: {
    backgroundColor: '#f8f8f8',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  rideInfo: {
    flex: 1,
  },

  route: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 6,
  },

  details: {
    fontSize: 13,
    color: '#666666',
    marginBottom: 4,
  },

  status: {
    fontSize: 13,
    color: '#666666',
  },

  price: {
    fontSize: 15,
    fontWeight: '700',
    marginLeft: 12,
  },
});