import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MapView, {PROVIDER_GOOGLE, UrlTile} from 'react-native-maps'

const map = () => {
  return (
    <View style={styles.container}>
      <MapView 
        provider={PROVIDER_GOOGLE}
        style={styles.map} 
        initialRegion={{
          latitude: 38.986172,
          longitude: -76.942362,
          latitudeDelta: 0.00922,
          longitudeDelta: 0.00421,
        }}>
          <UrlTile urlTemplate='http://c.tile.openstreetmap.org/{z}/{x}/{y}.png'/>
      </MapView>
    </View>
  )
}

export default map

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