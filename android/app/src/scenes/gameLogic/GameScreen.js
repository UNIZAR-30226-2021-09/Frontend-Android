import React, { Component } from 'react';
import { View, Text, TouchableHighlight, TouchableWithoutFeedback, StyleSheet, Image, Alert, AsyncStorage, ToastAndroid, ImageBackground } from 'react-native';
import { PRIMARY, SECONDARY, BLACK } from '../../styles/colors';
import { BarraLateral } from '_organisms'
import { checkBox, OCEAN_BOX, TOUCHED_BOX, SUNKEN_BOX, NO_ATACK_BOX, OCEAN_NOT_ATTACK, OCEAN_ATTACK, SHIP_NOT_ATTACK, SHIP_ATTACK, COLOCADO } from '_api/match';
import { Table, TableWrapper, Cell } from 'react-native-table-component'
import { initBoard, attack, getSolution, initAttack, initShip, initCoord, IAmove, getCoord, getBoard, placeMovement, movement, rendirse } from '_api/match';
import { socket, disparo } from '_api/user/socket';
import { getShipColor, getBoardImage, getBoardColor } from '../../styles/gameStyle';
import i18n from 'i18n-js';

const GANADO = "GANADO"
const PERDIDO = "PERDIDO"
const MITURNO = "tuTurno"
const TURNORIVAL = "turnoRival"

export default class GameScreen extends Component {
    constructor(props) {
        super(props);
        let params = this.props.route.params;
        //let boardSolution = params.boardSolution;
        this.state = {
            board: {
                myBoard: [],
                rivalBoard: [],
                myState: ""
            },
            username: "",
            accessToken: "",
            gameId: "",
            fin: false,
            ganador: false,
            turnMsg: ""
        }

    }

    async componentDidMount() {
        this._ismounted = true;
        var _username = await AsyncStorage.getItem('username');
        var _accessToken = await AsyncStorage.getItem('userToken');
        var _gameId = await AsyncStorage.getItem('gameId');

        this.setState({ username: _username, accessToken: _accessToken, gameId: _gameId });

        await socket.on('llegaMovement', (data) => {
            //console.log("-------- Socket llegaMovement a " + _username + " Turno: " + data)
            if (data.nuevoTurno == MITURNO) {
                //ToastAndroid.show("Tu rival ha fallado, es tu turno", ToastAndroid.SHORT)
            } else if (data.nuevoTurno == TURNORIVAL) {
                //ToastAndroid.show("Tu rival ha acertado, sigue siendo su turno", ToastAndroid.SHORT)
            } else if (data.nuevoTurno == GANADO) {
                this.setState({ fin: true, ganador: true })
            } else if (data.nuevoTurno == PERDIDO) {
                this.setState({ fin: true, ganador: false })
            } 
            this.updateBoard();
        })

        await this.updateBoard();
    }
    async componentWillUnmount() {
        this._ismounted = false;
    }
    async updateBoard() {
        let { username, accessToken, gameId, fin, ganador } = this.state
        var msg = "";
        await getBoard(username, accessToken, gameId).then(data => {
            //console.log("Data de getBoard: " + data);
            if (data != "error") {
                if (data.myState == MITURNO) 
                    msg = "Tu turno"
                else if (data.myState == TURNORIVAL)
                    msg = "Turno del rival"

                if (fin && ganador)
                    msg = "Has ganado";
                else if (fin)
                    msg = "Has perdido";
                console.log("TURNO:    ---" + this.state.board.myState + fin + ganador + msg)

                this.setState(
                    { board: data, turnMsg: msg}
                )
            } else {
                alert('Error de getBoard');
            }
        });
    }



