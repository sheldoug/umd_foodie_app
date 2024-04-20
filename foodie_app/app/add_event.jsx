import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, DatePickerIOS } from 'react-native';
import axios from 'axios';

const AddEvent = () => {
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState(new Date());
  const [eventDescription, setEventDescription] = useState('');

  const handleAddEvent = async () => {
    try {
      // Send event data to MongoDB database
      await axios.post('YOUR_BACKEND_API_ENDPOINT', {
        eventName,
        eventDate,
        eventDescription,
      });

      // Reset form fields
      setEventName('');
      setEventDate(new Date());
      setEventDescription('');
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Name of food event"
        value={eventName}
        onChangeText={setEventName}
      />
      <DatePickerIOS
        style={styles.datePicker}
        date={eventDate}
        onDateChange={setEventDate}
        mode="datetime"
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={eventDescription}
        onChangeText={setEventDescription}
        multiline
      />
      <Button title="Add Event" onPress={handleAddEvent} />
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
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  datePicker: {
    marginBottom: 20,
  },
});

export default AddEvent;
