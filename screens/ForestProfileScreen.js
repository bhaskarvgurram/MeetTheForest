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
import { Card, ListItem, Button, Icon, Divider, Header } from 'react-native-elements'
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

    handleStartTrip = () => {
        console.log('handle startt trip');
        this.props.navigation.navigate('Map');
    }

    render = () => {


        return (
            <View style={[styles.container]} >
                <Header
                    //   leftComponent={{ icon: 'menu', color: '#fff' }}
                    centerComponent={{ text: 'Profile', style: { color: '#fff' } }}
                //   rightComponent={{ icon: 'home', color: '#fff' }}
                />
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
                            <Card containerStyle={{ padding: 0 }}
                                title='Yosemite National Park'
                                image={require('./../assets/images/yosemite.jpg')}>
                                <Text style={{ marginBottom: 10, textAlign: 'center' }}>
                                    I am one of the most beautiful places to visit in the United States. Located in western Sierra Nevada of Central California.
                                </Text>
                                <Divider style={{ backgroundColor: '#72bcd4' }} />
                                {/* <Button
                                    icon={<Icon name='code' color='#ffffff' />}
                                    backgroundColor='#03A9F4'
                                    buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                                    title='VIEW NOW' /> */}
                                    <Text style={{ fontSize:'14' , marginBottom: 5 }}>
                                        Address : <Text style={{ fontSize:'16'}}> California</Text>
                                    </Text>
                                    <Text style={{ fontSize:'14' , marginBottom: 5 }}>
                                        Established : <Text style={{ fontSize:'16'}}> 1991</Text>
                                    </Text>
                                    <Text style={{ fontSize:'14' , marginBottom: 5 }}>
                                        Timings : <Text style={{ fontSize:'16'}}> 9 AM - 6 PM</Text>
                                    </Text>
                                    <Text style={{ fontSize:'14' , marginBottom: 5 }}>
                                        Region : <Text style={{ fontSize:'16'}}> Yosemite National Forest</Text>
                                    </Text>
                                    <Text style={{ fontSize:'14' , marginBottom: 5 }}>
                                        Weather : <Text style={{ fontSize:'16'}}> 32 C - Rainy</Text>
                                    </Text>
                                    <Text style={{ fontSize:'14' , marginBottom: 5 }}>
                                        Alerts : <Text style={{ fontSize:'16',color:'#ff0000'}}> Roads Closed Due to Weather</Text>
                                    </Text>
                                
                            </Card>
                            {/* <View>
                                <Text style={{ fontSize: 25, fontWeight: '100' }}>Yosemite National Park</Text>
                            </View>

                            <View>
                                <Text style={{ fontSize: 15 }}> I am one of the most beautiful places to visit in the United States. Located in western Sierra Nevada of Central California. </Text>
                            </View> */}
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