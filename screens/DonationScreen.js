// import Tts from "./../node_modules/react-native-tts/index";
import * as WebBrowser from 'expo-web-browser';
import { Rating, SocialIcon } from 'react-native-elements';
import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { Card, ListItem, Button, Icon, Divider, Header, CheckBox, FlatList } from 'react-native-elements'

export class DonationScreen extends React.Component {

    navigationOptions = {
        header: null,
    };

    handleEndTrip = () => {
        this.props.navigation.navigate('Home');
    }
    render = () => {


        return (
            <View style={[styles.container]} >
                <View style={{
                    flex: 10
                }}>
                    <ScrollView>
                        <View
                            style={{
                                flex: 1,
                                flexDirection: 'column',
                                justifyContent: 'flex-start'
                            }}
                        >
                            <Text style={{ marginTop: 30, marginBottom: 0, fontSize: 20, textAlign: 'center' }}>
                                Yosemite National Forest
                            </Text>
                            <Text style={{ marginTop: 0, marginBottom: 20, fontSize: 20, textAlign: 'center' }}>
                                Donation Drive
                            </Text>
                            <Divider style={{ backgroundColor: '#72bcd4' }} />
                            <Text style={{ marginTop: 10, marginBottom: 10, textAlign: 'center' }}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                </Text>
                            <Divider style={{ backgroundColor: '#72bcd4' }} />
                            <Card
                                title='Donate to National Forest'>
                                <Text style={{ marginBottom: 10 }}>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex...
                                </Text>
                                <Text style={{ marginBottom: 10 ,fontSize:18}}>
                                    Donation Received : $18,020
                                </Text>
                                <Button
                                    icon={<Icon name='code' color='#ffffff' />}
                                    backgroundColor='#03A9F4'
                                    buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                                    title=' Donate Now' />
                            </Card>
                            <Card
                                title='Donate to Wilderness Group'>
                                <Text style={{ marginBottom: 10 }}>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation...
                                </Text>
                                <Text style={{ marginBottom: 10 ,fontSize:18}}>
                                    Donation Received : $21,120
                                </Text>
                                <Button
                                    icon={<Icon name='code' color='#ffffff' />}
                                    backgroundColor='#03A9F4'
                                    buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                                    title=' Donate Now' />
                            </Card>

                        </View>

                    </ScrollView >
                </View>
                {/* <View style={{
                    flex: 1
                }}>
                    <Button
                        style={[styles.startTripButtonStyle]}
                        onPress={() => {
                            this.handleEndTrip()
                        }}
                        color="red"
                        title="Contribute Now"
                    />

                </View> */}

            </View >
        )
    }
}

DonationScreen.navigationOptions = {
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