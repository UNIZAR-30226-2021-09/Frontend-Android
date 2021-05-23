import React, { Component } from 'react';
import { View, Text, ToastAndroid, TouchableHighlight, TouchableWithoutFeedback, StyleSheet, Image, Alert, AsyncStorage, TouchableOpacity } from 'react-native';
import { PRIMARY, SECONDARY, BLACK, WHITE, TITLE } from '../../styles/colors';
import { BarraLateral } from '_organisms'
import DropDownPicker from 'react-native-dropdown-picker';
import { beginRandom } from '_api/game';
import i18n from 'i18n-js';

export default class BeginRandomScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            textValue: ''
        }
    }
    
    async startGame() {
        var _username = await AsyncStorage.getItem('username');
        var accessToken = await AsyncStorage.getItem('userToken');
        var user = {
            Username: _username,
            AccessToken: accessToken
        };

        await beginRandom(user).then(data => {
            console.log("Data de random: " + data);
            if (data != "error") {
                console.log("No ha habido fallo al comunicarse con el server")
                //Ahora hacer que muestre un mensaje u otro dependiendo del resultado
                if (data.mensaje) {
                    //ToastAndroid.show('No hay nadie esperando partida, cuando aparezca un contrincante se añadira la partida a tu lista de partidas', ToastAndroid.SHORT);
                    this.setState({ textValue: 'No hay nadie esperando partida, cuando aparezca un contrincante se añadira la partida a tu lista de partidas' })
                } else {
                    //Aqui se ha encontrado partida asi que redirige a la partida 
                    ToastAndroid.show('Se ha añadido una partida', ToastAndroid.SHORT);
                    //this.props.navigation.navigate('Home');
                }
            } else {
                alert('Error de  random de partida a ciegas');
            }
        }).catch(err => {
            console.log("error random")
            console.log(err)
            return "error"
        });
        //this.props.navigation.navigate('Home');

    }

    render() {
        return (
            <View style={styles.container}>
            <View style={styles.cuadroGrande}>
                <View style={styles.cuadroPequeno}>
                    <Text style={styles.title} > Partida a ciegas</Text>
                </View>
                <View style={styles.cuadroPequeno}>
                    <TouchableOpacity style={styles.button} onPress={() => this.startGame()}>
                        <Text style={styles.buttonText} > Buscar Partida</Text>  
                    </TouchableOpacity>
                </View>
                <View style={styles.cuadroPequeno2}>
                    <Text style={styles.text2} >{this.state.textValue}</Text>  
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
    button: {
        width: 180,
        height: 45,
        backgroundColor: PRIMARY,
        borderRadius: 50,
        justifyContent: 'center',
        flexDirection: 'column'
    },
    buttonText: {
        fontSize: 20,
        textAlign: 'center',
        color: WHITE,
    },
    cuadroGrande: {
        flex: 4,
        flexDirection: 'column',
        alignContent: 'center',
    },
    cuadroPequeno: {
        flex: 2,
        borderColor: BLACK,
        flexDirection: 'column',
        alignSelf: 'center',
    },
    cuadroPequeno2: {
        flex: 1,
        borderColor: BLACK,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        padding: 10
    },
    title: {
        textAlign: 'center',
        color: TITLE,
        paddingTop: 20,
        paddingBottom: 20,
        fontSize: 38,
        fontWeight: 'bold',
    },
    text: {    
        fontSize: 20,
    },
    text2: {    
        fontSize: 16,
        color: 'red',
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    listContainer: {
        height: 50, width: 260, alignSelf: 'center'
    },
    listText: {
        fontSize: 18, justifyContent: 'center', color: 'black'
    },
});


