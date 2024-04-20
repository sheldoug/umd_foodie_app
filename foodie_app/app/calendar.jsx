import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Calendar } from 'react-native-calendars';

const CalendarScreen = () => {
  return (
    <View style={styles.container}>
      <Calendar
        // Add your calendar configurations here
        // For example:
        // markedDates={{
        //   '2024-04-20': { selected: true, marked: true, selectedColor: 'blue' },
        // }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EFF1ED',
  },
});

export default CalendarScreen;
