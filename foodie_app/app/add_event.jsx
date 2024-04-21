import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Text } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
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
  const [eventDate, setEventDate] = useState(new Date());
  const [eventDescription, setEventDescription] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirmDate = (date) => {
    setEventDate(date);
    hideDatePicker();
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
        const eventsRef = collection(firestore, 'events'); // Use collection with firestore reference
        await addDoc(eventsRef, {
          eventName: eventName,
          eventDate: eventDate,
          eventDescription: eventDescription
        });
      // Reset form fields
      setEventName('');
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
        <Text style={styles.label}>Date & Time</Text>
        <View style={styles.dateTimeContainer}>
          <Button title="Select Date & Time" onPress={showDatePicker} />
          <Text style={styles.dateTimeText}>{eventDate.toLocaleString()}</Text>
        </View>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="datetime"
          onConfirm={handleConfirmDate}
          onCancel={hideDatePicker}
        />
        <Text style={styles.label}>Food Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Enter description of the food served"
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
  dateTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    width: '100%',
  },
  dateTimeText: {
    fontSize: 16,
    color: '#555',
  },
});

export default AddEvent;
