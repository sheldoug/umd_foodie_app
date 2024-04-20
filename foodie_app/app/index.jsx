import { StyleSheet, Text, View } from "react-native";
import { Link } from 'expo-router'

export default function Page() {
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>UMD Foodie</Text>
        <Text style={styles.subtitle}>Find free food events on campus</Text>
        <Link href="/map" style={styles.button}>View Campus Map</Link>
        <Link href="/calendar" style={styles.button}>Calendar of Food Events</Link>
        <Link href="/add_event" style={styles.button}>Add New Food Event</Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
  button: {
    backgroundColor: "blue",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
    textAlign: "center",
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textDecorationLine: "none", // Remove underline
  },
});
