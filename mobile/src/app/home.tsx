import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  ScrollView,
} from 'react-native';

import { useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
    const [pickup, setPickup] = useState('');
    const [destination, setDestination] = useState('');
    const [fare, setFare] = useState<number | null>(null);
    const [distance, setDistance] = useState<number | null>(null);
    const [selectedRide, setSelectedRide] = useState('');
    const [rideCreated, setRideCreated] = useState(false);

    const handleFindRide = () => {
  if (pickup.trim() === '') {
    console.log('Please enter pickup location');
    return;
  }

  if (destination.trim() === '') {
    console.log('Please enter destination');
    return;
  }

  const estimatedDistance = 5;
  const baseFare = 50;
  const perKmRate = 12;

  const estimatedFare =
    baseFare + estimatedDistance * perKmRate;

  setDistance(estimatedDistance);
  setFare(estimatedFare);

  console.log('Pickup:', pickup);
  console.log('Destination:', destination);
  console.log('Estimated distance:', estimatedDistance, 'km');
  console.log('Estimated fare: ₹', estimatedFare);
};

const handleConfirmRide = async () => {
  if (selectedRide === '') {
    return;
  }

  const token = await SecureStore.getItemAsync('authToken');

  if (!token) {
    console.log('No authentication token found');
    return;
  }

  try {
    const response = await fetch(
      'http://192.168.29.181:5000/api/rides',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          pickup: pickup,
          destination: destination,
          rideType: selectedRide,
          estimatedDistance: distance,
          estimatedFare:
            selectedRide === 'go'
              ? fare
              : selectedRide === 'comfort'
              ? fare! + 50
              : fare! + 100,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.log('Ride request failed:', data.message);
      return;
    }

   console.log('Ride created:', data.ride);
   setRideCreated(true);
  } catch (error) {
    console.error('Ride request error:', error);
  }
};

  return (
    <SafeAreaView style={styles.container}>
    <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.logo}>🚗 RideFlow</Text>

        <Text style={styles.title}>
          Where are you going?
        </Text>

        <Text style={styles.subtitle}>
          Enter your pickup and destination to find a ride.
        </Text>

        <View style={styles.form}>

          <View style={styles.locationBox}>
            <Text style={styles.locationLabel}>📍 Pickup</Text>

            <TextInput
                style={styles.input}
                placeholder="Enter pickup location"
                value={pickup}
                onChangeText={setPickup}
/>
          </View>

          <View style={styles.locationBox}>
            <Text style={styles.locationLabel}>📍 Destination</Text>

            <TextInput
                style={styles.input}
                placeholder="Where to?"
                value={destination}
                onChangeText={setDestination}
/>
          </View>

          <Pressable
            style={styles.button}
            onPress={handleFindRide}
>
            <Text style={styles.buttonText}>
              Find a Ride
            </Text>
          </Pressable>

          {/* {fare !== null && ( */}
  {fare !== null && (
  <View style={styles.rideSection}>

     <Text style={styles.fareDistance}>
      Estimated distance: {distance} km
    </Text>

    <Text style={styles.sectionTitle}>
      Choose your ride
    </Text>

    <Pressable
      style={[
        styles.rideCard,
        selectedRide === 'go' && styles.selectedRide,
      ]}
      onPress={() => setSelectedRide('go')}
    >
      <View>
        <Text style={styles.rideName}>
          🚗 RideFlow Go
        </Text>

        <Text style={styles.rideDescription}>
          Affordable everyday rides
        </Text>

        <Text style={styles.rideTime}>
          5 min away
        </Text>
      </View>

      <Text style={styles.ridePrice}>
        ₹{fare}
      </Text>
    </Pressable>


    <Pressable
      style={[
        styles.rideCard,
        selectedRide === 'comfort' && styles.selectedRide,
      ]}
      onPress={() => setSelectedRide('comfort')}
    >
      <View>
        <Text style={styles.rideName}>
          🚙 RideFlow Comfort
        </Text>

        <Text style={styles.rideDescription}>
          More comfortable ride
        </Text>

        <Text style={styles.rideTime}>
          7 min away
        </Text>
      </View>

      <Text style={styles.ridePrice}>
        ₹{fare + 50}
      </Text>
    </Pressable>


    <Pressable
      style={[
        styles.rideCard,
        selectedRide === 'xl' && styles.selectedRide,
      ]}
      onPress={() => setSelectedRide('xl')}
    >
      <View>
        <Text style={styles.rideName}>
          🚘 RideFlow XL
        </Text>

        <Text style={styles.rideDescription}>
          More space for groups
        </Text>

        <Text style={styles.rideTime}>
          8 min away
        </Text>
      </View>

      <Text style={styles.ridePrice}>
        ₹{fare + 100}
      </Text>
    </Pressable>

   {selectedRide !== '' && (
  <Pressable
    style={styles.confirmButton}
    onPress={handleConfirmRide}
  >
    <Text style={styles.confirmButtonText}>
      Confirm Ride
    </Text>
  </Pressable>
)}

{rideCreated && (
  <View style={styles.successBox}>
    <Text style={styles.successTitle}>
      🎉 Ride Requested!
    </Text>

    <Text style={styles.successText}>
      Your ride request has been created successfully.
    </Text>

    <Text style={styles.successText}>
      {pickup} → {destination}
    </Text>
  </View>
)}

  </View>
)}


        </View>

        <View style={styles.recentSection}>
          <Text style={styles.recentTitle}>
            Recent rides
          </Text>

          <Text style={styles.emptyText}>
            Your recent rides will appear here.
          </Text>
        </View>

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
    paddingHorizontal: 24,
    paddingTop: 30,
    paddingBottom: 40,
},

  logo: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 45,
  },

  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666666',
    marginBottom: 30,
  },

  form: {
    gap: 16,
  },

  locationBox: {
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 12,
    padding: 14,
  },

  locationLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
  },

  input: {
    fontSize: 16,
    paddingVertical: 8,
  },

  button: {
    backgroundColor: '#111111',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 5,
  },

  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },

  recentSection: {
    marginTop: 45,
  },

  recentTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
  },

  emptyText: {
    fontSize: 15,
    color: '#777777',
  },
  fareBox: {
  marginTop: 24,
  padding: 20,
  borderRadius: 12,
  borderWidth: 1,
  borderColor: '#dddddd',
},

