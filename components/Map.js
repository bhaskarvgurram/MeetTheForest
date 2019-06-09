import React from "react";
import { View, StyleSheet } from "react-native"
import MapView from "react-native-maps"

const googleMap = props => {
    return (
        <View>
            <MapView />
        </View>
    )
}

const styles = StyleSheet.create({
    mapContainer: {
        width: '100%',
        height: 200
    },
    map: {
        width: "100%",
        height: "100%"
    }
})

export default googleMap;