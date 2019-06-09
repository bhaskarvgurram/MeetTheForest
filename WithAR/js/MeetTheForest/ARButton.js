import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import {
    ViroScene,
    ViroImage,
    ViroText,
    Viro360Image,
    ViroFlexView,
} from 'react-viro';

class ARButton extends Component {

    render() {
        const { position, text, rotation, height, width } = this.props;
        return (
            <ViroFlexView style={styles.infoContainer} position={position} rotation={rotation} height={height} width={width} >
                {/* <ViroText style={styles.prodTitleText} text="Hello" width={4} height={.5} /> */}
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
        fontSize: 20,
        color: '#222222',
        textAlignVertical: 'center',
        textAlign: 'center',
        flex: 1,
  
    },
    infoContainer: {
        flexDirection: 'column',
        backgroundColor: "#fff",
        padding: .1,
        borderWidth: 0.5,
        borderRadius: 4,
        borderColor: '#F44336dd',
    },
});


export default ARButton;