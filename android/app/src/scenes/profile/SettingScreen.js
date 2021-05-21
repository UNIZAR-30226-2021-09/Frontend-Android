import React, { Component } from 'react';
import { View, Text, TouchableHighlight, TouchableWithoutFeedback, StyleSheet, Image, Alert, AsyncStorage } from 'react-native';
import { PRIMARY, SECONDARY, BLACK } from '../../styles/colors';
import { BarraLateral } from '_organisms'
import DropDownPicker from 'react-native-dropdown-picker';
import { getFriendList } from '_api/user';
import { Picker } from '@react-native-picker/picker';


export default class SettingScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Amigo1: "",
            TokenAmigo1: "",
            Amigo2: "",
            TokenAmigo2: "",
            Amigo3: "",
            TokenAmigo3: "",
            listaAmigos: ["Oceano", "Desierto", "Cesped", "Espacio", "Lava"],
            //listaAmigosDDP: [{label:"", nombre:""}],
        }
    }
 
    async componentDidMount() {

    }

    render() {
        return (<View style={styles.container}>
            <View style={styles.cuadroGrande}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>
                            Configuración
                    </Text>
                </View>
                <View style={styles.opcion}>
                    <View style={styles.opcion2}>
                        <Text style={styles.opcionText}>
                            Color de los barcos
                        </Text>
                    </View>
                    <Picker
                        style={styles.opcion3}
                        labelStyle={styles.listText}
                        placeholderStyle={styles.text}
                        mode="dropdown"
                        selectedValue={this.state.Amigo1}
                        itemStyle={{ backgroundColor: "grey", color: "blue", fontFamily: "Ebrima", fontSize: 17 }}
                        onValueChange={() => { }}>
                        {this.state.listaAmigos.map((item, index) => {
                            return (<Picker.Item label={item} value={index} key={index} />)
                        })}
                    </Picker>

                </View>
                <View style={styles.opcion}>
                    <View style={styles.opcion2}>
                        <Text style={styles.opcionText}>
                            Color del tablero
                        </Text>
                    </View>
                    <Picker
                        style={styles.opcion3}
                        mode="dropdown"
                        selectedValue={this.state.Amigo2}
                        onValueChange={() => { }}>
                        {this.state.listaAmigos.map((item, index) => {
                            return (<Picker.Item label={item} value={index} key={index} />)
                        })}
                    </Picker>
                </View>
                <View style={styles.opcion}>
                    <View style={styles.opcion2}>
                        <Text style={styles.opcionText}>
                            Idioma
                        </Text>
                    </View>
                    <Picker
                        style={styles.opcion3}
                        mode="dropdown"
                        selectedValue={this.state.Amigo2}
                        onValueChange={() => { }}>
                        {this.state.listaAmigos.map((item, index) => {
                            return (<Picker.Item label={item} value={index} key={index} />)
                        })}
                    </Picker>
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
    opcion: {
        flex: 1,
        flexDirection: 'row'
    },
    opcion2: {
        flex: 1,
        width: '60%',
        alignSelf: 'center',
        padding:'10%'
    },
    opcion3: {
        flex: 1,
        width:'40%'
    },
    titleContainer: {
        flex:1
    },
    opcionText: {
        fontSize: 24,
        fontWeight:'bold'
    },
    title: {
        textAlign: 'center',
        color: 'black',
        paddingTop: 20,
        paddingBottom: 20,
        fontSize: 38,
        fontWeight: 'bold'
    },
    listContainer: {
        height: 50, width: 260, alignSelf: 'center'
    },
    listText: {
        fontSize: 18, justifyContent: 'center', color: 'black'
    },
    text: {
        fontSize: 18
    }
});