    async onClick(row, col) {
        let { username, accessToken, gameId } = this.state
        await movement(username, accessToken, gameId, row, col).then(data => {
            console.log("Data de movement: " + JSON.stringify(data));
            if (data.error != "error") {
                if (data.movimientoIA) {

                }
                else if (!data.fin && data.disparo == "fallo") {
                    disparo(gameId, MITURNO)
                    //ToastAndroid.show("Has fallado, es turno de tu rival", ToastAndroid.SHORT)
                } else if (!data.fin) {
                    disparo(gameId, TURNORIVAL)
                    //ToastAndroid.show("Has acertado, sigue siendo tu turno", ToastAndroid.SHORT)
                }
                if (data.fin && data.infoPartida.ganador) {
                    disparo(gameId, PERDIDO)
                    this.setState({ fin: true, ganador: true })
                } else if (data.fin && !data.infoPartida.ganador) {
                    disparo(gameId, GANADO)
                    this.setState({ fin: true, ganador: false })
                }
                this.updateBoard();
                console.log("FIN--" + this.state.fin + this.state.ganador)
            } else {
                var msg = data.tipo
                if (data.tipo.includes("coloque sus barcos"))
                    msg = "Espere a que tu rival coloque los barcos";
                else if (data.tipo.includes("fuera de los"))
                    msg = "Est�s disparando fuera del tablero";
                    ToastAndroid.show(msg, ToastAndroid.SHORT)
            }
        });
    }