fareTitle: {
  fontSize: 16,
  color: '#666666',
  marginBottom: 8,
},

fareAmount: {
  fontSize: 30,
  fontWeight: '700',
},

fareDistance: {
  fontSize: 14,
  color: '#777777',
  marginTop: 6,
},

rideSection: {
  marginTop: 30,
},

sectionTitle: {
  fontSize: 20,
  fontWeight: '700',
  marginBottom: 14,
},

rideCard: {
  borderWidth: 1,
  borderColor: '#dddddd',
  borderRadius: 12,
  padding: 16,
  marginBottom: 12,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
},

selectedRide: {
  borderColor: '#111111',
  borderWidth: 2,
},

rideName: {
  fontSize: 17,
  fontWeight: '600',
  marginBottom: 5,
},

rideDescription: {
  fontSize: 14,
  color: '#666666',
  marginBottom: 5,
},

rideTime: {
  fontSize: 13,
  color: '#888888',
},

ridePrice: {
  fontSize: 18,
  fontWeight: '700',
},

confirmButton: {
  backgroundColor: '#111111',
  paddingVertical: 16,
  borderRadius: 10,
  alignItems: 'center',
  marginTop: 8,
},

confirmButtonText: {
  color: '#ffffff',
  fontSize: 16,
  fontWeight: '600',
},

successBox: {
  marginTop: 16,
  padding: 16,
  borderRadius: 10,
  backgroundColor: '#f0fdf4',
  borderWidth: 1,
  borderColor: '#bbf7d0',
},

successTitle: {
  fontSize: 18,
  fontWeight: '700',
  marginBottom: 6,
},

successText: {
  fontSize: 14,
  color: '#555555',
  marginTop: 4,
},

});