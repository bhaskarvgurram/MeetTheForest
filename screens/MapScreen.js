import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Button
} from 'react-native';

import { track, visitingSpots } from './tracks';
import GameMap from './../components/GameMap';

export class MapScreen extends React.Component {
    state = {
        manual_mode: true,
        // track: [{
        //     latitude: "37.7908536",
        //     longitude: "-122.3967217",
        //     completed: false,
        //     alerts: ["Honking here is fined at $500", "Beware of pickpockets around this neighborhood"],
        //     info_messages: ["Galvanize- The learning community for technology", "This is the docusign hackathon"],
        //     game_messages: [{
        //         question: "What is the tallest building you see around here?",
        //         answer: "Salesforce Tower"
        //     }, {
        //         question: "What is the elephant on the terrace made of?",
        //         answer: "Junk",
        //     }],
        //     docusign_messages: [{
        //         title: "Save me",
        //         message: "Would you like to save me from the deforestration and senseless mining, drilling and land clearing activities. My health is deteriorating. Please sign this petition to save me."
        //     }, {
        //         title: "Roadless Area Protection",
        //         message: "Vast regions of my lands are under threat from the subversion of the Roadless Areas Protection Act by the current law makers. You can save me by signing this petition."
        //     }]
        // }],
        track: [],
        current_challenge_index: 0,
        score: 0,
        userIsInVicinityOfNextLocation: false,

    }

    componentWillMount = () => {
        console.log('CWM OF MAP SCREEN');
        if (this.state.manual_mode === true) {
            this.setState({
                track: visitingSpots
            });
        }
    }

    userLocationChanged = (is_within_min_distance, proximity_index) => {
        console.log('Is within min distance ', is_within_min_distance);

        if (this.state.manual_mode === false && this.state.current_challenge_index === proximity_index) {
            this.setState({
                userIsInVicinityOfNextLocation: is_within_min_distance
            })
        }
    }

    handleMarkerClick = () => {
        this.goToNextLocation();
    }

    goToNextLocation = () => {
        // go to the next location by setting the current challenge index
        // set completed to true for current chllenge location index in array
        // set the current index to next

        // re render the map
        let track = this.state.track.map((location_data, index) => {
            if (index === this.state.current_challenge_index) {
                return Object.assign({}, location_data, {
                    completed: true
                });
            } else {
                return location_data
            }
        });

        this.setState({
            current_challenge_index: this.state.current_challenge_index + 1,
            track: track
        });

        // re render the map
    };

    navigationOptions = {
        header: null,
    };

    handleARCameraClick = () => {
        // if user is not at the next location and manual mode is off, then dont send the data to the AR Component
        // if manual mode is on, then irresepective of whether the user is at the next location, load the data to the AR component

        if (this.state.manual_mode === true) {
            // pass the current location track data
            let location_data = this.state.track[this.state.current_challenge_index];
            console.log('sENDING location data ', location_data)
        } else if (this.state.manual_mode === false && this.state.userIsInVicinityOfNextLocation === true) {
            let location_data = this.state.track[this.state.current_challenge_index];
        }
    }

    render = () => {

        return (
            <View style={[styles.container]} >
                <View style={{
                    flex: 10
                }}>
                    <View
                        // style={styles.container}
                        style={{
                            flex: 1,
                        }}
                    >
                        <View
                            style={{
                                flex: 1,
                                flexDirection: 'column',
                                justifyContent: 'space-between'
                            }}
                        >
                            <View>
                                <Text style={{ flex: 1, fontSize: 25, fontWeight: '100' }}>AR Tour</Text>
                            </View>

                            <View style={{
                                flex: 9,
                                backgroundColor: 'powderblue'
                            }}>
                                <GameMap visitingSpots={this.state.track} next_index={this.state.current_challenge_index} handleMarkerClick={() => { this.handleMarkerClick }} />
                            </View>
                        </View>

                    </View >
                </View>
                <View style={{ flex: 1 }}>
                    <Button
                        style={[styles.startTripButtonStyle]}
                        onPress={() => {
                            this.goToNextLocation()
                        }}
                        color="red"
                        title="AR View"
                    />

                </View>


            </View >
        )
    }
}

MapScreen.navigationOptions = {
    header: null,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 15
    },
    contentContainer: {
        paddingTop: 30,
    },
    startTripButtonStyle: {
        backgroundColor: 'red',

    }
})