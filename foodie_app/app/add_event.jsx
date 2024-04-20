import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Text } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

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

  const handleAddEvent = () => {
    // For this example, we just show an alert
    // In a real app, you would potentially store the event data
    alert(`Event Added: 
      Name: ${eventName}
      Date & Time: ${eventDate.toLocaleString()}
      Description: ${eventDescription}`);

    // Reset form fields
    setEventName('');
    setEventDescription('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Food Event</Text>
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
