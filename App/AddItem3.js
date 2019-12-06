//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableHighlight } from 'react-native';
import NavigationService from '../navigators/NavigationService';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';


const { width, height } = Dimensions.get('window')

// create a component
export default class AddItem3 extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { navigation } = this.props;
        const thumb = navigation.getParam('thumb', null);
        const data = navigation.getParam('data', 'Nothing to show');
        const title = navigation.getParam('title', 'nothing to show');
        const ingr = navigation.getParam('ingr', 'nothing to show');
        const langue = navigation.getParam('langue', 'nothing to show');
        return (
            <View style={{ flex: 1 }}>
                {/* contentContainerStyle={{ flexGrow: 1 }} */}
                <View style={{ ...styles.cardBody }}>
                    <Image
                        source={{ uri: thumb.uri }}
                        style={styles.cardItemImagePlace}
                    ></Image>
                    <View style={styles.bodyContent}>
                        <Text style={styles.titleStyle}>Product Name</Text>
                        <Text style={styles.subtitleStyle}>{title}</Text>
                        <Text style={styles.titleStyle}>Code bar number</Text>
                        <Text style={styles.subtitleStyle}>{data}</Text>
                    </View>
                </View>
                <TouchableHighlight style={{ ...styles.button2, marginTop: 10, marginBottom: -25, zIndex: 1 }} onPress={() =>
                    NavigationService.navigateH('Camera')} >
                    <Text style={{ textAlign: 'center', color: 'white', fontWeight: '700', fontSize: 16 }}>Add To DataBase</Text>
                </TouchableHighlight>
                <View style={{ backgroundColor: '#ECEDEE', height: '100%', zIndex: 0 }}>
                    <ScrollView>
                        <View flexDirection='row'>
                            <Text style={{ marginTop: 50, marginLeft: 50, fontWeight: 'bold', fontSize: 20, color: '#18c063' }}>∙  </Text>
                            <Text style={{ marginTop: 50, fontWeight: 'bold', fontSize: 20 }}>Ingredients</Text>
                        </View>
                        <Text style={{ margin: 20}}>{ingr}</Text>
                    </ScrollView>
                </View>

                {/* <View style={styles.bottom}>
                    <TouchableHighlight style={{ ...styles.button2, marginVertical: 10 }} onPress={() =>
                        NavigationService.navigateH('Camera')} >
                        <Text style={{ textAlign: 'center', color: 'white', fontWeight: '700', fontSize: 16 }}>Add To DataBase</Text>
                    </TouchableHighlight>
                </View> */}

            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',

    },
    item: {
        marginTop: 10,
        padding: 10,
        textAlign: 'center',
    },
    title: {
        fontWeight: 'bold',
        textAlign: 'center',
    },


    cardBody: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center',
        // borderColor: "#CCC",
        // borderBottomWidth: 1,
        // shadowOffset: {
        //     height: 2,
        //     width: -2
        // },
        // shadowColor: "#000",
        // shadowOpacity: 0.1,
        // shadowRadius: 1.5,
        overflow: "hidden"
    },
    bodyContent: {
        flex: 1,
        padding: 16,
        paddingTop: 24,
    },
    titleStyle: {
        color: "#000",
        //paddingBottom: 12,
        fontSize: 13,
        fontWeight: 'bold'
        //  fontFamily: "roboto-regular"
    },
    subtitleStyle: {
        color: "#000",
        opacity: 0.5,
        fontSize: 14,
        paddingBottom: 11,
        //  fontFamily: "roboto-regular",
        lineHeight: 16
    },
    cardItemImagePlace: {
        width: 120,
        height: 120,
        borderRadius: 25,
        // backgroundColor: "#ccc",
        margin: 16
    },
    button: {
        height: 50,
        width: width - 50,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: 'white',
        marginHorizontal: 20,
        borderRadius: 15,
        borderColor: '#18c063',
        borderWidth: 2
    },
    button2: {
        height: 50,
        width: width - 50,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: '#18c063',
        marginHorizontal: 20,
        borderRadius: 15,
        //borderColor: '#18c063',
        //borderWidth: 2
    },
    bottom: {
        alignItems: 'center',
        marginBottom: 36,
        marginTop: 10,
    },
});
