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

import { MonoText } from '../components/StyledText';

export class ForestProfileScreen extends React.Component {

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
                                <Text style={{ fontSize: 25, fontWeight: '100' }}>Yosemite National Park</Text>
                            </View>

                            <View>
                                <Text style={{ fontSize: 15 }}> I am one of the most beautiful places to visit in the United States. Located in western Sierra Nevada of Central California. </Text>
                            </View>
                        </View>

                    </ScrollView >
                </View>
                <View style={{
                    flex: 1
                }}>
                    <Button
                        style={[styles.startTripButtonStyle]}
                        onPress={() => {
                            this.handleStartTrip()
                        }}
                        color="red"
                        title="Start Trip"
                    />

                </View>

            </View >
        )
    }
}

ForestProfileScreen.navigationOptions = {
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