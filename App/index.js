import React, { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TextInput,
    KeyboardAvoidingView,
    Alert,
    AsyncStorage,
    TouchableOpacity,
    
} from "react-native";
import Svg, { Image, Circle, ClipPath } from 'react-native-svg'
import Animated, { Easing } from 'react-native-reanimated'
import { TapGestureHandler, State } from 'react-native-gesture-handler'
import { NavigationActions, StackActions } from 'react-navigation';
import ActionCreators from './redux/actions'
import local_db from './services/local_db';

const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Home' })],
});

const { Value, event, block, cond, eq, set, Clock, startClock, stopClock, debug, timing, clockRunning, interpolate, Extrapolate, concat } = Animated
const { width, height } = Dimensions.get('window')

function runTiming(clock, value, dest) {
    const state = {
        finished: new Value(0),
        position: new Value(0),
        time: new Value(0),
        frameTime: new Value(0)
    };

    const config = {
        duration: 1000,
        toValue: new Value(0),
        easing: Easing.inOut(Easing.ease)
    };

    return block([
        cond(clockRunning(clock), 0, [
            set(state.finished, 0),
            set(state.time, 0),
            set(state.position, value),
            set(state.frameTime, 0),
            set(config.toValue, dest),
            startClock(clock)
        ]),
        timing(clock, state, config),
        cond(state.finished, debug('stop clock', stopClock(clock))),
        state.position
    ]);
}

