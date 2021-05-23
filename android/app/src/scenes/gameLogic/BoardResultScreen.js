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

export default class BoardResultScreen extends Component {
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
        await this.updateBoard();
    }
    async componentWillUnmount() {
        this._ismounted = false;
    }
    async updateBoard() {
        let { username, accessToken, gameId } = this.state
        var msg = "";
        await getBoard(username, accessToken, gameId).then(data => {
            //console.log("Data de getBoard: " + JSON.stringify(data));
            if (data != "error") {
                if (data.myState == MITURNO)
                    msg = i18n.t('Victoria')
                else if (data.myState == TURNORIVAL)
                    msg = i18n.t('Derrota')
                this.setState(
                    { board: data, turnMsg: msg }
                )
            } else {
                alert('Error de getBoard');
            }
        });
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
            else if (board.myState == TURNORIVAL) {
                return (
                    <View style={oceanBox}>
                    </View>);
            }
            else if (!this.state.fin)
                return (
                    <View style={oceanBox}>
                    </View>
                );
            else
                return (<View style={oceanBox} />);
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
                    <View style={{ flex: 1 }}>
                        <TouchableHighlight style={styles.button} onPress={() => this.props.navigation.navigate('ResultList')}>
                            <Text style={styles.btnText}> {i18n.t('Volver')}</Text>
                        </TouchableHighlight>
                    </View>
                    <View style={{ flex: 1, top:'2%' }}>
                        <Text style={styles.turnText}> {this.state.turnMsg} </Text>
                    </View>
                </View>

            </View>
            <BarraLateral navigation={this.props.navigation} />

        </View>);
        return (
            <View style={styles.container} />
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
    turnText: { textAlign: 'center', color: PRIMARY, fontSize: 26 },
    boardImageContainer: { width: 260, height: 260 },

});


