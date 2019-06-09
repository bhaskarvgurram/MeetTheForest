// import Tts from "./../node_modules/react-native-tts/index";
// import * as WebBrowser from 'expo-web-browser';
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
const list = [
    {
        name: 'Amy Farha',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        subtitle: 'Visited 3 days ago'
    },
    {
        name: 'Chris Jackson',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        subtitle: 'Scored a complete score'
    }
]

import { MonoText } from '../components/StyledText';
export class ScoreSummaryScreen extends React.Component {

    navigationOptions = {
        header: null,
    };

    handleEndTrip = () => {
        this.props.navigation.navigate('Home');
    }
    navigateToIssuesScreen = (_id) => {
        console.log('Navigate to Issues profile ...... -----', _id)
        console.log('pROPS ', this.props);
        this.props.navigation.navigate('Issues');
    }
    navigateToDonationScreen = (_id) => {
        console.log('Navigate to DOnation profile ...... -----', _id)
        console.log('pROPS ', this.props);
        this.props.navigation.navigate('Donation');
    }
    ratingCompleted = () => {
        console.log("Rating Complete")
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
                            <Text style={{ marginTop: 30, marginBottom: 5, fontSize: 20, textAlign: 'center' }}>
                                Yosemite National Forest
                                </Text>
                            <Text style={{ fontSize: 16,marginTop: 10, textAlign: 'center' }}>
                                Rate Me:
                                </Text>
                            <Rating
                                showRating
                                onFinishRating={this.ratingCompleted}
                                style={{ paddingVertical: 10 }}
                            />
                            <Text style={{ marginTop: 10, fontSize: 23, textAlign: 'center' }}>
                                Your Score : 7 / 10
                                </Text>
                            <Text style={{ marginTop: 10, marginBottom: 10, textAlign: 'center' }}>
                                Thank you for visiting. You can contribute ....
                                </Text>
                            <Divider style={{ backgroundColor: '#72bcd4' }} />
                            <Text style={{ marginTop: 20, fontSize: 15, textAlign: 'left' }}>
                                Connect with fellow travellers
                                </Text>

                            <View>
                                {
                                    list.map((item, i) => (
                                        <ListItem
                                            key={i}
                                            title={item.name}
                                            subtitle={item.subtitle}
                                            leftAvatar={{ source: { uri: item.avatar_url } }}
                                            rightIcon={<SocialIcon type='twitter' />
                                            }
                                        />
                                    ))
                                }
                            </View>
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
                                        title="Donations"
                                        type="clear"
                                        onPress={() => {
                                            this.navigateToDonationScreen()
                                        }}
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
                        </View>

                    </ScrollView >
                </View>
                <View style={{
                    flex: 1
                }}>
                    <Button
                        style={[styles.startTripButtonStyle]}
                        onPress={() => {
                            this.handleEndTrip()
                        }}
                        color="red"
                        title="End Trip"
                    />

                </View>

            </View >
        )
    }
}

ScoreSummaryScreen.navigationOptions = {
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