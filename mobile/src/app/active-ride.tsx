import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
} from 'react-native';

import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as SecureStore from 'expo-secure-store';
import { useLocalSearchParams } from 'expo-router';

export default function ActiveRideScreen() {
    const { rideId } = useLocalSearchParams();

    const [ride, setRide] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
  const fetchRide = async () => {
    try {
      const token = await SecureStore.getItemAsync('authToken');

      if (!token) {
        console.log('No authentication token found');
        return;
      }

      const response = await fetch(
        `http://192.168.29.181:5000/api/rides/${rideId}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.log('Failed to fetch ride:', data.message);
        return;
      }

      setRide(data.ride);

    } catch (error) {
      console.error('Fetch ride error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (rideId) {
    fetchRide();
  }
}, [rideId]);

const handleCancelRide = async () => {
  if (!ride) {
    return;
  }

  try {
    const token = await SecureStore.getItemAsync('authToken');

    if (!token) {
      console.log('No authentication token found');
      return;
    }

    const response = await fetch(
      `http://192.168.29.181:5000/api/rides/${ride.id}/cancel`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.log('Cancel ride failed:', data.message);
      return;
    }

    setRide(data.ride);

  } catch (error) {
    console.error('Cancel ride error:', error);
  }
};
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>

       {loading ? (
  <Text style={styles.message}>
    Loading ride...
  </Text>
) : ride === null ? (
  <Text style={styles.message}>
    Ride not found.
  </Text>
) : (
  <>
    <Text style={styles.title}>
      Your Ride
    </Text>

    <Text style={styles.rideType}>
      🚗 {ride.ride_type}
    </Text>

    <View style={styles.locationCard}>
      <Text style={styles.label}>
        Pickup
      </Text>

      <Text style={styles.value}>
        {ride.pickup}
      </Text>

      <Text style={styles.arrow}>
        ↓
      </Text>

      <Text style={styles.label}>
        Destination
      </Text>

      <Text style={styles.value}>
        {ride.destination}
      </Text>
    </View>

    <View style={styles.infoCard}>
      <Text style={styles.label}>
        Status
      </Text>

      <Text style={styles.status}>
        {ride.status}
      </Text>
    </View>

    <View style={styles.infoCard}>
      <Text style={styles.label}>
        Estimated distance
      </Text>

      <Text style={styles.value}>
        {ride.estimated_distance} km
      </Text>
    </View>

    <View style={styles.infoCard}>
      <Text style={styles.label}>
        Estimated fare
      </Text>

      <Text style={styles.fare}>
        ₹{ride.estimated_fare}
      </Text>
    </View>

    <Text style={styles.rideId}>
      Ride ID: #{ride.id}
    </Text>
  </>
)}

{ride && ride.status === 'REQUESTED' && (
  <Pressable
    style={styles.cancelButton}
    onPress={handleCancelRide}
  >
    <Text style={styles.cancelButtonText}>
      Cancel Ride
    </Text>
  </Pressable>
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
    marginBottom: 10,
  },

  rideType: {
    fontSize: 18,
    fontWeight: '600',
  },

  rideId: {
  fontSize: 14,
  color: '#666666',
  marginTop: 10,
},

message: {
  fontSize: 15,
  color: '#666666',
},

locationCard: {
  backgroundColor: '#f8f8f8',
  padding: 18,
  borderRadius: 12,
  marginTop: 25,
  marginBottom: 12,
},

infoCard: {
  backgroundColor: '#f8f8f8',
  padding: 18,
  borderRadius: 12,
  marginBottom: 12,
},

label: {
  fontSize: 13,
  color: '#666666',
  marginBottom: 6,
},

value: {
  fontSize: 16,
  fontWeight: '600',
},

arrow: {
  fontSize: 20,
  marginVertical: 10,
},

status: {
  fontSize: 16,
  fontWeight: '700',
},

fare: {
  fontSize: 20,
  fontWeight: '700',
},

cancelButton: {
  marginTop: 10,
  paddingVertical: 15,
  borderRadius: 10,
  borderWidth: 1,
  borderColor: '#dddddd',
  alignItems: 'center',
},

cancelButtonText: {
  fontSize: 15,
  fontWeight: '600',
},

});