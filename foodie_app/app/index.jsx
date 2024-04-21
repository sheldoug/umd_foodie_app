import { StyleSheet, Text, View } from "react-native";
import { Link } from 'expo-router'
import * as Font from 'expo-font';
import React, { useState, useEffect } from 'react';
import {  useFonts, Inter_900Black } from '@expo-google-fonts/inter';

export default function Page() {
  let [fontsLoaded] = useFonts({
    Inter_900Black,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>UMD Foodies</Text>
        <Text style={styles.subtitle}>Find free food events on campus!</Text>
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
    backgroundColor: '#92140C'
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
    fontFamily: "Inter_900Black",
    color: "white",
    position: 'relative',
    borderStyle: 'solid',
    marginTop: -5
  },
  subtitle: {
    fontSize: 36,
    color: "#241909",
  },
  button: {
    backgroundColor: "#D4AA7D",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    marginTop: 20,
    textAlign: "center",
    color: "#241909",
    fontSize: 18,
    fontWeight: "bold",
    textDecorationLine: "none",
  },
});
