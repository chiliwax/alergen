import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    FlatList,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight,
    Button,
    Dimensions,
    ActivityIndicator,
    Alert,
} from 'react-native';
import Modal from "react-native-modal";
import Database from './database'
import ActionCreators from '../redux/actions'
import sequelize from '../services/local_db';

const db = new Database();

db.InitDb()
console.log('historypage : ' + db.getdb())
//db.clear()

const { width, height } = Dimensions.get('window')

const ok = require('../../assets/warnings/ok.png')
const war = require('../../assets/warnings/war.png')
const dng = require('../../assets/warnings/dng.png')

class HistoryPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isModalVisible: false,
            isModalVisible2: false,
            title: '',
            img: ok,
            index: 0,
            delete: false,
        };
    }

    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
        this.setState({ delete: true });
        console.log(this.database.length)
        console.log(this.database)
    };

    _onPressButton(item, index) {
        this.setState({ title: item.title })
        this.setState({ img: item.sub })
        this.setState({ isModalVisible: !this.state.isModalVisible });
        this.setState({ index: index })
    }
    database = [
        { img: require('../../assets/React.png'), title: 'Product 1', sub: ok },
        { img: require('../../assets/React.png'), title: 'Product 2', sub: war },
        { img: require('../../assets/React.png'), title: 'Product 3', sub: dng },
        { img: require('../../assets/React.png'), title: 'Product 4', sub: ok },
        { img: require('../../assets/React.png'), title: 'Product 5', sub: ok },
        { img: require('../../assets/React.png'), title: 'Product 6', sub: war },
        { img: require('../../assets/React.png'), title: 'Product 7', sub: war },
        { img: require('../../assets/React.png'), title: 'Product 8', sub: war },
        { img: require('../../assets/React.png'), title: 'Product 9', sub: war },
        { img: require('../../assets/React.png'), title: 'Product 10', sub: dng },
    ]

    render() {
        if (this.database.length == 0) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={require('../../assets/warning.png')} style={{ height: 50, width: 50, margin: 20 }} />
                    <Text>nothing there !</Text>
                </View>
            )
        }
        if (!this.props.sequelize) {//!db.state.loading) {
            console.log('Loading Db!')
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="green" />
                </View>
            );
        }
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.database}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) =>
                        <View>
                            <TouchableHighlight onPress={() => this._onPressButton(item, index)} underlayColor="white">
                                <View style={styles.item}>
                                    <Image style={styles.thumb} source={item.img} />
                                    <Text>{item.title}</Text>
                                    <Image style={styles.sub} source={item.sub} />
                                </View>
                            </TouchableHighlight>

                        </View>}

                />

                <Modal
                    onModalHide={() => {
                        if (this.state.delete == true) {
                            this.setState({ isModalVisible2: true })
                            this.setState({ delete: false })
                        }
                    }}
                    style={{ marginHorizontal: 0, marginTop: height / 4, marginBottom: -15 }}
                    isVisible={this.state.isModalVisible}
                    onBackdropPress={() => this.setState({ isModalVisible: false })}
                    onSwipeComplete={() => this.setState({ isModalVisible: false })}
                    swipeDirection="down"
                    propagateSwipe
                >
                    <View style={{
                        flex: 1,
                        marginHorizontal: 0,
                        backgroundColor: 'white',
                        height: height / 1.5,
                        borderRadius: 25,
                        alignItems: 'center',
                        textAlign: 'center',
                        justifyContent: 'space-between',

                    }}>
                        <View>
                            <Image style={styles.thumb_modal} source={this.state.img} />
                            <Text style={styles.title_modal}>{this.state.title}</Text>
                        </View>
                        <View>
                            <Text>Hello!</Text>
                        </View>
                        <View>
                            <TouchableHighlight style={styles.button_modal} onPress={this.toggleModal}>
                                <Text style={{ textAlign: 'center' }}>DELETE</Text>
                            </TouchableHighlight>
                        </View>
                    </View>

                </Modal>
                <Modal
                    style={{ marginHorizontal: 0, marginTop: height / 1.3, marginBottom: -15 }}
                    isVisible={this.state.isModalVisible2}
                    onBackdropPress={() => this.setState({ isModalVisible2: false })}
                    swipeDirection="down"
                    propagateSwipe
                >
                    <View style={{
                        flex: 1,
                        marginHorizontal: 0,

                        backgroundColor: 'white',
                        borderRadius: 25,
                        alignItems: 'center',
                        textAlign: 'center',
                        justifyContent: 'space-between',

                    }}>
                        <TouchableHighlight style={{ ...styles.button_modal, marginTop: -20 }} onPress={() => {
                            this.setState({ isModalVisible2: false })
                            this.database.splice(this.state.index, 1)
                        }}>
                            <Text style={{ textAlign: 'center' }}>DELETE</Text>
                        </TouchableHighlight>

                        <TouchableHighlight style={{ ...styles.button_modal, marginTop: -20, backgroundColor: 'white', }} onPress={() => { this.setState({ isModalVisible2: false }) }}>
                            <Text style={{ textAlign: 'center' }}>CANCEL</Text>
                        </TouchableHighlight>
                    </View>
                </Modal>
            </View >
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        //paddingTop: 30
    },
    item: {

        flex: 1,
        flexDirection: 'row',

        backgroundColor: 'white',
        height: 70,
        marginHorizontal: 20,
        borderRadius: 15,
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'space-between',
        marginVertical: 5,
        shadowOffset: { width: 2, height: 2 },
        shadowColor: 'black',
        shadowOpacity: 0.2,
        elevation: 2
    },
    thumb: {
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
        marginLeft: 20,
    },
    thumb_modal: {
        width: 70,
        height: 70,
        //borderRadius: 70 / 2,
        marginTop: -70 / 2,//-height/2,
        marginBottom: 15,
    },
    title_modal: {
        fontWeight: 'bold',
        marginBottom: 30,
        alignContent: 'center',
        textAlign: 'center'
    },
    button_modal: {
        height: 50,
        width: width / 2,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: 'red',
        marginHorizontal: 20,
        marginVertical: 50,
        borderRadius: 25,
        shadowOffset: { width: 2, height: 2 },
        shadowColor: 'black',
        shadowOpacity: 0.2,
        elevation: 2,
    },
    sub: {
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
        marginRight: 20
    },
});

const mapStateToProps = state => {
    console.log(state);
    return {
        sequelize: state.app.sequelize_instance,
    };
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(HistoryPage);