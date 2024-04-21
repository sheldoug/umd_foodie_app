import React, { useState, useEffect } from 'react';
import { Text, View, SectionList, StyleSheet } from 'react-native';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { format, parseISO } from 'date-fns';

const firebaseConfig = {
  apiKey: "AIzaSyBsbXujxaXYnUblZXCryZObYL6sgyhZS7A",
  authDomain: "umd-foodie.firebaseapp.com",
  projectId: "umd-foodie",
  storageBucket: "umd-foodie.appspot.com",
  messagingSenderId: "412346293089",
  appId: "1:412346293089:web:645d0ef53dcfea58398320",
  measurementId: "G-5DHKWMMGD6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

// EventList component
const EventList = () => {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const eventsCol = collection(firestore, 'events');
      const querySnapshot = await getDocs(eventsCol);
      const sortedEvents = querySnapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .sort((a, b) => a.eventDate.localeCompare(b.eventDate));

      // Group events by month
      const groupedByMonth = sortedEvents.reduce((acc, event) => {
        // Extract the month and year as a section title
        const monthYear = format(parseISO(event.eventDate), 'MMMM yyyy');
        // Find or initialize the section for this month
        let section = acc.find(s => s.title === monthYear);
        if (!section) {
          section = { title: monthYear, data: [] };
          acc.push(section);
        }
        // Add the event to the section
        section.data.push(event);
        return acc;
      }, []);

      setSections(groupedByMonth);
    };

    fetchEvents().catch(console.error);
  }, []);

  const renderEvent = ({ item }) => {
    return (
      <View style={styles.eventCard}>
        <Text style={styles.eventName}>{item.eventName}</Text>
        <Text>{item.eventLocation}</Text>
        <Text>{item.eventDate}</Text>
        <Text>{`${item.eventStartTime} - ${item.eventEndTime}`}</Text>
      </View>
    );
  };

  const renderHeader = ({ section }) => {
    return <Text style={styles.header}>{section.title}</Text>;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>List of Food Events</Text>
    <SectionList
      sections={sections}
      renderItem={renderEvent}
      renderSectionHeader={renderHeader}
      keyExtractor={item => item.id}
    />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  eventCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    padding: 10,
    margin: 10,
    color: '#92140C'
  },
  title: {
    fontSize: 30, // increased font size
    fontWeight: 'bold',
    padding: 20, // increased padding for a larger touch area
    textAlign: 'center', // center the text
    backgroundColor: '#ffffff', // background color for the title area
    color: '#000000', // text color, you can adjust as needed
    // Add shadow or elevation for depth, optional
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: '#eee',
    color: '#92140C'
  },
  eventName: {
    fontWeight: 'bold'
  }
});

export default EventList;
