import { StyleSheet, Text, View, Button, Pressable, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import MapView, { Callout, Marker, PROVIDER_GOOGLE, UrlTile, enableLatestRenderer } from "react-native-maps";
import * as Location from "expo-location";
import { Link, useNavigation, useRouter } from "expo-router";
import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore, query } from "firebase/firestore";

export default function map() {

  enableLatestRenderer();

  const firebaseConfig = {
    apiKey: "AIzaSyBsbXujxaXYnUblZXCryZObYL6sgyhZS7A",
    authDomain: "umd-foodie.firebaseapp.com",
    projectId: "umd-foodie",
    storageBucket: "umd-foodie.appspot.com",
    messagingSenderId: "412346293089",
    appId: "1:412346293089:web:645d0ef53dcfea58398320",
    measurementId: "G-5DHKWMMGD6",
  };

  const [eventMarkers, setEventMarkers] = useState([]);

  const app = initializeApp(firebaseConfig);
  const firestore = getFirestore(app);

  const getEvents = async () => {
    const q = query(collection(firestore, "events"));
    const snapshot = await getDocs(q);
    const temp = [];

    snapshot.forEach((doc) => {
      // console.log(doc.data());
      const event = doc.data();
      temp.push({
        lat: event.latitude,
        lon: event.longitude,
        building: event.eventLocation,
        room: event.eventRoomNumber,
        name: event.eventName,
        start: event.eventStartTime,
        end: event.eventEndTime,
        desc: event.eventDescription,
      });
    });
    setEventMarkers((prev) => [...prev, ...temp]);
  };

  const navigation = useNavigation();
  const router = useRouter();

  const [mapRegion, setMapRegion] = useState({
    latitude: 38.986172,
    longitude: -76.942362,
    latitudeDelta: 0.00922,
    longitudeDelta: 0.00421,
  });

  const [currLoc, setCurrLoc] = useState({
    lat: 0.0,
    lon: 0.0,
  });

  const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: "flex-end",
      alignItems: "center",
      padding: 10
      // height: Dimensions.get("window").height * 0.9,
      // width: Dimensions.get("window").width
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 4,
      elevation: 3,
      backgroundColor: '#92140C',
    },
    text: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'white',
    },
  });

  const getLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }
      await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.BestForNavigation,
          timeInterval: 5000,
          distanceInterval: 0,
        },
        (loc) => {
          // console.log(loc);
          setMapRegion({
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
            latitudeDelta: 0.00922,
            longitudeDelta: 0.00421,
          });
          setCurrLoc({
            lat: loc.coords.latitude,
            lon: loc.coords.longitude,
          });
        }
      );
    } catch {}
  };

  useEffect(() => {
    getEvents();
    getLocation();
  }, []);

  return (
    <>
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          showsUserLocation
          style={styles.map}
          region={mapRegion}
        >
          {eventMarkers.map((marker, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: parseFloat(marker.lat),
                longitude: parseFloat(marker.lon),
              }}
              title={marker.name}
              description={`${marker.building}\n${marker.desc}`}
            >
              <Callout>
                <View style={{padding:10}}>
                  <Text style={{fontWeight: "bold"}}>{marker.name}</Text>
                  <Text>{`${marker.building} Room: ${marker.room}`}</Text>
                  <Text>{`${marker.start}-${marker.end}`}</Text>
                  <Text>{`${marker.desc}`}</Text>
                </View>
              </Callout>
            </Marker>
          ))}
        </MapView>
        <Pressable
        style = {styles.button}
        onPress={() => {
          router.push({
            pathname: "/add_event",
            params: {
              lat: currLoc.lat,
              lon: currLoc.lon,
            },
          });
        }}>
         <Text style = {styles.text}>Add an Event!</Text>
      </Pressable>   
      </View>
{/* <Button
          style = {{}}
          title="Add an Event"
          onPress={() => {
            router.push({
              pathname: "/add_event",
              params: {
                lat: currLoc.lat,
                lon: currLoc.lon,
              },
            });
          }}
        ></Button> */}
    </>
  );
}
