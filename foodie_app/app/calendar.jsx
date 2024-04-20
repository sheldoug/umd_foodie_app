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
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={"dayGridMonth"}
        headerToolbar={{
          start: "today prev,next",
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay"
        }}
        height={"90vh"}
        events={events} // Pass event data here
      />
    </div>
  );
}

export default Calendar;
