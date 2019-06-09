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

import { MonoText } from '../components/StyledText';

export class HomeScreen extends React.Component {

  navigateToForestProfile = (_id) => {
    console.log('Navigate to forest profile ...... -----', _id)
    console.log('pROPS ', this.props);
    this.props.navigation.navigate('ForestProfile');
  }
  render = () => {
    return (
      <View style={[styles.container]} >
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Image
              source={
                __DEV__
                  ? require('../assets/images/wilderness_society_logo.jpeg')
                  : require('../assets/images/wilderness_society_logo.jpeg')
              }
              style={styles.welcomeImage}
            />
          </View>

          <View style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'stretch',
          }}>
            <View style={{
              flex: 1,
              flexDirection: 'row',
              margin: 15
            }}>
              <Text style={{ fontSize: 20 }}>Nature in California</Text>
            </View>

            <View style={{
              flex: 1,
              flexDirection: 'row',
              height: 120
            }}>

              <TouchableOpacity style={[styles.locationTile]}>

                <Image style={{ flex: 15, height: 120, width: 150 }} source={require('../assets/images/sequoia.jpg')}>

                </Image>
                <View style={{ flex: 1 }}>
                  <Text>Sequoia National Park</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => { this.navigateToForestProfile('yosemite') }} style={[styles.locationTile]}>

                <Image style={{ flex: 15, height: 120, width: 150 }} source={require('../assets/images/yosemite.jpg')}>

                </Image>
                <View style={{ flex: 1 }}>
                  <Text>Yosemite National Park</Text>
                </View>
              </TouchableOpacity>
            </View>

          </View>


          <View style={{
            flex: 1,
            flexDirection: 'row',
            height: 120
          }}>
            <TouchableOpacity style={[styles.locationTile]}>


              <Image style={{ flex: 15, height: 120, width: 150 }} source={require('../assets/images/tahoe.jpg')}>

              </Image>
              <View style={{ flex: 1 }}>
                <Text>Lake Tahoe</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.locationTile]}>

              <Image style={{ flex: 15, height: 120, width: 150 }} source={require('../assets/images/napavalley.jpg')}>

              </Image>
              <View style={{ flex: 1 }}>
                <Text>Napa Valley</Text>
              </View>
            </TouchableOpacity>
          </View>




          <View style={{
            flex: 1,
            flexDirection: 'row',
            height: 120
          }}>

            <TouchableOpacity style={[styles.locationTile]}>

              <Image style={{ flex: 15, height: 120, width: 150 }} source={require('../assets/images/joshuatree.jpg')}>

              </Image>
              <View style={{ flex: 1 }}>
                <Text>Joshua Tree National Park</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.locationTile]}>

              <Image style={{ flex: 15, height: 120, width: 150 }} source={require('../assets/images/emerald_bay.jpeg')}>

              </Image>
              <View style={{ flex: 1 }}>
                <Text>Emerald Bay</Text>
              </View>
            </TouchableOpacity>
          </View>



        </ScrollView>

      </View >
    );
  }
}

HomeScreen.navigationOptions = {
  header: null,
};



function handleLearnMorePress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/development-mode/'
  );
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/up-and-running/#cant-see-your-changes'
  );
}

const styles = StyleSheet.create({

  locationTile: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    padding: 5,
    margin: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  }
});
