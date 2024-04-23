import React, { useState, useEffect } from "react";
import { Text, View, SectionList, StyleSheet, Dimensions } from "react-native";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { format, parseISO } from "date-fns";

const firebaseConfig = {
  apiKey: "AIzaSyCroielwgkwU_ZIWJFLVksc8ptdWrXu6YI",
  authDomain: "umd-foodies.firebaseapp.com",
  projectId: "umd-foodies",
  storageBucket: "umd-foodies.appspot.com",
  messagingSenderId: "772481496493",
  appId: "1:772481496493:web:c7fb0108a9a0f8cfecdd24"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

const EventList = () => {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const eventsCol = collection(firestore, "events");
      const querySnapshot = await getDocs(eventsCol);
      const sortedEvents = querySnapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .sort((a, b) => a.eventDate.localeCompare(b.eventDate));

      const groupedByMonth = sortedEvents.reduce((acc, event) => {
        const monthYear = format(parseISO(event.eventDate), "MMMM yyyy");
        let section = acc.find((s) => s.title === monthYear);
        if (!section) {
          section = { title: monthYear, data: [] };
          acc.push(section);
        }
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
    <View style={{backgroundColor: "#FFF8F0", padding: 10}}>
      {/* <Text style={styles.title}>List of Food Events</Text> */}
      <SectionList style={{height: Dimensions.get("window").height}}
        sections={sections}
        renderItem={renderEvent}
        renderSectionHeader={renderHeader}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  eventCard: {
    backgroundColor: "#FFECEC",
    borderRadius: 15,
    padding: 15,
    margin: 5,
    color: "#92140C",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    padding: 10,
    textAlign: "center",
    backgroundColor: "#ffffff",
    color: "#000000",
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
    fontWeight: "bold",
    paddingVertical: 8,
    paddingHorizontal: 10,
    // backgroundColor: "#eee",
    color: "#92140C",
  },
  eventName: {
    fontWeight: "bold",
  },
});

export default EventList;
