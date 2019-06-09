import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import {
    ViroScene,
    ViroImage,
    ViroText,
    Viro360Image,
    ViroFlexView,
} from 'react-viro';

class Info extends Component {
    render() {
        const { text, position, rotation, customStyles, title } = this.props;
        return (
            <ViroFlexView style={[styles.infoContainer, customStyles]} position={position} rotation={rotation} height={3} width={5} >
                <ViroText style={styles.title} text={title} />
                <ViroText style={styles.description} text={text} />
            </ViroFlexView>
        )
    }
}


var styles = StyleSheet.create({
    rowContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    description: {
        fontFamily: 'sans-serif-light',
        fontSize: 30,
        color: '#222222',
        // textAlignVertical: 'center',
        textAlign: 'left',
        flex: 2,
    },
    title: {
        fontFamily: 'sans-serif-light',
        fontSize: 40,
        color: '#222222',
        // textAlignVertical: 'center',
        textAlign: 'left',
        flex: 1,
    },
    infoContainer: {
        flexDirection: 'column',
        backgroundColor: "#ffffffdd",
        padding: .2,
    },
});

export default Info;