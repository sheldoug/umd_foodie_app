import { StyleSheet, Text, View, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import MapView, {PROVIDER_GOOGLE, UrlTile} from 'react-native-maps'
import * as Location from 'expo-location'


export default function map() {
  const [mapRegion, setMapRegion] = useState({
    latitude: 38.986172,
    longitude: -76.942362,
    latitudeDelta: 0.00922,
    longitudeDelta: 0.00421,
  });

  const [currLoc, setCurrLoc] = useState({
    lat: 0.0,
    lon: 0.0
  })


const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  map : {
    ...StyleSheet.absoluteFillObject
  }
})

const getLocation = async () => {
  try {
    let {status} = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      return;
    }
    let location = await Location.watchPositionAsync({
      accuracy: Location.Accuracy.Balanced,
      timeInterval: 1000,
      distanceInterval: 0
    }, (loc) => {
      console.log(loc)
      setMapRegion({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        latitudeDelta: 0.00922,
        longitudeDelta: 0.00421,   
      })
      setCurrLoc({
        lat: loc.coords.latitude,
        lon: loc.coords.longitude
      })
    }) 
  } catch {

  }
};


useEffect(() => {
  getLocation(); 
},[])


return (
  <View style={styles.container}>
    <MapView 
      provider={PROVIDER_GOOGLE}
      showsUserLocation
      style={styles.map} 
      region={mapRegion}>
        <UrlTile urlTemplate='http://c.tile.openstreetmap.org/{z}/{x}/{y}.png'/>
    </MapView>
    <Link href={{
      pathname: "/add_event",
      params: {
        lat: currLoc.lat,
        lon: currLoc.lon
      }
    }}></Link>
  </View>
  
)

}