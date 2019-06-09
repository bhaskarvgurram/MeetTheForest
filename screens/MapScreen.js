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

export class MapScreen extends React.Component {
    state = {
        track: [{
            latitude: "37.7908536",
            longitude: "-122.3967217",
            completed: false,
            alerts: ["Honking here is fined at $500", "Beware of pickpockets around this neighborhood"],
            info_messages: ["Galvanize- The learning community for technology", "This is the docusign hackathon"],
            game_messages: [{
                question: "What is the tallest building you see around here?",
                answer: "Salesforce Tower"
            }, {
                question: "What is the elephant on the terrace made of?",
                answer: "Junk",
            }],
            docusign_messages: [{
                title: "Save me",
                message: "Would you like to save me from the deforestration and senseless mining, drilling and land clearing activities. My health is deteriorating. Please sign this petition to save me."
            }, {
                title: "Roadless Area Protection",
                message: "Vast regions of my lands are under threat from the subversion of the Roadless Areas Protection Act by the current law makers. You can save me by signing this petition."
            }]
        }],
        current_challenge_index: 0,

    }

    componentWillMount = () => {
        console.log('In cwm in ', this.state);
    }

    navigationOptions = {
        header: null,
    };

    handleStartTrip = () => {
        this.props.navigation.navigate('Map');
    }

    render = () => {


        return (
            <View style={[styles.container]} >
                <View style={{
                    flex: 10
                }}>
                    <ScrollView
                    // style={styles.container}
                    >
                        <View
                            style={{
                                flex: 1,
                                flexDirection: 'column',
                                justifyContent: 'flex-start'
                            }}
                        >
                            <View>
                                <Text style={{ flex: 1, fontSize: 25, fontWeight: '100' }}>Game Map</Text>
                            </View>

                            <View style={{
                                flex: 9,
                                backgroundColor: 'powderblue'
                            }}>
                                <Text style={{ fontSize: 15 }}> Game Map will come here </Text>
                            </View>
                        </View>

                    </ScrollView >
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