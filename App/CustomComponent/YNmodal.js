//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Dimensions } from 'react-native';
import Modal from "react-native-modal";
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width, height } = Dimensions.get('window')

// create a component
class YNmodale extends Component {
    static propTypes = {
        isVisible: PropTypes.bool.isRequired,
        onBackdropPress: PropTypes.func.isRequired,
        onPress1: PropTypes.func.isRequired,
        onPress2: PropTypes.func.isRequired,
        Text1: PropTypes.string.isRequired,
        Text2: PropTypes.string.isRequired,
        BackgroundColor: PropTypes.string,
        BackgroundColor1: PropTypes.string,
        BackgroundColor2: PropTypes.string,
      }
    static defaultProps = {
        BackgroundColor:'#ecedee',
        BackgroundColor1: '#18c063',
        BackgroundColor2: 'white'
    }
    render() {
        //const { isVisible, onPress1, onPress2, Text1, Text2 } = this.props
        return (

            <Modal
                style={{ marginHorizontal: 0, marginTop: height / 1.3, marginBottom: -25 }}
                isVisible={this.props.isVisible}
                onBackdropPress={this.props.onBackdropPress}
                swipeDirection="down"
                propagateSwipe
            >
                {/* <View style={{
                    flex: 1,
                    marginHorizontal: 0,
                    backgroundColor: this.props.BackgroundColor,
                    borderRadius: 25,
                    alignItems: 'center',
                    textAlign: 'center',
                    justifyContent: 'space-between',

                }}>
                    <TouchableHighlight style={{ ...styles.button_modal, marginTop: -22,  backgroundColor: this.props.BackgroundColor1}}
                        onPress={this.props.onPress1} >
                        <Text style={{ textAlign: 'center' }} >{this.props.Text1}</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={{ ...styles.button_modal, marginTop: -22, backgroundColor: this.props.BackgroundColor2, }}
                        onPress={this.props.onPress2} >
                        <Text style={{ textAlign: 'center' }} >{this.props.Text2}</Text>
                    </TouchableHighlight>
                </View> */}
                <View style={{
                    flex: 1,
                    //flexDirection: 'row',
                    marginHorizontal: 0,
                    backgroundColor: this.props.BackgroundColor,
                    borderRadius: 25,
                    alignItems: 'center',
                    textAlign: 'center',
                   // justifyContent: 'space-between',

                }}>
                    <TouchableHighlight style={{ ...styles.button_modal, marginTop: 20,  backgroundColor: this.props.BackgroundColor1}}
                        onPress={this.props.onPress1} >
                        <Text style={{ textAlign: 'center', color: 'white',fontWeight: '700', fontSize:16 }} >{this.props.Text1}</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={{ ...styles.button_modal, marginTop: 20, backgroundColor: this.props.BackgroundColor2, }}
                        onPress={this.props.onPress2} >
                        <Text style={{ textAlign: 'center',fontWeight: '700', fontSize:16 }} >{this.props.Text2}</Text>
                    </TouchableHighlight>
                </View>
            </Modal>
        );
    }
}

//make this component available to the app
export default YNmodale;

const styles = StyleSheet.create({
	// button_modal: {
	// 	height: 50,
	// 	width: width / 2,
	// 	justifyContent: 'center',
	// 	alignContent: 'center',
	// 	marginHorizontal: 20,
	// 	marginVertical: 50,
	// 	borderRadius: 25,
	// 	shadowOffset: { width: 2, height: 2 },
	// 	shadowColor: 'black',
	// 	shadowOpacity: 0.2
    // },
    button_modal: {
		height: 50,
		width: width - 50,
		justifyContent: 'center',
		alignContent: 'center',
		marginHorizontal: 20,
		//marginVertical: 50,
		borderRadius: 15,
		// shadowOffset: { width: 2, height: 2 },
		// shadowColor: 'black',
		// shadowOpacity: 0.2
	},
})