class AllergApp extends Component {
    constructor() {
        super()
        this.buttonOpacity = new Value(1)
        this.onStateChange = event([
            {
                nativeEvent: ({ state }) => block([
                    cond(eq(state, State.END), set(this.buttonOpacity, runTiming(new Clock(), 1, 0)))
                ])
            }
        ])

        const sequelize_instance = new local_db();
        sequelize_instance.ready().then(() => {
            this.props.actions.on_db_opened(sequelize_instance);
        });

        this.onCloseState = event([
            {
                nativeEvent: ({ state }) => block([
                    cond(eq(state, State.END), set(this.buttonOpacity, runTiming(new Clock(), 0, 1)))
                ])
            }
        ])

        this.buttonY = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [100, 0],
            extrapolate: Extrapolate.CLAMP
        })

        this.bgY = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [-height / 3 - 50, 0],
            extrapolate: Extrapolate.CLAMP
        })

        this.textInputZindex = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [1, -1],
            extrapolate: Extrapolate.CLAMP
        })

        this.textInputY = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [0, 100],
            extrapolate: Extrapolate.CLAMP
        })

        this.textInputOpacity = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [1, 0],
            extrapolate: Extrapolate.CLAMP
        })

        this.rotateCross = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [180, 360],
            extrapolate: Extrapolate.CLAMP
        })
    }

    Skip() {
        Alert.alert('Skip LogIn','Remember my choice ?',[
            { text: 'No', onPress: () => console.log('dont remember skip') &
            this.setkey('false')
            & this.props.navigation.dispatch(resetAction) },
            { text: 'Yes', onPress: () => console.log('remember skip') & 
            this.setkey('true')
            &this.props.navigation.dispatch(resetAction)},
        ])
    
    }
    async setkey(str){
        await AsyncStorage.setItem("@MySuperStore:key", str);
    }
   async componentDidMount(){
    let storedValue = await AsyncStorage.getItem("@MySuperStore:key");
    if (storedValue == 'true') {
        this.props.navigation.dispatch(resetAction)
    } 
    if (storedValue == null) {
      console.log("Writing data!");
      storedValue = await AsyncStorage.setItem("@MySuperStore:key", "false");
    }

    }
    render() {
        const { navigate } = this.props.navigation;
        const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
        return (
            <KeyboardAvoidingView style={{ flex: 1, backgroundColor: 'white', justifyContent: 'flex-end' }} behavior="padding" enabled>
                <Animated.View style={{ ...StyleSheet.absoluteFill, transform: [{ translateY: this.bgY }] }}>
                    <Svg height={height + 50} width={width}>
                        <ClipPath id="clip">
                            <Circle r={height + 50} cx={width / 2} />
                        </ClipPath>
                        <Image
                            href={require('../assets/background.jpg')}
                            height={height + 50}
                            width={width}
                            preserveAspectRatio='xMidYmid slice'
                            clipPath='url(#clip)'
                        />
                    </Svg>
                </Animated.View>

                <Animated.View style={{ ...StyleSheet.absoluteFill, alignItems: 'center', justifyContent: 'center' }}>
                    <Svg height={height} width={width / 2}>
                        <Image
                            href={require('../assets/React.png')}
                            height={height / 2}
                            width={width / 2}
                        //preserveAspectRatio='xMidYmid slice'
                        />
                    </Svg>
                </Animated.View>
                <View style={{ height: height / 3 }}>
                    <TapGestureHandler onHandlerStateChange={this.onStateChange}>
                        <AnimatedTouchable style={{ ...styles.button, opacity: this.buttonOpacity, transform: [{ translateY: this.buttonY }] }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>SIGN IN</Text>
                        </AnimatedTouchable>
                    </TapGestureHandler>
                    <AnimatedTouchable onPress={() => this.Skip()} style={{ ...styles.button, backgroundColor: '#71c232', zIndex: 3, opacity: this.buttonOpacity, transform: [{ translateY: this.buttonY }] }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>SKIP</Text>
                    </AnimatedTouchable>
                    <Animated.View style={{ backgroundColor: 'white', borderTopLeftRadius: 30, borderTopRightRadius: 30, zindex: this.textInputZindex, opacity: this.textInputOpacity, transform: [{ translateY: this.textInputY }], height: height / 3 + 0, ...StyleSheet.absoluteFill, top: null, justifyContent: 'center' }}>
                        <TapGestureHandler onHandlerStateChange={this.onCloseState}>
                            <Animated.View style={styles.closeButton}>
                                <Animated.Text style={{ fontSize: 15, transform: [{ rotate: concat(this.rotateCross, 'deg') }] }}>
                                    X
                                </Animated.Text>
                            </Animated.View>
                        </TapGestureHandler>
                        <TextInput
                            placeholder="LOGIN"
                            style={styles.textInput}
                            placeholderTextColor="black"
                        />
                        <TextInput
                            placeholder="PASSWORD"
                            style={styles.textInput}
                            placeholderTextColor="black"
                        />
                        <AnimatedTouchable style={styles.button} onPress={() => Alert.alert('Error', 'Not implemented yet use SKIP !', [
                                { text: 'SKIP NOW !', onPress: () => this.props.navigation.dispatch(resetAction) },
                                { text: 'OK', onPress: () => console.log('OK Pressed') },
                            ])}>
                            <Text  style={{ fontSize: 20, fontWeight: 'bold' }}>SIGN IN</Text>
                        </AnimatedTouchable>
                    </Animated.View>

                </View>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        backgroundColor: 'white',
        height: 70,
        marginHorizontal: 20,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
        shadowOffset: { width: 2, height: 2 },
        shadowColor: 'black',
        shadowOpacity: 0.2
    },
    textInput: {
        height: 40,
        borderRadius: 25,
        borderWidth: 0.5,
        marginHorizontal: 20,
        paddingLeft: 10,
        marginVertical: 5,
        borderColor: 'rgba(0,0,0,0.2)'
    },
    closeButton: {
        height: 40,
        width: 40,
        backgroundColor: 'white',
        borderRadius: 20,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: -20,
        left: width / 2 - 20,
        shadowOffset: { width: 2, height: 2 },
        shadowColor: 'black',
        shadowOpacity: 0.2
    }
})

const mapStateToProps = state => {
    console.log(state);
    return {
        sequelize: state.app.sequelize_instance,
    };
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AllergApp);