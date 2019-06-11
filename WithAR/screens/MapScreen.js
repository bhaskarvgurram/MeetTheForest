// import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Button,
} from 'react-native';

import { track, visitingSpots } from './tracks';
import Map from './../components/Map';
import GameMap from './../components/GameMap';
import Main from '../js/MeetTheForest/Main'

export class MapScreen extends React.Component {
    state = {
        manual_mode: true,
        arView: false,
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

    handleMarkerClick = (i) => {
        console.log('In handle marker click ');
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
            this.setState({
                location_data,
                arView: true
            }, () => {
                this.goToNextLocation();
            })
            console.log('sENDING location data ', location_data)
        } else if (this.state.manual_mode === false && this.state.userIsInVicinityOfNextLocation === true) {
            let location_data = this.state.track[this.state.current_challenge_index];
        }
    }

    handleExit = (points) => {
        console.log(points)
        this.setState({
            arView: false,
            score: this.state.score + points
        })
    }

    render = () => {
        // console.log('This state track ', this.state.track);
        const { location_data, arView, score } = this.state;
        return (
            <>
                {
                    !arView ?
                        <View style={[styles.container]} >
                            <Text style={{ fontSize: 23, fontWeight: '300'}}>The Tour</Text>
                            <Text style={styles.score}> Score : {score}</Text>
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
                                            <GameMap visitingSpots={this.state.track} next_index={this.state.current_challenge_index} handleMarkerClick={(i) => { this.handleMarkerClick(i) }} />
                                        </View>
                                    </View>

                                </View >
                            </View>
                            <View style={{ flex: 1, marginTop: 10 }}>
                                <Button
                                    style={[styles.startTripButtonStyle]}
                                    onPress={this.handleARCameraClick}
                                    color="blue"
                                    title="AR View"
                                />
                              

                            </View>
                            <View style={{ flex: 1 }}>
                              
                                <Button 
                                    style={[styles.startTripButtonStyle]}
                                    onPress={() => this.props.navigation.navigate("Summary")}
                                    color="red"
                                    title="End Trip"
                                />

                            </View>


                        </View > :
                        <Main sharedProps={{
                            apiKey: "07219155-6F29-4D01-BA89-4109AA4DFF1D"
                        }}
                            location_data={location_data}
                            handleExit={this.handleExit}
                        />
                }
            </>
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
    score: {
        flex: 1,
        fontSize: 18
    },
    startTripButtonStyle: {
        backgroundColor: 'red',
        margin: 20,
        flex: 1
    }
})