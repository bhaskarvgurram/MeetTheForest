import React, { Component } from 'react';
import { StyleSheet, WebView, View, Button } from 'react-native';
import Tts from 'react-native-tts';

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
    ViroAmbientLight,
    ViroSpotLight,
    ViroARScene,
    ViroARSceneNavigator
} from 'react-viro';
import Info from './Info';
import ARButton from './ARButton';

class Main extends Component {
    state = {
        webview: false
    }
    handleAccept = () => {
        this.setState({
            webview: true
        })
    }
    handleClose = () => {
        console.log("close")
        this.setState({
            webview: false
        })
    }
    render() {
        const { webview } = this.state
        const { location_data, handleExit } = this.props;
        return (
            <>
                {
                    webview ?
                        <View style={styles.webViewContainer}>
                            <Button onPress={this.handleClose} title="Close" style={styles.button} />
                            <WebView source={{ uri: 'http://10.3.17.65:3000/signIssue' }}
                            />
                        </View> :
                        <ViroARSceneNavigator {...this.props.sharedProps}
                            initialScene={{ scene: InitialARScene }}
                            viroAppProps={{
                                handleAccept: this.handleAccept,
                                location_data,
                                handleExit
                            }}
                        />
                }
            </>

        )
    }
}
class InitialARScene extends Component {
    constructor(props) {
        super(props)
        const { location_data } = props.sceneNavigator.viroAppProps;
        this.state = {
            messages: location_data.info_messages,
            activeMessage: 0,
            cautions: location_data.alerts,
            activeCaution: 0,
            docusignInfo: location_data.docusign_messages[0].message,
            quiz: {
                question: "Which number is the best?",
                option1: "option1",
                option2: "option2",
                option3: "option3",
                answer: "option1"
            },
            points: 0,
            object: true
        }
    }
    componentDidMount() {
        this.speak();
    }

    speak = () => {
        const { activeMessage, messages } = this.state;
        Tts.getInitStatus().then(() => {
            Tts.speak(messages[activeMessage]);
        });
    }
    handleNextMessage = () => {
        console.log("next message")
        const { messages, activeMessage } = this.state;
        console.log("Message", activeMessage, messages.length, messages.length >= activeMessage)
        if (messages.length === activeMessage - 1) return;
        this.setState({
            activeMessage: activeMessage + 1
        }, () => {
            this.speak();
        })
    }
    handlePreviousMessage = () => {
        const { messages, activeMessage } = this.state;
        if (activeMessage - 1 < 0) return;
        this.setState({
            activeMessage: activeMessage - 1
        }, () => {
            this.speak();
        })
    }

    handleNextCaution = () => {
        console.log("next message")
        const { cautions, activeCaution } = this.state;
        console.log("Message", activeCaution, cautions.length, cautions.length >= activeCaution)
        if (cautions.length === activeCaution - 1) return;
        this.setState({
            activeCaution: activeCaution + 1
        })
    }
    handlePreviousCaution = () => {
        const { cautions, activeCaution } = this.state;
        if (activeCaution - 1 < 0) return;
        this.setState({
            activeCaution: activeCaution - 1
        })
    }

    handleAccept = () => {
        console.log("doc")
        this.props.sceneNavigator.viroAppProps.handleAccept();
    }

    getCautionMessages = () => {
        const { cautions, activeCaution } = this.state;
        if (cautions.length > 0)
            return (
                <>
                    <Info text={cautions[activeCaution]} position={[5, 1, -10]}
                        rotation={[0, -30, 0]} customStyles={styles.infoContainer} title="Alert"/>
                    {
                        cautions.length > 1 ?
                            <>
                                {
                                    activeCaution > 0 ?
                                        <ViroNode onClick={() => this.handlePreviousCaution()}>
                                            <ARButton position={[3.2, -1.2, -11]} rotation={[0, -30, 0]} text="Previous" height={0.5} width={1} />

                                        </ViroNode> : null
                                }
                                {
                                    activeCaution !== cautions.length - 1 ?
                                        <ViroNode onClick={() => this.handleNextCaution()}>
                                            <ARButton position={[7.5, -1.1, -10]} Ï rotation={[0, -30, 0]} text="Next" height={0.5} width={1} />
                                        </ViroNode> : null
                                }

                            </> :
                            null
                    }
                </>
            )
    }

