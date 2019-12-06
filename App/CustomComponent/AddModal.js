//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Dimensions } from 'react-native';
import Modal from "react-native-modal";
import PropTypes from 'prop-types';

const { width, height } = Dimensions.get('window')

// create a component
class AddModal extends Component {
    static propTypes = {
        isVisible: PropTypes.bool.isRequired,
        onBackdropPress: PropTypes.func.isRequired,
        onPress1: PropTypes.func.isRequired,
        Text1: PropTypes.string.isRequired,
        BackgroundColor: PropTypes.string,
        BackgroundColor1: PropTypes.string,
      }
    static defaultProps = {
        BackgroundColor:'#ecedee',
        BackgroundColor1: '#18c063',
    }
    render() {
        //const { isVisible, onPress1, onPress2, Text1, Text2 } = this.props
        return (

            <Modal
                style={{ marginHorizontal: 0, marginTop: height / 1.4, marginBottom: -25 }}
                isVisible={this.props.isVisible}
                onBackdropPress={this.props.onBackdropPress}
                swipeDirection="down"
                propagateSwipe
                coverScreen={false}
            >
                <View style={{
                    flex: 1,
                    marginHorizontal: 0,
                    backgroundColor: this.props.BackgroundColor,
                    borderRadius: 25,
                    alignItems: 'center',
                    textAlign: 'center',
                   

                }}>
                    <Text style={{ textAlign: 'center', color:'black', marginTop:25, fontSize:20 }} >Unknow Product</Text>
                    <TouchableHighlight style={{ ...styles.button_modal, marginTop: 25,  backgroundColor: this.props.BackgroundColor1}}
                        onPress={this.props.onPress1} >
                        <Text style={{ textAlign: 'center', color:'white', fontWeight: '700', fontSize:16 }} >{this.props.Text1}</Text>
                    </TouchableHighlight>
                </View>
            </Modal>
        );
    }
}

//make this component available to the app
export default AddModal;

const styles = StyleSheet.create({
	button_modal: {
		height: 50,
		width: width - 50,
		justifyContent: 'center',
		alignContent: 'center',
		marginHorizontal: 20,
		//marginBottom: 50,
		borderRadius: 15,
	},
})