import React, { Component } from 'react';
import {StyleSheet} from 'react-native';
import {
    ViroScene,
    ViroImage,
    ViroText,
    Viro360Image,
    ViroFlexView,
    ViroVideo,
    Viro3DObject,
    ViroMaterials,
    ViroCamera,
    ViroOrbitCamera,
    ViroNode,
    ViroDirectionalLight,
    ViroAnimations,
    ViroBox,
    ViroButton,
    ViroSurface,
    ViroARScene
} from 'react-viro';

class Test extends Component {
    render() {
        return (
            <ViroARScene>
                <ViroFlexView style={styles.titleContainer} position={[0, 1, -7]} rotation={[0, 20, 0]} height={2} width={4} >
                    <ViroText style={styles.prodTitleText} text="Hello" width={4} height={.5} />
                    <ViroText style={styles.prodDescriptionText} text="World" />
                </ViroFlexView>
            </ViroARScene>
        )
    }
}

var styles = StyleSheet.create({
    rowContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    prodTitleText: {
        fontFamily: 'sans-serif-light',
        fontSize: 30,
        color: '#222222',
        textAlignVertical: 'center',
        textAlign: 'left',
    },
    priceText: {
        fontFamily: 'sans-serif-light',
        fontSize: 20,
        color: '#aa3c3c',
        textAlignVertical: 'center',
        textAlign: 'left',
        flex: 4,
    },
    prodDescriptionText: {
        fontFamily: 'sans-serif-light',
        fontSize: 20,
        color: '#222222',
        textAlignVertical: 'center',
        textAlign: 'left',
        flex: 1,
    },
    titleContainer: {
        flexDirection: 'column',
        backgroundColor: "#ffffffdd",
        padding: .2,
    },
    navButtonText: {
        fontFamily: 'sans-serif-light',
        fontSize: 15,
        color: '#ffffff',
        textAlignVertical: 'center',
        textAlign: 'center',
        flex: 1,
    },
});

module.exports = Test;