import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Text } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(firestore, 'events'), {
        eventName: eventName,
        eventDate: eventDate,
        eventStartTime: eventStartTime,
        eventEndTime: eventEndTime,
        eventDescription: eventDescription
      });
      // Reset form fields
      setEventName('');
      setEventDate('');
      setEventStartTime('');
      setEventEndTime('');
      setEventDescription('');
    } catch (error) {
      console.error('Error adding event: ', error);
      // Show error message
      alert(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Food Event</Text>
      <form onSubmit={handleFormSubmit}>
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
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Enter description of the event"
          value={eventDescription}
          onChangeText={setEventDescription}
          multiline
        />
        <Button title="Add Event" onPress={handleFormSubmit} />
      </form>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
    alignSelf: 'flex-start',
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    fontSize: 16,
    opacity: 0.4
  },
  textArea: {
    height: 100,
  },
});

export default AddEvent;