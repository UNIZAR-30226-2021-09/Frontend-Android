import React, { Component } from 'react';
import { View, Text, TouchableHighlight, TouchableWithoutFeedback, StyleSheet, Image, Alert, AsyncStorage, TouchableOpacity } from 'react-native';
import { PRIMARY, SECONDARY, BLACK } from '../../styles/colors';
import { BarraLateral } from '_organisms'
import DropDownPicker from 'react-native-dropdown-picker';
import { getFriendList } from '_api/user';
import { Picker } from '@react-native-picker/picker';

import i18n from 'i18n-js';
import { StackActions } from '@react-navigation/native';

// Set the key-value pairs for the different languages you want to support.
i18n.translations = {
    en: { welcome: 'Hello', name: 'Charlie' },
    es: { welcome: 'hola' },
};
// Set the locale once at the beginning of your app.
i18n.locale = 'en';
// When a value is missing from a language it'll fallback to another language with the key present.
i18n.fallbacks = true;

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
            language:false
        }
    }
    changeEn = () => {
        i18n.locale = 'en';
        this.props.navigation.dispatch(
            StackActions.replace('Setting')
        );
    }
    changeEs = () => {
        i18n.locale = 'es';
        this.props.navigation.dispatch(
            StackActions.replace('Setting')
        );
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
                    <Text style={styles.text}>
                        {i18n.t('welcome')} {i18n.t('name')}
                    </Text>
                    <TouchableOpacity style={styles.button} onPress={() => this.changeEs()}>
                        <Text style={styles.text}>
                            changeEs
                </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => this.changeEn()}>
                        <Text style={styles.text}>
                            changeEn
                </Text></TouchableOpacity>
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
    },
    button: {
        width: 100,
        height: 50,
        backgroundColor:'yellow'
    }
    
});


