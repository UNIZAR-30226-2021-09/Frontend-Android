import React, { Component } from 'react';
import { View, Text, TouchableHighlight, TouchableOpacity, StyleSheet, Image, Alert, FlatList, ScrollView, TextInput } from 'react-native';
import { PRIMARY, SECONDARY, BLACK } from '../../styles/colors';
import { BarraLateral } from '_atoms'
import DropDownPicker from 'react-native-dropdown-picker';

export default class AddFriendScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFriend: "",
            selectedLink: "",
            username: "user 1",
        }
        
    }

    send() {
        this.setState({
            estado: ": Esperando"
        })
        Alert.alert("Enviado");
    }
    render() {
        const getFriend = (option) => {

        }
        let name="len", lastName = "last";
        return (<View style={styles.container}>
            <View style={styles.cuadroGrande}>
                <View style={styles.cuadroPequeno}>
                    <Text style={styles.title} > Añadir amigo</Text>
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
                        placeholder="Nombre de usuario"
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={friend =>
                            this.setState({
                                selectedLink: friend,
                            })
                        }
                        value={this.state.selectedLink}
                        placeholder="Enlace de invitacion"
                    />
                    <View style={styles.friendContainer}>
                        <TouchableOpacity style={styles.confirmButton} onPress={() => this.send()}>
                            <Text style={styles.text} > Enviar peticion </Text>
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
        paddingTop:20
    },
    input: {
        width: 280,
        height: 40,
        backgroundColor: SECONDARY,
        borderRadius: 50,
        borderWidth: 1,
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: 'grey',
        marginTop: 10,
        padding: 10
    },
    friendContainer: {
        paddingTop: 10,
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


