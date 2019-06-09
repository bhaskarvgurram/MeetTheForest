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
    WebView
} from 'react-native';
import { Card, ListItem, Button, Icon, Divider, Header, CheckBox, FlatList } from 'react-native-elements'

export class DonationScreen extends React.Component {

    state = {
        webview: false
    }

    navigationOptions = {
        header: null,
    };
    handleOpen = () => {
        this.setState({
            webview: true
        });
    }
    handleClose = () => {
        this.setState({
            webview: false
        });
    }
    handleEndTrip = () => {
        this.props.navigation.navigate('Home');
    }
    render = () => {

        const { webview } = this.state
        return (
            webview
                ? <View style={styles.webViewContainer}>
                    <Button onPress={this.handleClose} title="Close" style={styles.button} />
                    <WebView source={{ uri: 'https://secure.wilderness.org/page/30980/donate/1' }}
                    />
                </View>
                : <View style={[styles.container]} >
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
                                <Text style={{ marginTop: 10, marginBottom: 10, textAlign: 'left' }}>
                                    There are many ways you can give to help protect wilderness.
                                </Text>
                                <Text style={{ textAlign: 'center' }}>
                                    * Giving through your Will *
                                </Text>
                                <Text style={{ textAlign: 'center' }}>
                                    * IRA Charitable Rollover *
                                </Text>
                                <Text style={{ textAlign: 'center' }}>
                                   * Giving at Work *
                                   
                                </Text>
                                <Text style={{ textAlign: 'center' }}>
                                   * Contribute Mutual Fund Shares *
                                </Text>
                                <Divider style={{ backgroundColor: '#72bcd4' }} />
                                <Card
                                    title='Fight for Wilderness'>
                                    <Text style={{ marginBottom: 10 }}>
                                        Donate now to protect public lands and take a stand for conservation.
                                </Text>
                                    <Text style={{ marginBottom: 10 }}>
                                        The Wilderness Society is a 501(c)(3) charitable organization.
                                         Your donation to The Wilderness Society is tax deductible to the extent allowed by law.
                                </Text>
                                    <Text style={{ marginBottom: 10, fontSize: 18 }}>
                                        Donation Received : $21,120
                                </Text>
                                    <Button
                                        icon={<Icon name='code' color='#ffffff' />}
                                        backgroundColor='#03A9F4'
                                        buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                                        title=' Donate Now'
                                        onPress={() => {
                                            this.handleOpen()
                                        }} />
                                </Card>

                            </View>

                        </ScrollView >
                    </View>

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

    },
    webViewContainer: {
        flex: 2,
        flexDirection: "column"
    },
    button: {
        flex: 1
    }
})