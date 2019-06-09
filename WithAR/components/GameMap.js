import React, { Component } from "react";
import { StyleSheet } from "react-native";
// import { MapView, PROVIDER_GOOGLE } from 'expo';
// import * as Permissions from 'expo-permissions'
// import * as Location from 'expo-location';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
// import getDirections from 'react-native-google-maps-directions'
import MapViewDirections from 'react-native-maps-directions';
// import { tsImportEqualsDeclaration } from "@babel/types";

export default class GameMap extends Component {
    state = {
        myLocation: {},
        errorMessage: null,
        next_index: null,
        // visitingSpots: [
        //     {
        //         name: "Sentinel Beach Picnic Area",
        //         latitude: 37.7344593,
        //         longitude: -119.6054261,
        //         completed: true
        //     },
        //     {
        //         name: "Swinging Bridge",
        //         latitude: 37.7368861,
        //         longitude: -119.6002049,
        //         completed: true
        //     },
        //     {
        //         name: "Valley Chapel",
        //         latitude: 37.741043,
        //         longitude: -119.5918202,
        //         completed: true,
        //     },
        //     {
        //         name: "Yosemite Conservation Heritage Center",
        //         latitude: 37.7398992,
        //         longitude: -119.5796786,
        //         completed: false
        //     },
        //     {
        //         name: "Half Dome Village",
        //         latitude: 37.7376362,
        //         longitude: -119.5721749,
        //         completed: false
        //     },
        //     {
        //         name: "Ansel Adams Gallery",
        //         latitude: 37.7485438,
        //         longitude: -119.5869797,
        //         completed: false
        //     },
        // ],
        visitingSpots: [],
    };


    filter_data = (props) => {

        let visiting_spots_to_show = [];
        let visitingSpots = props.visitingSpots.map((location_data, i) => {

            if (location_data.completed === true) {
                visiting_spots_to_show.push(Object.assign({}, location_data, { color: 'green' }));
            }

            if (i === props.next_index && location_data.completed !== true) {
                console.log('Got here');
                visiting_spots_to_show.push(Object.assign({}, location_data, { color: 'red' }));
            }
        });
        console.log('props next index ', visiting_spots_to_show)
        this.setState({
            visitingSpots: visiting_spots_to_show,
            next_index: props.next_index
        })
    }

    componentWillReceiveProps = (nextProps) => {
        console.log('in component will receive props ');
        this.filter_data(nextProps);
    }

    componentWillMount() {
        console.log('cwm of map ');

        this.filter_data(this.props);
        this._getLocationAsync();
    }

    _getLocationAsync = async () => {
        // const permissionResponse = await Permissions.getAsync(Permissions.LOCATION);
        // const status = permissionResponse.status
        let demo = false;
        if (demo) {
            console.log("Geoloation")
            await navigator.geolocation.getCurrentPosition(async (position) => {
                console.log("Current Location----\n", position)
                this.setState({ myLocation: { longitude: position.longitude, latitude: position.latitude } });
                let watchID = await navigator.geolocation.watchPosition(this.userLocationChanged, (error) => { console.log(error) }, {
                    enableHighAccuracy: false,
                    timeout: 5000,
                    maximumAge: 0
                })
                console.log("watchID", watchID)

            }, (error) => {
                console.log("Geoloation", error)
                this.setState({ myLocation: { latitude: 37.732954, longitude: -119.606256 } });
            }, {
                    enableHighAccuracy: true,
                    timeout: 20000,
                    maximumAge: 0
                });
        } else {
            let lat = null;
            let long = null;
            lat = 37.732954,
                long = -119.606256
            // if (status !== 'granted' || true) {
            //     lat = 37.732954,
            //         long = -119.606256
            // }
            // else {
            // let location = await Location.getCurrentPositionAsync({});
            // lat = location.coords.latitude
            // long = location.coords.longitude
            // }
            this.setState({
                myLocation: {
                    latitude: lat,
                    longitude: long
                }
            });
        }

    }

    userLocationChanged = (newLocation) => {
        console.log("Changed location------", newLocation)
        let newLat = null
        let newLong = null
        if (newLocation !== undefined) {
            newLat = newLocation.coords.latitude
            newLong = newLocation.coords.longitude
            let minDist = 0
            let minDistIndex = null
            let isMinDist = false
            for (let i = 0; i < this.state.visitingSpots.length; i++) {
                let newDist = Math.abs(this.getDistance({ lat: newLat, lng: newLong }, { lat: this.state.visitingSpots[i].latitude, lnf: this.state.visitingSpots[i].longitude }))
                if (newDist < minDist && newDist < this.state.nearestVicinityLimit) {
                    minDist = newDist
                    minDistIndex = i
                    isMinDist = true
                }
            }
            console.log("----\n", isMinDist, minDistIndex)
            // this.props.userLocationChanged({ isMinDist: isMinDist, minDistIndex: minDistIndex })
            this.setState({
                myLocation: {
                    latitude: newLocation.coords.latitude,
                    longitude: newLocation.coords.longitude
                }
            });
        }

    }

    rad = (x) => {
        return x * Math.PI / 180;
    };

    getDistance = (p1, p2) => {
        var R = 6378137; // Earth’s mean radius in meter
        var dLat = this.rad(p2.lat - p1.lat);
        var dLong = this.rad(p2.lng - p1.lng);
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.rad(p1.lat)) * Math.cos(this.rad(p2.lat)) *
            Math.sin(dLong / 2) * Math.sin(dLong / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        return d; // returns the distance in meter
    };

    handleMarkerClick = (i) => {
        this.props.handleMarkerClick(i);
    }

    render() {
        let initialRegion = {}
        if (this.state.visitingSpots.length > 0) {
            initialRegion['latitude'] = this.state.visitingSpots[this.state.visitingSpots.length - 1].latitude
            initialRegion['longitude'] = this.state.visitingSpots[this.state.visitingSpots.length - 1].longitude
        }
        else {
            initialRegion['latitude'] = this.state.myLocation.latitude
            initialRegion['longitude'] = this.state.myLocation.longitude
        }
        initialRegion['latitudeDelta'] = 0.0622
        initialRegion['longitudeDelta'] = 0.0221


        const GOOGLE_MAPS_APIKEY = 'AIzaSyA0jXWoTrtAZdxqheNqepk5Aw7UbO8q54o';
        const mode = "WALKING"
        return (
            <MapView
                style={{ flex: 1 }}
                provider={PROVIDER_GOOGLE}
                region={initialRegion}
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
                    // console.log('elem ', elem.color);
                    return (
                        (<Marker
                            key={`${i}${Date.now()}`}
                            onPress={() => this.handleMarkerClick(i)}
                            coordinate={{
                                latitude: elem.latitude,
                                longitude: elem.longitude
                            }}
                            pinColor={elem.color}
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

            </MapView>
        )
    }
}