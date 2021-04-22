import React, { Component } from 'react';
import { View, Text, TouchableHighlight, TouchableOpacity, StyleSheet, Image, Alert, FlatList, ScrollView } from 'react-native';
import { PRIMARY, SECONDARY, BLACK } from '../../styles/colors';
import { BarraLateral } from '_organisms'
import DropDownPicker from 'react-native-dropdown-picker';

export default class BeginFriendScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tourList: [
                { label: 'Torneo 1', value: 'torneo1', },
                { label: 'Torneo 2', value: 'torneo2' },
                { label: 'Torneo 3', value: 'torneo3' },
            ],
            selectedFriend: null,
            username: "user 1",
            estado:null,
            friendList:
                [
                    { name: 'rollicking' },
                    { name: 'cheerful' },
                    { name: 'fun' },
                    { name: 'sweet' },
                    { name: 'amiable' },
                    { name: 'natured' },
                    { name: 'rollicking' },
                    { name: 'cheerful' },
                    { name: 'fun' },
                    { name: 'sweet' },
                    { name: 'amiable' },
                    { name: 'natured' }
                ],
            show: false,
        }
        
    }
    showFriend() {
        const { show } = this.state

        this.setState({
            show: !show
        })
    }
    selectFriend(friend) {
        this.setState({
            selectedFriend: friend,
            show: false,
            estado:": Seleccionado"
        })
    }
    send() {
        this.setState({
            estado: ": Esperando"
        })
    }
    render() {
        const getFriend = (option) => {

        }
        return (<View style={styles.container}>
            <View style={styles.cuadroGrande}>
                <View style={styles.cuadroPequeno}>
                    <Text style={styles.title} > Desafiar amigo</Text>
                </View>
                <View style={styles.cuadroAmigos}>
                    <View style={styles.friendContainer}>
                        <Text style={styles.text} > {this.state.username}: Listo </Text>
                    </View>
                    <View style={styles.friendContainer}>
                        <TouchableOpacity style={styles.friendContainer} onPress={() => this.showFriend()}>
                            <Text style={styles.messageText} > Invita a un amigo </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.friendContainer}>
                        {this.state.show ? <FlatList
                            data={this.state.friendList}
                            extraData={this.state.showItemIndex}
                            renderItem={({ item, index }) => {
                                return (
                                    <View style={styles.friend}>
                                        <TouchableOpacity style={styles.friendButton} onPress={() => this.selectFriend(item.name)}>
                                            <Text style={styles.friendText}>
                                                {item.name}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                );
                            }}
                            keyExtractor={(item, index) => index.toString()}
                            style={styles.friendContainer}
                        /> : <View style={styles.friendContainer}>
                                <Text style={styles.text} > {this.state.selectedFriend} {this.state.estado}</Text>
                                <TouchableOpacity style={styles.confirmButton} onPress={() => this.send()}>
                                    <Text style={styles.buttonText}>
                                        Enviar peticion
                                    </Text>
                                </TouchableOpacity>
                            </View>}
                    </View>
                    
                </View>
                
            </View>
            <BarraLateral navigation={this.props.navigation} />

        </View>);
    }
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        paddingTop: 30,
    },
    cuadroGrande: {
        flex: 4,
        borderColor: BLACK,
        borderWidth: 3,
        flexDirection: 'column',
        alignContent: 'center',
    },
    cuadroPequeno: {
        borderColor: BLACK,
        flexDirection: 'column',
        alignSelf: 'center'
    },
    cuadroAmigos: {
        flex: 3,
        borderColor: BLACK,
        flexDirection: 'column',
        alignSelf: 'center',
        paddingBottom:80
    },
    friendContainer: {
        paddingTop: 5,
    },
    friend: {
        paddingTop: 1,
    },
    friendButton: {
        width: 100,
        height: 20,
        backgroundColor: SECONDARY,
        borderRadius: 50,
        borderWidth: 1,
        alignSelf: 'center',
    },
    confirmButton: {
        top: 30, 
        width: 180,
        height: 40,
        backgroundColor: PRIMARY,
        borderRadius: 50,
        borderWidth: 1,
        alignSelf:'center'
    },
    title: {
        textAlign: 'center',
        color: 'black',
        paddingTop: 20,
        fontSize: 38,
        fontWeight: 'bold',
    },
    buttonText: {
        textAlign: 'center',
        color: 'black',
        fontSize: 20,
    },
    text: {    
        fontSize: 25,
        textAlign: 'center'
    },
    friendText: {
        fontSize: 15,
        textAlign: 'center',
        color: PRIMARY
    },
    messageText: {
        fontSize: 17,
        textAlign: 'center',
        color: 'grey'
    },
    listContainer: {
        height: 50, width: 260, alignSelf: 'center'
    },
    listText: {
        fontSize: 18, justifyContent: 'center', color: 'black'
    },
});


