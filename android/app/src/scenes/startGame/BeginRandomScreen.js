import React, { Component } from 'react';
import { View, Text, TouchableHighlight, TouchableWithoutFeedback, StyleSheet, Image, Alert,AsyncStorage, TouchableOpacity } from 'react-native';
import { PRIMARY, SECONDARY, BLACK } from '../../styles/colors';
import { BarraLateral } from '_organisms'
import DropDownPicker from 'react-native-dropdown-picker';
import { emparejamientoACiegas } from '_api/game';

/*
async function startGame({navigation}) {
    var _username = await AsyncStorage.getItem('username');
    var accessToken = await AsyncStorage.getItem('userToken');
    var user = {
        Username: _username,
        AccessToken: accessToken
    };
    console.log(user);
        
            await emparejamientoACiegas(user).then(data => {
                console.log("Data de random: " + data);
                if (data != "error") {
                    console.log("No ha habido fallo al comunicarse con el server")
                } else {
                    alert('Error de  random de partida a ciegas');
                }
            }).catch(err => {
                console.log("error random")
                console.log(err)
                return "error"
            });
            navigation.navigate('Home');
  
}*/

export default class BeginRandomScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            textValue: ''
        }
    }
    
    //Funcion que se conecta a la API
    
    async startGame() {
        var _username = await AsyncStorage.getItem('username');
        var accessToken = await AsyncStorage.getItem('userToken');
        var user = {
            Username: _username,
            AccessToken: accessToken
        };
        console.log(user);
            
                await emparejamientoACiegas(user).then(data => {
                    console.log("Data de random: " + data);
                    if (data != "error") { 
                        console.log("No ha habido fallo al comunicarse con el server")
                        //Ahora hacer que muestre un mensaje u otro dependiendo del resultado
                        if(data.mensaje){
                            this.setState({textValue: 'No hay nadie esperando partida, cuando aparezca un contrincante se añadira la partida a tu lista de partidas'})
                        }else{
                            //Aqui se ha encontrado partida asi que redirige a la partida 
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
                <TouchableOpacity style={styles.cuadroPequeno} onPress={() => this.startGame()}>
                    <Text style={styles.text} > Buscar Partida</Text>  
                </TouchableOpacity>
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
    cuadroGrande: {
        flex: 4,
        borderColor: BLACK,
        borderWidth: 3,
        flexDirection: 'column',
        alignContent: 'center',
    },
    cuadroPequeno: {
        flex: 1,
        borderColor: BLACK,
        flexDirection: 'column',
        alignSelf: 'center'
    },
    cuadroPequeno2: {
        flex: 1,
        borderColor: BLACK,
        flexDirection: 'column',
        alignSelf: 'center',
        height: 50, width: 500,
    },
    title: {
        textAlign: 'center',
        color: 'black',
        paddingTop: 20,
        paddingBottom: 20,
        fontSize: 38,
        fontWeight: 'bold',
    },
    text: {    
        fontSize: 20,
    },
    text2: {    
        fontSize: 20,
        color: 'red',
    },
    listContainer: {
        height: 50, width: 260, alignSelf: 'center'
    },
    listText: {
        fontSize: 18, justifyContent: 'center', color: 'black'
    },
});


