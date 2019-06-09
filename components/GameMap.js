import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { MapView, PROVIDER_GOOGLE } from 'expo';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import { Marker, Polyline } from 'react-native-maps';
// import getDirections from 'react-native-google-maps-directions'
import MapViewDirections from 'react-native-maps-directions';
import { tsImportEqualsDeclaration } from "@babel/types";


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
                visiting_spots_to_show.push(Object.assign({}, location_data, { color: 'darkgreen' }));
            }

            if (i === props.next_index && location_data.completed !== true) {
                console.log('Got here');
                visiting_spots_to_show.push(Object.assign({}, location_data, { color: 'red' }));
            }
        });
        console.log('props next index ', props.next_index)
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
        this.setState({
            myLocation: {
                latitude: lat,
                longitude: long
            }
        });
    }

    render() {
        console.log('In render of map ', this.state.next_index);
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
                            // onClick={this.handleMarkerClick}
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
