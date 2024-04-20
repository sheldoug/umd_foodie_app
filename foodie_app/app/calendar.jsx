import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { Calendar } from 'react-native-calendars';

const { width } = Dimensions.get('window');

const CalendarScreen = () => {
  const [events, setEvents] = useState({
    '2024-04-20': [{ name: 'Event 1' }, { name: 'Event 2' }],
    '2024-04-21': [{ name: 'Event 3' }],
  });

  const getCurrentWeekEvents = () => {
    const currentDate = new Date();
    const currentWeekStart = new Date(currentDate);
    currentWeekStart.setHours(0, 0, 0, 0 - currentWeekStart.getDay()); // Start of the week
    const currentWeekEnd = new Date(currentDate);
    currentWeekEnd.setHours(23, 59, 59, 999 + (6 - currentWeekEnd.getDay())); // End of the week

    const currentWeekEvents = {};
    for (let date in events) {
      const eventDate = new Date(date);
      if (eventDate >= currentWeekStart && eventDate <= currentWeekEnd) {
        currentWeekEvents[date] = events[date];
      }
    }
    return currentWeekEvents;
  };

  const [currentWeekEvents, setCurrentWeekEvents] = useState(getCurrentWeekEvents());

  useEffect(() => {
    setCurrentWeekEvents(getCurrentWeekEvents());
  }, [events]);

  const renderDay = (day) => {
    const dateString = day.dateString;
    const dayEvents = events[dateString] || [];

    return (
      <View style={styles.dayContainer}>
        <Text style={styles.dayText}>{day.day}</Text>
        {dayEvents.length === 1 ? (
          <Text style={styles.eventText}>{dayEvents[0].name}</Text>
        ) : (
          <View style={styles.eventDot} />
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.weekEventsContainer}>
        <Text style={styles.weekEventsTitle}>This Week's Events:</Text>
        {Object.keys(currentWeekEvents).map((date) => (
          <View key={date}>
            <Text style={styles.dateText}>{date}</Text>
            {currentWeekEvents[date].map((event, index) => (
              <Text key={index} style={styles.eventText}>{event.name}</Text>
            ))}
          </View>
        ))}
      </View>
      <Calendar
        style={styles.calendar}
        renderDay={renderDay}
        markedDates={getMarkedDates(events)}
        onPress={(date) => {
          console.log('Clicked date:', date.dateString);
        }}
      />
    </View>
  );
};

const getMarkedDates = (events) => {
  let markedDates = {};

  Object.keys(events).forEach((date) => {
    markedDates[date] = { marked: true };
  });

  return markedDates;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFF1ED',
    justifyContent: 'center',
    alignItems: 'center',
  },
  weekEventsContainer: {
    paddingHorizontal: 16,
    marginBottom: 20,
    alignItems: 'center',
  },
  weekEventsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  eventText: {
    fontSize: 18,
    color: '#000',
    marginBottom: 4,
  },
  calendar: {
    width: width - 32,
  },
  dayContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  dayText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  eventDot: {
    width: 6,
    height: 6,
    backgroundColor: 'blue',
    borderRadius: 3,
    marginBottom: 4,
  },
});

export default CalendarScreen;
