import React, { Component } from 'react';
import { View, Text, TouchableHighlight, TouchableWithoutFeedback, StyleSheet, Image, Alert, AsyncStorage, TouchableOpacity } from 'react-native';
import { PRIMARY, SECONDARY, BLACK, TITLE, GRAY_MEDIUM } from '../../styles/colors';
import { BarraLateral } from '_organisms'
import DropDownPicker from 'react-native-dropdown-picker';
import { getFriendList } from '_api/user';
import { Picker } from '@react-native-picker/picker';

import i18n from 'i18n-js';
import { StackActions } from '@react-navigation/native';
import { setBoardImage, setShipColor, getShipColor, getBoardImageName, getShipColorName, } from '../../styles/gameStyle';

// Set the key-value pairs for the different languages you want to support.
i18n.translations = {
    en: { 
        welcome: 'hola', 
        Identificarse: 'Identify',
        Registrase: 'Sing up',
        NomUsuario: 'User name',
        Correo: 'Mail',
        Cont: 'Password',
        RepCont: 'Repeat password',
        AceptCondi: 'I accept the Terms of Use and the Privacy Policy',
        Siguiente: 'Next',
        Volver: 'Go back',
        ParCiegas: 'Random game',
        ParAmigo: 'Challenge friend',
        ParTorneo: 'Tournament',
        PartCurso: 'Games in progress',
        ParIA: 'Game vs IA',
        MisAmigos: 'My friends',
        InvDeAmigos: 'Friend invitations',
        PetAmistas: 'Friend requests',
        MiPerfil: 'My profile',
        BuscarPartida: 'Find game',
        PartCiegasError: 'There is no one waiting for the game, when an opponent appears, the game will be added to your list of current games',
        InvitarAmigo: 'Invite a friend',
        VasAInvitar: 'You are going to invite:',
        ElegirOtro: 'Choose other',
        EnvPeticion: 'Send request',
        Selec3Amigos: 'Choose three friends',
        Comenzar: 'Start',
        VerClasificacion: 'See Classification',
        HistoPartidas: 'Games history',
        ParJugadas: 'Games played:',
        Victorias: 'Victories:',
        Derrotas: 'Defeats:',
        TornGana: 'Won tournaments:',
        Ratio: 'Win ratio:',
        Puntos: 'Points:',
        Compartir: 'Share',
        CerrarSesion: 'Sign off',
        ColorBarcos: 'Ships colour',
        Configuracion: 'Settings',
        ColorTablero: 'Board color',
        Idioma: 'Idiom',
        
        IntNomUsuario: 'Enter username',
        IntCorreo: 'Enter mail',
        IntCorreoValido: 'Enter correct mail',
        IntCont: 'Enter password',
        ContErr: 'Passwords does not match',
        AceptCondErr: 'You must accept the Terms of Use and the Privacy Policy to continue',

        AnAmigo: 'Add friend',
        EnlaceInv: 'Send Invitation',
        IntNomOEnl: 'Introduce name or link',
        PetEnv: 'Request sent',
        ErrAddFriend: 'Error in addFriend',
        Enviado: 'Sent',
        Recibidas: 'Received',
        Aceptar: 'Acept',
        Rechazar: 'Reject',
        Enviadas: 'Sent',
        Cancelar: 'Cancel',
        Victoria: 'Victory',
        Derrota: 'Defeat',
        TuTurno: 'Your turn',
        TurnoRival: 'Rival\'s turn',
        HasGanado: 'You won',
        HasPerdido: 'You lost',
        EsperarRival: 'Wait for your rival to place the ships',
        FueraTablero: 'You\'re shooting off the board',
        VerResultados: 'See results',
        Rendirse: 'Surrender',
        Salir: 'Leave',
        ColoqueBarcos: 'Place all ships',
        PuntObt: 'Points earned:',
        DispRea: 'Shots fired:',
        DispAce: 'Successful shots:',
        BarcDest: 'Destroyed ships:',
        Terminar: 'End up',
        Nombre: 'Name',
        PartidasPerdidas: 'Lost games',
        PartidasGanadas: 'Won games',
        PartidasFinalizadas: 'Completed games',
        PartidaContra: 'Game against',
        VerPartida: 'See game',
        SeHaAnadidoPartidaCiegas: 'A game has been added',
        NoHayPeticiones: 'No new requests',
        Cerrar: 'Close',
        PetPartAmis: 'Friendly game requests',
        Torneo: 'Tournament',
        BattleShip: 'BattleShip',
        Selecciona: 'Choose',
        Friend: 'friend',
        ComienzaTorneo: 'Start tournament',
        Vaciar: 'Clear',
        LaPartida: 'game',
        Oceano: 'Ocean',
        Desierto: 'Desert',
        Cesped: 'Grass',
        Espacio: 'Space',
        Lava: 'Wash',
        Azul: 'Blue',
        Rojo: 'Red',
        Verde: 'Green',
        Espanyol: 'Spanish',
        Ingles: 'English',
        Terminado: 'Finished',
        MensajeCopiado: 'Link copied to clipboard'

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
        ParAmigo: 'Desafiar amigo',
        ParTorneo: 'Modo torneo',
        PartCurso: 'Partidas en curso',
        ParIA: 'Partida contra IA',
        MisAmigos: 'Mis amigos',
        InvDeAmigos: 'Invitaciones de amigos',
        PetAmistas: 'Peticiones de amistad',
        MiPerfil: 'Mi perfil',
        BuscarPartida: 'Buscar Partida',
        PartCiegasError: 'No hay nadie esperando partida, cuando aparezca un contrincante se añadirá la partida a tu lista de partidas en curso',
        InvitarAmigo: 'Invita a un amigo',
        VasAInvitar: 'Vas a invitar a:',
        ElegirOtro: 'Elegir a otro',
        EnvPeticion: 'Enviar petición',
        Selec3Amigos: 'Selecciona tres amigos',
        Comenzar: 'Comenzar',
        VerClasificacion: ' Ver Clasificación',
        HistoPartidas: 'Historial de partidas',
        ParJugadas: 'Partidas Jugadas:',
        Victorias: 'Victorias:',
        Derrotas: 'Derrotas:',
        TornGana: 'Torneos ganados:',
        Ratio: 'Ratio de victorias:',
        Puntos: 'Puntos:',
        Compartir: 'Compartir',
        CerrarSesion: 'Cerrar sesión',
        ColorBarcos: 'Color de los barcos',
        Configuracion: 'Configuración',
        ColorTablero: 'Color del tablero',
        Idioma: 'Idioma',

        IntNomUsuario: 'Introduzca el nombre de usuario',
        IntCorreo: 'Introduzca un correo electrónico',
        IntCorreoValido: 'Introduzca un correo electrónico válido',
        IntCont: 'Introduzca una contrase�a',
        ContErr: 'Las contrase�as no coinciden',
        AceptCondErr: 'Debe aceptar las Condiciones de Uso y la Política de Privacidad para seguir',

        AnAmigo: 'Añadir amigo',
        EnlaceInv: 'Enlace de invitación',
        IntNomOEnl: 'Introduzca nombre o enlace',
        PetEnv: 'Petición enviada',
        ErrAddFriend: 'Error de addFriend',
        Enviado: 'Enviado',
        Recibidas: 'Recibidas',
        Aceptar: 'Aceptar',
        Rechazar: 'Rechazar',
        Enviadas: 'Enviadas',
        Cancelar: 'Cancelar',
        Victoria: 'Victoria',
        Derrota: 'Derrota',
        TuTurno: 'Tu turno',
        TurnoRival: 'Turno del rival',
        HasGanado: 'Has ganado',
        HasPerdido: 'Has perdido',
        EsperarRival: 'Espere a que tu rival coloque los barcos',
        FueraTablero: 'Est�s disparando fuera del tablero',
        VerResultados: 'Ver resultados',
        Rendirse: 'Rendirse',
        Salir: 'Salir',
        ColoqueBarcos: 'Coloque todos los barcos',
        PuntObt: 'Puntos obtenidos:',
        DispRea: 'Disparos realizados:',
        DispAce: 'Disparos acertados:',
        BarcDest: 'Barcos destruidos:',
        Terminar: 'Terminar',
        Nombre: 'Nombre',
        PartidasPerdidas: 'Partidas perdidas',
        PartidasGanadas: 'Partidas ganadas',
        PartidasFinalizadas: 'Partidas finalizadas',
        PartidaContra: 'Partida contra',
        VerPartida: 'Ver partida',
        SeHaAnadidoPartidaCiegas: 'Se ha añadido una partida a tu listado',
        NoHayPeticiones: 'No hay peticiones nuevas',
        Cerrar: 'Cerrar',
        PetPartAmis: 'Peticiones de partidas amistosas',
        Torneo: 'Torneo',
        BattleShip: 'Juego de barcos',
        Selecciona: 'Selecciona',
        Friend: 'amigo',
        ComienzaTorneo: 'Comienza el torneo',
        Vaciar: 'Vaciar',
        LaPartida: 'la partida',
        Oceano:'Oceano',
        Desierto:'Desierto',
        Cesped:'Cesped',
        Espacio:'Espacio',
        Lava: 'Lava',
        Azul: 'Azul',
        Rojo: 'Rojo',
        Verde: 'Verde',
        Espanyol: 'Español',
        Ingles: 'Inglés',
        Terminado: 'Terminado',
        MensajeCopiado: 'Enlace copiado al portapapeles'
    },
};
// Set the locale once at the beginning of your app.
i18n.locale = 'en';
// When a value is missing from a language it'll fallback to another language with the key present.
i18n.fallbacks = true;

