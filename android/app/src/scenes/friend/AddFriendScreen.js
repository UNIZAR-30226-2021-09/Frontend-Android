import React, { Component } from 'react';
import { View, Text, TouchableHighlight, TouchableOpacity, StyleSheet, Image, Alert, FlatList, ScrollView, TextInput, AsyncStorage } from 'react-native';
import { PRIMARY, SECONDARY, BLACK, GRAY_MEDIUM, GRAY_LIGHT, TITLE } from '../../styles/colors';
import { BarraLateral } from '_organisms'
import DropDownPicker from 'react-native-dropdown-picker';
import { addfriend } from '_api/user';
import { socket, friendPetition } from '_api/user/socket';
import i18n from 'i18n-js';

export default class AddFriendScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFriend: "",
            selectedLink: "",
            username: "user 1",
        }
        
    }
    async sendRequest() { 
        if (this.state.selectedFriend == "") {
            Alert.alert(i18n.t('IntNomOEnl'));
            return "error";
        }
        var _username = await AsyncStorage.getItem('username');
        var accessToken = await AsyncStorage.getItem('userToken');
        var user = {
            Username: _username,
            Friendname: this.state.selectedFriend,
            AccessToken: accessToken
        };
        console.log(user);
        await addfriend(user).then(data => {
            console.log("Data de addFriend: " + data);
            if (data != "error") {
                friendPetition({ Username: this.state.selectedFriend });
                Alert.alert(i18n.t('PetEnv'));
            } else {
                alert(i18n.t('ErrAddFriend'));
            }
        }).catch(err => {
            console.log("error addFriend")
            console.log(err)
            return "error"
        });
    }
    send() {
        this.setState({
            estado: ": Esperando"
        })
        Alert.alert(i18n.t('Enviado'));
    }
    render() {
        return (<View style={styles.container}>
            <View style={styles.cuadroGrande}>
                <View style={styles.cuadroPequeno}>
                    <Text style={styles.title} >{i18n.t('AnAmigo')}</Text>
                </View>
                <View style={styles.cuadroAmigos}>
                    <TextInput
                        style={styles.input}
                        onChangeText={friend =>
                            this.setState({
                                selectedFriend: friend,
                            })
                        }
                        value={this.state.selectedFriend}
                        placeholder={i18n.t('NomUsuario')}
                    />
                    <View style={styles.friendContainer}>
                        <TouchableOpacity style={styles.confirmButton} onPress={() => this.sendRequest()}>
                            <Text style={styles.sendtext} > {i18n.t('EnvPeticion')} </Text>
                        </TouchableOpacity>
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
        paddingTop:20
    },
    input: {
        width: 280,
        height: 40,
        backgroundColor: GRAY_LIGHT,
        borderRadius: 50,
        borderWidth: 1,
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: 'grey',
        marginTop: 10,
        padding: 10
    },
    friendContainer: {
        flex:1
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
        alignSelf:'center'
    },
    sendtext: {
        fontSize: 20,
        textAlign: 'center',
        color: 'white',
        textAlignVertical: 'bottom',
        top:'10%'
    },
    title: {
        textAlign: 'center',
        color: TITLE,
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
        fontSize: 20,
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