    getMessages = () => {
        const { messages, activeMessage } = this.state;
        if (messages.length > 0) {
            return (
                <>
                    <Info text={messages[activeMessage]} position={[-5, 1, -10]}
                        rotation={[0, 30, 0]} title="Info"/>
                    {
                        messages.length > 1 ?
                            <>
                                {
                                    activeMessage > 0 ?
                                        <ViroNode onClick={() => this.handlePreviousMessage()}>
                                            <ARButton position={[-7.5, -1.2, -10]} rotation={[0, 30, 0]} text="Previous" height={0.5} width={1} />

                                        </ViroNode> : null
                                }
                                {
                                    activeMessage !== messages.length - 1 ?
                                        <ViroNode onClick={() => this.handleNextMessage()}>
                                            <ARButton position={[-3.2, -1.1, -11]} Ï rotation={[0, 30, 0]} text="Next" height={0.5} width={1} />
                                        </ViroNode> : null
                                }

                            </> :
                            null
                    }
                </>
            )
        }

    }

    getDocusignInfo = () => {
        const { docusignInfo } = this.state;
        if (docusignInfo) {
            return (
                <>
                    <Info text={docusignInfo} position={[5, 1, 10]}
                        rotation={[0, -150, 0]} title="Docusign" />

                    <ViroNode onClick={() => this.handleAccept()}>
                        <ARButton position={[3, -1.2, 10]} rotation={[0, -150, 0]} text="Accept" height={0.5} width={1} />

                    </ViroNode>

                </>
            )
        }
    }

    handleAnswer = (selected) => {
        const { quiz } = this.state;
        let points = 0;
        console.log(selected, selected === quiz["answer"])
        if(selected === quiz["answer"]) {
            points = 1;
        }
        this.setState({
            quiz: null,
            points
        })
    }

    getQuizInfo = () => {
        const { quiz } = this.state;
        if (quiz) {
            return (
                <>
                    <Info text={quiz.question} position={[-5, 1, 10]}
                        rotation={[0, -210, 0]} title="Quiz"/>

                    <ViroNode onClick={() => this.handleAnswer(quiz["option1"])}>
                        <ARButton position={[-3.2, -1.2, 10]} rotation={[0, -210, 0]} text={quiz["option1"]} height={0.5} width={1.5} />

                    </ViroNode>
                    <ViroNode onClick={() => this.handleAnswer(quiz["option2"])}>
                        <ARButton position={[-4.5, -1.2, 8.8]} rotation={[0, -210, 0]} text={quiz["option2"]} height={0.5} width={1.5} />

                    </ViroNode>
                    <ViroNode onClick={() => this.handleAnswer(quiz["option3"])}>
                        <ARButton position={[-6.5, -1.3, 8.8]} rotation={[0, -210, 0]} text={quiz["option3"]} height={0.5} width={1.5} />

                    </ViroNode>

                </>
            )
        }
    }

    getExitButton = () => {

        return <ViroNode onClick={() => this.props.sceneNavigator.viroAppProps.handleExit(this.state.points)}>
            <ARButton position={[0, -1.2, -7]} rotation={[0, 0, 0]} text="Exit" height={0.5} width={1} />
        </ViroNode>
    }
    handleObjectClick = () => {
        this.setState({
            object: false
        })
    }
    getObject = () => {
        const { object } = this.state
        return <>
            {
                object ?
                    <>
                        <ViroAmbientLight color={"#aaaaaa"} />
                        <ViroSpotLight innerAngle={5} outerAngle={90} direction={[0, -1, -.2]}
                            position={[0, 3, 1]} color="#ffffff" castsShadow={true} />
                        <ViroNode onClick={this.handleObjectClick}>
                            <Viro3DObject
                                source={require('../res/emoji_smile/emoji_smile.vrx')}
                                resources={[require('../res/emoji_smile/emoji_smile_diffuse.png'),
                                require('../res/emoji_smile/emoji_smile_normal.png'),
                                require('../res/emoji_smile/emoji_smile_specular.png')]}
                                position={[-.5, .5, -1]}
                                scale={[.2, .2, .2]}
                                type="VRX" />
                        </ViroNode>
                    </> :
                    <ViroText position={[-.5, .3, -1]} text="found" />
            }
        </>
    }
    render() {
        return (
            <ViroARScene onTrackingUpdated={this._onInitialized}>
                {this.getMessages()}
                {this.getCautionMessages()}
                {this.getDocusignInfo()}
                {this.getExitButton()}
                {this.getQuizInfo()}
                {/* {this.getObject()} */}

            </ViroARScene>
        )
    }
    _onInitialized = (state, reason) => {
        // if (state == ViroConstants.TRACKING_NORMAL) {
        // //   this.setState({
        // //     text : "Hello World!"
        // //   });
        // } else if (state == ViroConstants.TRACKING_NONE) {
        //   // Handle loss of tracking
        // }
    }
}

var styles = StyleSheet.create({
    infoContainer: {
        backgroundColor: "#F44336dd"
    },
    webViewContainer: {
        flex: 2,
        flexDirection: "column"
    },
    button: {
        flex: 1
    }

});

module.exports = Main;