    _alertIndex(index, col) {
        Alert.alert(`This is row ${index + 1} + ${col + 1}`);
    }
    async giveUp() {
        let { username, accessToken, gameId } = this.state
        await rendirse(username, accessToken, gameId)
            .then(data => {
                this.props.navigation.navigate('Result')
            })
    }
    render() {
        let { board } = this.state;
        const color = getBoardColor();
        var oceanBox = { width: 26, height: 26, backgroundColor: 'transparent', borderRadius: 0, borderColor: color, borderWidth: 0.2, alignSelf: 'center' }
        var touchedBox = { width: 26, height: 26, backgroundColor: getShipColor(), borderRadius: 0, borderColor: getBoardColor(), borderWidth: 0.2 };
        const getMyBox = (box, row, col) => {
            var sunkenBox = { width: 26, height: 26, backgroundColor: 'grey', borderRadius: 0, borderColor: color, borderWidth: 0.2 };
                if (box != NO_ATACK_BOX) {
                    let boxStyle = oceanBox;
                    switch (box) {
                        case TOUCHED_BOX:
                            boxStyle = touchedBox;
                            break;
                        case SUNKEN_BOX:
                            boxStyle = sunkenBox;
                            break;
                    }
                    return (<View style={boxStyle}>
                        <Image source={require("_assets/images/redX2.png")} style={styles.image} />
                    </View>);
                }
                else if (board.myState == TURNORIVAL ) {
                    return (<TouchableWithoutFeedback onPress={() => ToastAndroid.show("Es turno de tu rival", ToastAndroid.SHORT) }>
                        <View style={oceanBox}>
                        </View>
                    </TouchableWithoutFeedback>);
                }
                else if (!this.state.fin)
                    return (<TouchableWithoutFeedback onPress={() => this.onClick(row, col)}>
                        <View style={oceanBox}>
                        </View>
                    </TouchableWithoutFeedback>);
                else 
                    return (<View style={oceanBox}/>);
        };

        const getIABox = (box, row, col) => {
            let boxStyle = oceanBox;
            if (box == OCEAN_NOT_ATTACK || box == SHIP_NOT_ATTACK) {
                if (box == OCEAN_NOT_ATTACK)
                    boxStyle = oceanBox;
                else
                    boxStyle = touchedBox;
                return (<View style={boxStyle} />);
            } else {
                if (box == OCEAN_ATTACK)
                    boxStyle = oceanBox;
                else
                    boxStyle = touchedBox;
                return (<View style={boxStyle}>
                    <Image source={require("_assets/images/redX2.png")} style={styles.image} />
                </View>);
            }
        };
        return (<View style={styles.container}>
            <View style={styles.cuadroGrande}>
                <View style={styles.cuadroGrande1}>
                    
                    <View style={styles.boardContainer}>
                        <ImageBackground style={styles.boardImageContainer} source={getBoardImage()} >

                        <Table borderStyle={{ borderColor: 'transparent' }}>
                            {
                                board.rivalBoard.map((rowData, index) => (
                                    <TableWrapper key={index} style={styles.row}>
                                        {
                                            rowData.map((cellData, cellIndex) => (
                                                <Cell key={cellIndex} data={true ? getIABox(cellData, index, cellIndex) : cellData} textStyle={styles.text} />
                                            ))
                                        }
                                    </TableWrapper>
                                ))
                            }
                            </Table>
                        </ImageBackground> 
                    </View>
                        <View style={styles.boardContainer}>
                            <ImageBackground style={styles.boardImageContainer} source={getBoardImage()} >

                        <Table borderStyle={{ borderColor: 'transparent' }}>
                            {
                                board.myBoard.map((rowData, index) => (
                                    <TableWrapper key={index} style={styles.row}>
                                        {
                                            rowData.map((cellData, cellIndex) => (
                                                <Cell key={cellIndex} data={true ? getMyBox(cellData, index, cellIndex) : cellData} textStyle={styles.text} />
                                            ))
                                        }
                                    </TableWrapper>
                                ))
                            }
                            </Table>
                        </ImageBackground> 
                    </View>
                </View>
                <View style={styles.startButtonContainer}>
                    {this.state.fin ?
                        <View style={{ flex: 1 }}>
                            <TouchableHighlight style={styles.button} onPress={() => this.props.navigation.navigate('Result')}>
                                    <Text style={styles.btnText}> Ver resultados</Text>
                            </TouchableHighlight>
                        </View> :
                        <View style={{ flex: 1 }}>
                            <TouchableHighlight style={styles.button} onPress={() => this.giveUp()}>
                                <Text style={styles.btnText}> Rendirse</Text>
                            </TouchableHighlight>
                        </View>
                    }
                    <View style={{ flex: 1 }}>
                        <Text style={styles.turnText}> {this.state.turnMsg} </Text>
                    </View>
                    <View style={{ flex: 1 }}>
                            
                        <TouchableHighlight style={styles.button} onPress={() => this.props.navigation.navigate('Home')}>
                            <Text style={styles.btnText}> Salir</Text>
                        </TouchableHighlight>
                    </View>
                </View>

            </View>
            <BarraLateral navigation={this.props.navigation} />

        </View>);
        return (
            <View style={styles.container}/>
            )
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
    cuadroGrande1: {
        flex: 4,
        flexDirection: 'row',
        alignContent: 'center',
    },
    head: { height: 30, backgroundColor: '#808B97' },
    text: { margin: 6 },
    boardContainer: { flex: 1, width: 260, height: 260, padding: 5, paddingBottom: 40, backgroundColor: '#fff' },

    row: {
        flexDirection: 'row', backgroundColor: 'transparent', 
    },
    startButtonContainer: {
        flex: 1,
        flexDirection: 'row',

    },
    button: { alignSelf: 'center', width: 100, height: 30, backgroundColor: PRIMARY, borderRadius: 50, top: '30%' },

    btnText: { textAlign: 'center', color: 'white', paddingTop: 5 },
    oceanBox: { width: 26, height: 26, backgroundColor: 'cyan', borderRadius: 0, borderColor: 'blue', borderWidth: 0.18 },
    shipBox: { width: 26, height: 26, backgroundColor: 'grey', borderRadius: 0, borderColor: 'blue', borderWidth: 0.2 },

    touchedBox: { width: 26, height: 26, backgroundColor: 'grey', borderRadius: 0, borderColor: 'blue', borderWidth: 0.2 },
    sunkenBox: { width: 26, height: 26, backgroundColor: 'grey', borderRadius: 0, borderColor: 'grey', borderWidth: 1 },
    noAttackBox: { width: 26, height: 26, backgroundColor: 'white', borderRadius: 0, borderColor: 'blue', borderWidth: 0.2 },
    touchedOcean: { width: 26, height: 26, backgroundColor: 'cyan', borderRadius: 0, borderColor: 'blue', borderWidth: 0.2 },
    touchedShip: { width: 26, height: 26, backgroundColor: 'grey', borderRadius: 0, borderColor: 'blue', borderWidth: 0.2 },
    image: {
        width: 20, height: 20, alignSelf: 'center', resizeMode: 'center',
    },
    turnText: { textAlign: 'center', color: PRIMARY, fontSize: 20 },
    boardImageContainer: { width: 260, height: 260 },

});