export default class SettingScreen extends Component {
    constructor(props) {
        super(props);
        var lan = i18n.t("Ingles");
        console.log("LOG LANG" + i18n.locale)
        if (i18n.locale == 'es') lan = i18n.t("Espanyol");
        this.state = {
            shipColor: getShipColorName(),
            boardColor: getBoardImageName(),
            language:  lan,
            listShip: [i18n.t('Verde'), i18n.t('Rojo'), i18n.t('Azul')],
            listBoard: [i18n.t('Oceano'), i18n.t('Desierto'), i18n.t('Cesped'), i18n.t('Espacio'), i18n.t('Lava')],
            listLanguage: [i18n.t("Ingles"), i18n.t("Espanyol")],
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
        if (select == i18n.t("Espanyol")){
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
                        {i18n.t('Configuracion')}
                    </Text>
                </View>
                <View style={styles.opcion}>
                    <View style={styles.opcion2}>
                        <Text style={styles.opcionText}>
                            {i18n.t('ColorBarcos')}

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
                            {i18n.t('ColorTablero')}
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
                            {i18n.t('Idioma')}
                        </Text>
                    </View>
                    <Picker
                        style={styles.opcion3}
                        mode="dropdown"
                        selectedValue={this.state.language}
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
        padding: '10%',
        top:'-3%'
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
        color: PRIMARY,
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


