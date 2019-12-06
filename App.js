import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Asset} from 'expo-asset';
import {AppLoading} from 'expo';
import AppStackNav from "./navigators/AppStackNav";
import NavigationService from './navigators/NavigationService';

function cacheImages(images){
  return images.map(image => {
    if (typeof image == 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

export default class App extends React.Component {
  constructor(){
    super()
    this.state={
      isReady:false
    }
  }

  async _loadAssetsAssync() {
    const imageAssets = cacheImages([require('./assets/background.jpg')])
    await Promise.all([...imageAssets]);
  }

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._loadAssetsAssync}
          onFinish={() => this.setState({isReady: true})}
          onError={console.warn}
        />
      );
    }
    return <AppStackNav ref={navigatorRef => {
      NavigationService.setTopLevelNavigator(navigatorRef);
    }}/>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
