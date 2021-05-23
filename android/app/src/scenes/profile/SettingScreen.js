import React, { Component } from 'react';
import { View, Text, TouchableHighlight, TouchableWithoutFeedback, StyleSheet, Image, Alert, AsyncStorage, TouchableOpacity } from 'react-native';
import { PRIMARY, SECONDARY, BLACK, TITLE, GRAY_MEDIUM } from '../../styles/colors';
import { BarraLateral } from '_organisms'
import DropDownPicker from 'react-native-dropdown-picker';
import { getFriendList } from '_api/user';
import { Picker } from '@react-native-picker/picker';

import i18n from 'i18n-js';
import { StackActions } from '@react-navigation/native';
import { setBoardImage, setShipColor, getShipColor, getBoardImageName, } from '../../styles/gameStyle';

// Set the key-value pairs for the different languages you want to support.
i18n.translations = {
    en: { 
        welcome: 'Hello', 
        name: 'Charlie',
        Identificarse: 'Identify',
        ParCiegas: 'Random game',

    },
    es: { 
        welcome: 'hola', 
        Identificarse: 'Identificarse',
        Registrase: 'Registrarse',
        NomUsuario: 'Nombre de usuario',
        Correo: 'Correo',
        Cont: 'Contraseña',
        RepCont: 'Repetir contraseña',
        AceptCondi: 'Acepto las Condiciones de Uso y la Política de Privacidad',
        Siguiente: 'Siguiente',
        Volver: 'Volver',
        ParCiegas: 'Partida a ciegas',

    },
};
// Set the locale once at the beginning of your app.
i18n.locale = 'en';
// When a value is missing from a language it'll fallback to another language with the key present.
i18n.fallbacks = true;

export default class SettingScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shipColor: getShipColor(),
            boardColor: getBoardImageName(),
            language: "",
            listShip: ["blue", "red", "green"],
            listBoard: ["Oceano", "Desierto", "Cesped", "Espacio", "Lava"],
            listLanguage: ["en", "es"],
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
    changeLanguage(select) {
        //setLanguage(select);
        //var color = getLanguage()
        if(select=='es'){
            this.changeEs();
        }else{
            this.changeEn();
        }
        console.log("SELECT LANGUAGE " + select)

    }
    changeBoard(select) {
        setBoardImage(select);
        console.log("SELECT BOARD " + select)
    }
    changeShip(select) {
        setShipColor(select);
        var color = getShipColor();

        console.log("SELECT SHIP " + color)
    }
    render() {
        return (<View style={styles.container}>
            <View style={styles.cuadroGrande}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>
                            Configuraci�n
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
                        selectedValue={this.state.shipColor}
                        itemStyle={{ backgroundColor: "grey", color: "blue", fontFamily: "Ebrima", fontSize: 17 }}
                        onValueChange={(s) => this.changeShip(s)}>
                        {this.state.listShip.map((item, index) => {
                            return (<Picker.Item label={item} value={item} key={index} />)
                        })}
                    </Picker>
                    {/*<Text style={styles.text}>
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
                </Text></TouchableOpacity>*/}
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
                        selectedValue={this.state.boardColor}
                        onValueChange={(s) => this.changeBoard(s)}>
                        {this.state.listBoard.map((item, index) => {
                            return (<Picker.Item label={item} value={item} key={index} />)
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
                        selectedValue={this.state.boardColor}
                        onValueChange={(s) => this.changeLanguage(s)}>
                        {this.state.listLanguage.map((item, index) => {
                            return (<Picker.Item label={item} value={item} key={index} />)
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
        width: '40%',
    },
    titleContainer: {
        flex:1
    },
    opcionText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: PRIMARY
    },
    title: {
        textAlign: 'center',
        color: TITLE,
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


