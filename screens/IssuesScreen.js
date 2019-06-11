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

export class IssuesScreen extends React.Component {

    navigationOptions = {
        header: null,
    };
    state = {
        webview: false
    }
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
            webview ? 
            <View style={styles.webViewContainer}>
            <Button onPress={this.handleClose} title="Close" style={styles.button} />
            <WebView source={{ uri: 'http://10.0.0.85:3000/signIssue' }}
            />
        </View>:
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
                                Ongoing Issues
                            </Text>
                            <Divider style={{ backgroundColor: '#72bcd4' }} />
                            <Text style={{ marginTop: 10, marginBottom: 10, textAlign: 'center' }}>
                                As an American, you own 618 million acres of wild public lands, including our national parks and forests, wildlife refuges and federally managed desert and prairie lands. Many of these wildlands are at risk from poor management decisions that favor development over conservation. We all have a stake in seeing these lands conserved.
                            </Text>
                            <Divider style={{ backgroundColor: '#72bcd4' }} />
                            <Card
                                title='Land and Water Conservation'>
                                <Text style={{ marginBottom: 10 }}>
                                    We advocate for the protection of public lands and waters, including by working with lawmakers to give these places special status as wilderness or national monuments, fighting against development in sensitive areas ...
                                </Text>
                                <Text style={{ marginBottom: 10 ,fontSize:18}}>
                                    Supporters : 1,287
                                </Text>
                                <Button
                                    icon={<Icon name='code' color='#ffffff' />}
                                    backgroundColor='#03A9F4'
                                    buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                                    title=' Support'
                                    onPress={this.handleOpen} />
                            </Card>
                            <Card
                                title='People And Nature'>
                                <Text style={{ marginBottom: 10 }}>
                                    We are working on programs that break down barriers to accessing and enjoying public lands, including asking elected officials to create policies and programs that make it easier for everyone ...
                                </Text>
                                <Text style={{ marginBottom: 10 ,fontSize:18}}>
                                    Supporters : 2,463
                                </Text>
                                <Button
                                    icon={<Icon name='code' color='#ffffff' />}
                                    backgroundColor='#03A9F4'
                                    buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                                    title=' Support' 
                                    onPress={this.handleOpen}/>
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

IssuesScreen.navigationOptions = {
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