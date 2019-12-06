import React from 'react';
import { Text, View, StyleSheet, Alert, TouchableHighlight, StatusBar } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import Database from './database'
import Torch from 'react-native-torch';
import Icon from 'react-native-vector-icons/Ionicons';
import NavigationService from '../../navigators/NavigationService';
import AddModal from '../CustomComponent/AddModal'
const db = new Database();

db.InitDb()

export default class CameraPage extends React.Component {
  constructor(props) { 
    super(props);
  this.state = {
    hasCameraPermission: null,
    scanned: false,
    type:null,
    data:null,
    isModalVisible2:false,
  };
}

  async componentDidMount() {
    this.getPermissionsAsync();
  }

  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  };

  turnONTorch() {
    Torch.switchState(true); // Turn ON the Torch.
  }

  turnOFFTorch() {
    Torch.switchState(false); // Turn OFF the Torch.
  }

  render() {
   // const { hasCameraPermission, scanned } = this.state;
    if (this.state.hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (this.state.hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <View style={styles.mainview}>
        <BarCodeScanner
          onBarCodeScanned={this.state.scanned ? undefined : this.handleBarCodeScanned}
          style={styles.overlay}
        />
        <View style={styles.overlay}>
          <View style={styles.unfocusedContainer}>
          </View>
          <View style={styles.middleContainer}>
            <View style={styles.unfocusedContainer}></View>
            <View style={styles.focusedContainer}>
              <View style={styles.rescanIconContainer}>
                {this.state.scanned && (
                  <TouchableHighlight style={styles.flashlight} onPress={() => this.setState({ scanned: false })}>
                  <View>
                    <Icon name="md-sync" color='rgba(255, 255, 255, 0.75)' size={75} />
                  </View>
                  </TouchableHighlight>             
                )}
              </View>
            </View>
            <View style={styles.unfocusedContainer}></View>
          </View>
          <View style={styles.unfocusedContainer}>
            <TouchableHighlight style={styles.flashlight} onPress={() => { Alert.alert('Not implemented yet') }}>
              <View>
                <Icon name="md-flashlight" color='rgba(255, 255, 255, 0.75)' size={35} />
              </View>
            </TouchableHighlight>
          </View>
        </View>
        <AddModal
					isVisible={this.state.isModalVisible2}
					onBackdropPress={() => this.setState({ isModalVisible2: false })}
					onPress1={() => { NavigationService.navigateH('AddItem',{type:this.state.type, data:this.state.data}); this.setState({isModalVisible2:false}) }}
					Text1={'Fill Information'}
				/>
      </View>
    );
  }

  handleBarCodeScanned = ({ type, data }) => {
    this.setState({ scanned: true });
    this.setState({isModalVisible2:true})
    this.setState({type: type});
    this.setState({data: data});
   // db.add(data) //have to be done in add item page
    console.log('getdb : ' + db.getdb())
    //NavigationService.navigateH('AddItem',{type:type, data:data})
  };
}

//styles

const styles = StyleSheet.create({
  mainview:{
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  flashlight: {

    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unfocusedContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5 )',
  },
  middleContainer: {
    flexDirection: 'row',
    flex: 1.5,
  },
  focusedContainer: {
    flex: 6,
  },
  rescanIconContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  rescanIconContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})