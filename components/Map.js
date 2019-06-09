import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { MapView, PROVIDER_GOOGLE } from 'expo';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import { Marker, Polyline } from 'react-native-maps';
// import getDirections from 'react-native-google-maps-directions'
import MapViewDirections from 'react-native-maps-directions';


export default class googleMap extends Component {
    state = {
        nearestVicinityLimit = 50, // set by the owner
        myLocation: {},
        errorMessage: null,
        visitingSpots: [
            {
                name: "Sentinel Beach Picnic Area",
                latitude: 37.7344593,
                longitude: -119.6054261
            },
            {
                name: "Swinging Bridge",
                latitude: 37.7368861,
                longitude: -119.6002049
            },
            {
                name: "Valley Chapel",
                latitude: 37.741043,
                longitude: -119.5918202
            },
            {
                name: "Yosemite Conservation Heritage Center",
                latitude: 37.7398992,
                longitude: -119.5796786
            },
            {
                name: "Half Dome Village",
                latitude: 37.7376362,
                longitude: -119.5721749
            },
            {
                name: "Ansel Adams Gallery",
                latitude: 37.7485438,
                longitude: -119.5869797
            },
        ]
    };

    componentDidMount() {
        this._getLocationAsync();
    }

    _getLocationAsync = async () => {
        const permissionResponse = await Permissions.getAsync(Permissions.LOCATION);
        const status = permissionResponse.status
        let lat = null;
        let long = null;
        if (status !== 'granted') {
            lat = 37.732954,
                long = -119.606256
        }
        else {
            let location = await Location.getCurrentPositionAsync({});
            lat = location.coords.latitude
            long = location.coords.longitude
        }
        Location.watchPositionAsync({ distanceInterval: 100 }, userLocationChanged)
        this.setState({
            myLocation: {
                latitude: lat,
                longitude: long
            }
        });
    }

    userLocationChanged = (newLocation) => {
        let newLat = null
        let newLong = null
        if (newLocation !== undefined) {
            newLat = newLocation.coords.latitude
            newLong = newLocation.coords.longitude
            let minDist = 0
            let minDistIndex = null
            let isMinDist = false
            for (let i = 0; i < this.state.visitingSpots.length; i++) {
                let newDist = Math.abs(getDistance({ newLat, newLong }, { this.state.visitingSpots[i].latitude, this.state.visitingSpots[i].longitude }))
                if (newDist < minDist && newDist < this.state.nearestVicinityLimit) {
                    minDist = newDist
                    minDistIndex = i
                    isMinDist = true
                }
            }
            this.props.userLocationChanged({ isMinDist: isMinDist, minDistIndex: minDistIndex })
            this.setState({
                myLocation: {
                    latitude: newLocation.coords.latitude,
                    longitude: newLocation.coords.longitude
                }
            });
        }

    }

    rad = function (x) {
        return x * Math.PI / 180;
    };

    getDistance = function (p1, p2) {
        var R = 6378137; // Earth’s mean radius in meter
        var dLat = rad(p2.lat() - p1.lat());
        var dLong = rad(p2.lng() - p1.lng());
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(rad(p1.lat())) * Math.cos(rad(p2.lat())) *
            Math.sin(dLong / 2) * Math.sin(dLong / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        return d; // returns the distance in meter
    };



    render() {
        const origin = {
            latitude: 37.7908536,
            longitude: -122.3967217
        }
        const destination = {
            latitude: 37.7894639,
            longitude: -122.3966408
        };
        const GOOGLE_MAPS_APIKEY = 'AIzaSyA0jXWoTrtAZdxqheNqepk5Aw7UbO8q54o';
        const mode = "WALKING"
        return (
            <MapView
                style={{ flex: 1 }}
                provider={PROVIDER_GOOGLE}
                initialRegion={{
                    latitude: this.state.myLocation.latitude,
                    longitude: this.state.myLocation.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                <Marker
                    coordinate={{
                        latitude: this.state.myLocation.latitude,
                        longitude: this.state.myLocation.longitude
                    }}
                    // image={"http://www.myiconfinder.com/uploads/iconsets/128-128-8055c322ae4049897caa15e5331940f2.png"}
                    pinColor={"blue"}
                />
                {this.state.visitingSpots.map((elem, i) => {
                    return (
                        (<Marker
                            key={i}
                            // onClick={this.props.handleMarkerClick}
                            onClick={() => this.props.handleMarkerClick(i)}
                            coordinate={{
                                latitude: elem.latitude,
                                longitude: elem.longitude
                            }}
                        />)
                    );
                })}
                {this.state.visitingSpots.map((elem, i) => {
                    // console.log(i)
                    if (i !== 0) {
                        return (
                            (<MapViewDirections
                                key={i}
                                origin={{
                                    latitude: this.state.visitingSpots[i - 1].latitude,
                                    longitude: this.state.visitingSpots[i - 1].longitude
                                }}
                                destination={{
                                    latitude: elem.latitude,
                                    longitude: elem.longitude
                                }}
                                apikey={GOOGLE_MAPS_APIKEY}
                                mode={mode}
                                strokeWidth={5}
                                strokeColor="red"
                            />)
                        );
                    }
                })}
                {/* <MapViewDirections
                origin={origin}
                destination={destination}
                apikey={GOOGLE_MAPS_APIKEY}
                mode = {mode}
                strokeWidth={5}
                strokeColor="red"
            /> */}
                {/* <Polyline
                coordinates={this.state.visitingSpots}
                strokeColor="red" // fallback for when `strokeColors` is not supported by the map-provider
                strokeColors={[
                    '#7F0000',
                    '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
                    '#B24112',
                    '#E5845C',
                    '#238C23',
                    '#7F0000'
                ]}
                strokeWidth={6}
            /> */}
            </MapView>
        )
    }
}
