import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Button, Text, ScrollView, Link, Pressable} from 'react-native';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { useNavigation, useRouter, useLocalSearchParams } from 'expo-router';

const firebaseConfig = {
    apiKey: "AIzaSyBsbXujxaXYnUblZXCryZObYL6sgyhZS7A",
    authDomain: "umd-foodie.firebaseapp.com",
    projectId: "umd-foodie",
    storageBucket: "umd-foodie.appspot.com",
    messagingSenderId: "412346293089",
    appId: "1:412346293089:web:645d0ef53dcfea58398320",
    measurementId: "G-5DHKWMMGD6"
  };

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

const AddEvent = () => {
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventStartTime, setEventStartTime] = useState('');
  const [eventEndTime, setEventEndTime] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventRoomNumber, setEventRoomNumber] = useState('');
  const [latitude, setLatitude] = useState("38.9860");  
  const [longitude, setLongitude] = useState("76.9446"); 

  const navigation = useNavigation();
  const router = useRouter();
  const post = useLocalSearchParams();

  useEffect(() => {
    if (post) {
      setLatitude(post.lat);
      setLongitude(post.lon);
    }
  }, [post]);


  const handleAddEvent = async () => {
    if (!eventName || !eventDate || !eventStartTime || !eventEndTime || !eventDescription || !eventLocation) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      await addDoc(collection(firestore, 'events'), {
        eventName: eventName,
        eventDate: eventDate,
        eventStartTime: eventStartTime,
        eventEndTime: eventEndTime,
        eventDescription: eventDescription,
        eventLocation: eventLocation,
        eventRoomNumber: eventRoomNumber,
        latitude: latitude, 
        longitude: longitude
      });
     
      setEventName('');
      setEventDate('');
      setEventStartTime('');
      setEventEndTime('');
      setEventDescription('');
      setEventLocation('');
      setEventRoomNumber('');
      setLatitude(''); 
      setLongitude(''); 
      router.back();
    } catch (error) {
      console.error('Error adding event: ', error);
      
      alert(error);
    }
  };

  return (

    <ScrollView style={{backgroundColor: "#FFF8F0"}}>
          <Text style={styles.title}>Add Food Event</Text>
      <View style={styles.container}>
        <Text style={styles.label}>Event Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter the name of the event"
          value={eventName}
          onChangeText={setEventName}
        />
        <Text style={styles.label}>Date</Text>
        <TextInput
          style={styles.input}
          placeholder="YYYY-MM-DD"
          value={eventDate}
          onChangeText={setEventDate}
        />
        <Text style={styles.label}>Start Time</Text>
        <TextInput
          style={styles.input}
          placeholder="HH:MM"
          value={eventStartTime}
          onChangeText={setEventStartTime}
        />
        <Text style={styles.label}>End Time</Text>
        <TextInput
          style={styles.input}
          placeholder="HH:MM"
          value={eventEndTime}
          onChangeText={setEventEndTime}
        />
        <Text style={styles.label}>Location/Building</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter event location/building"
          value={eventLocation}
          onChangeText={setEventLocation}
        />
        <Text style={styles.label}>Room Number (Optional)</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter event room number (optional)"
          value={eventRoomNumber}
          onChangeText={setEventRoomNumber}
        />
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Enter description of the event"
          value={eventDescription}
          onChangeText={setEventDescription}
          multiline
        />
        <Text style={styles.label}>Latitude</Text>
        <TextInput
          style={styles.input}
          placeholder="Latitude"
          value={latitude}
          editable={false}  
        />
        <Text style={styles.label}>Longitude</Text>
        <TextInput
          style={styles.input}
          placeholder="Longitude"
          value={longitude}
          editable={false}  
        />
        
        {/* <Button title="Add Event" onPress={handleAddEvent} /> */}
      </View>
      <Pressable style={styles.button} onPress={handleAddEvent}>
          <Text style={styles.text}>
            Add Event
          </Text>
        </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: "#FFF8F0"
  },
  title: {
    fontSize: 24,
    fontFamily: "Inter_900Black",
    marginBottom: 20,
    color: "#92140C",
    backgroundColor: "#FFF8F0",
    textAlign: 'center'
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
    alignSelf: 'flex-start',
    fontFamily: "Inter_900Black",
    // color: "#92140C"
  },
  input: {
    height: 40,
    width: '100%',
    // borderColor: '#92140C',
    // borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    fontSize: 16,
    opacity: 1,
    backgroundColor: "#FFECEC"
  },
  textArea: {
    height: 100,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#92140C',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});

export default AddEvent;