// import Tts from "./../node_modules/react-native-tts/index";
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
} from 'react-native';
import { Card, ListItem, Button, Icon, Divider, Header, CheckBox } from 'react-native-elements'
import { MonoText } from '../components/StyledText';
const users = [
    {
        name: 'brynn',
        avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
    }, {
        name: 'brynn',
        avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
    }
]
export class ForestProfileScreen extends React.Component {

    navigationOptions = {
        header: null,
    };

    state = {
        guideChecked: false,
        gameChecked: false,
    }
    handleStartTrip = () => {
        this.props.navigation.navigate('Map');
    }
    changeGuideChecked = () => {
        this.setState({
            guideChecked: !this.state.guideChecked
        })
    }

    componentDidMount = () => {
        // let t = new Tts();
        // t.getInitStatus().then(() => {
        //     t.speak('Hello Vinit, I am one of the most beautiful places to visit');
        // });
    }

    changeGameChecked = () => {
        this.setState({
            gameChecked: !this.state.gameChecked
        })
    }
    navigateToIssuesScreen = (_id) => {
        console.log('Navigate to Issues profile ...... -----', _id)
        console.log('pROPS ', this.props);
        this.props.navigation.navigate('Issues');
    }

    render = () => {


        return (
            <View style={[styles.container]} >
                <View style={{
                    flex: 10

                }}>

                    <ScrollView
                        showsHorizontalScrollIndicator={false}
                    // style={styles.container}
                    >


                        <View
                            style={{
                                flex: 1,
                                flexDirection: 'column',
                                justifyContent: 'flex-start'
                            }}
                        >
                            <Text style={{ marginTop: 20, marginBottom: 5, fontSize: 20, textAlign: 'center' }}>
                                Yosemite National Forest
                                </Text>
                            <Image
                                source={require('./../assets/images/yosemite.jpg')}
                                style={{ width: '100%', marginTop: 20, height: 200 }}
                            />

                            <Text style={{ marginTop: 10, marginBottom: 10, textAlign: 'center' }}>
                                I am one of the most beautiful places to visit in the United States. Located in western Sierra Nevada of Central California.
                                </Text>
                            <Divider style={{ backgroundColor: '#72bcd4' }} />
                            {/* <Button
                                    icon={<Icon name='code' color='#ffffff' />}
                                    backgroundColor='#03A9F4'
                                    buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                                    title='VIEW NOW' /> */}
                            <Text style={{ fontSize: 14, marginBottom: 5 }}>
                                Address         : <Text style={{ fontSize: 16 }}> California</Text>
                            </Text>
                            <Text style={{ fontSize: 14, marginBottom: 5 }}>
                                Established     : <Text style={{ fontSize: 16 }}> 1991</Text>
                            </Text>
                            <Text style={{ fontSize: 14, marginBottom: 5 }}>
                                Timings         : <Text style={{ fontSize: 16 }}> 9 AM - 6 PM</Text>
                            </Text>
                            <Text style={{ fontSize: 14, marginBottom: 5 }}>
                                Region          : <Text style={{ fontSize: 16 }}> Yosemite National Forest</Text>
                            </Text>
                            <Text style={{ fontSize: 14, marginBottom: 5 }}>
                                Weather         : <Text style={{ fontSize: 16 }}> 32 C - Rainy</Text>
                            </Text>
                            <Text style={{ fontSize: 14, marginBottom: 5 }}>
                                Alerts          : <Text style={{ fontSize: 16, color: '#ff0000' }}> Roads Closed Due to Weather</Text>
                            </Text>
                            <Divider style={{ backgroundColor: '#72bcd4' }} />
                            <Text style={{ fontSize: 14, marginTop: 10, marginBottom: 10 }}>
                                Important Links
                            </Text>
                            <View style={{
                                flex: 1,
                                flexDirection: "row",
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <View style={{
                                    flex: 1,
                                }}>
                                    <Button
                                        title="Directions"
                                        type="clear"
                                    />
                                </View>
                                <View style={{
                                    flex: 1,
                                }}>
                                    <Button
                                        title="Issues"
                                        type="clear"
                                        onPress={() => {
                                            this.navigateToIssuesScreen()
                                        }}
                                    />
                                </View>
                                <View style={{
                                    flex: 1,
                                }}>
                                    <Button
                                        title="More Info"
                                        type="clear"
                                    />
                                </View>
                            </View>
                            <Divider style={{ backgroundColor: '#72bcd4' }} />
                            <Text style={{ fontSize: 14, marginTop: 10, marginBottom: 10 }}>
                                What I also do is host games and guided tours. What would you like to do today ?
                            </Text>
                            <View style={{
                                flex: 1,
                                flexDirection: "row",
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <View style={{
                                    flex: 1,
                                }}>
                                    <CheckBox
                                        title='Guided Tour'
                                        checked={this.state.guideChecked}
                                        onPress={() => {
                                            this.changeGuideChecked()
                                        }}
                                    /></View>

                                <View style={{
                                    flex: 1,
                                }}>
                                    <CheckBox
                                        title='Play Game'
                                        checked={this.state.gameChecked}
                                        onPress={() => {
                                            this.changeGameChecked()
                                        }}
                                    /></View>
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