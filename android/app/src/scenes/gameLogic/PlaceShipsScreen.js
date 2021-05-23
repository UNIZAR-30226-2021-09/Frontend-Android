import React, { Component } from 'react';
import { View, Text, TouchableHighlight, TouchableWithoutFeedback, StyleSheet, Image, Alert, ImageBackground, AsyncStorage } from 'react-native';
import { PRIMARY, SECONDARY, BLACK } from '../../styles/colors';
import { BarraLateral } from '_organisms'
import { checkBox, OCEAN_BOX, TOUCHED_BOX, SUNKEN_BOX, NO_ATACK_BOX } from '_api/match';
import { Table, TableWrapper, Cell } from 'react-native-table-component'
import {
    initBoard, getBox, attack, getSolution, initAttack, initShip, IAmove,
    placeShip, initCoord, SUCCESS, checkIfAllShips, transformSolution, initDir,
    startGame
} from '_api/match';
import { getShipColor, getBoardImage, getBoardColor } from '../../styles/gameStyle';
import i18n from 'i18n-js';
import { playDrop } from '_assets/sound/PlaySound'
import { ToastAndroid } from 'react-native';
const NO_SELECT_COLOR = 'white';
const SELECT_COLOR = 'cyan';
const CARRIER = 5;
const BATTLESHIP = 4;
const SUBMARINE1 = 3;
const SUBMARINE2 = 1;
const CRUISER = 2;
const OCEAN = 0;
const VERTICAL = 0;
const HORIZONTAL = 1;
export default class PlaceShipsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myBoard: {
                board: initBoard(),
                coordShips: initCoord(),
                solution: initBoard(),
                shipDir: initDir(),
            },
            IABoard: {
                board: initBoard(),
                solution: getSolution(),
                attack: initAttack(),
                noDetectedShip: initShip()
            },
            selectShip: OCEAN,
            shipDirection: [VERTICAL, VERTICAL, VERTICAL, VERTICAL, VERTICAL],
            shipColors: [NO_SELECT_COLOR, NO_SELECT_COLOR, NO_SELECT_COLOR, NO_SELECT_COLOR, NO_SELECT_COLOR]
        }
    }

    async onClick(row, col) {
        const { myBoard, IABoard, selectShip, shipDirection } = this.state

        //console.log(selectShip +'DIR' + shipDirection[selectShip - 1] )
        //console.log("--COLOCAR BARCO " + result.error);
        if (selectShip != OCEAN) {
            const result = placeShip(row, col, selectShip, shipDirection[selectShip - 1], myBoard);
            if (result.error != SUCCESS) {
                ToastAndroid.show(result.error, ToastAndroid.SHORT)
            } 
            await playDrop();
            this.setState({
                myBoard: result.board,
                //IABoard: IAmove(IABoard)
            })
        }
    }

    _alertIndex(index, col) {
        Alert.alert(`This is row ${index + 1} + ${col + 1}`);
    }
    restart() {
        this.setState({
            myBoard: {
                board: initBoard(),
                solution: getSolution(),
                attack: initAttack(),
                noDetectedShip: initShip()
            },
            IABoard: {
                board: initBoard(),
                solution: getSolution(),
                attack: initAttack(),
                noDetectedShip: initShip()
            },
        })
    }
    placeShip(ship) {
        const { shipDirection, shipColors, selectShip } = this.state

        if (selectShip == ship) {
            shipDirection[selectShip - 1] = (shipDirection[selectShip - 1]==VERTICAL? HORIZONTAL:VERTICAL );
            this.setState({
                shipDirection: shipDirection,
            })
        } else {
            shipColors[selectShip - 1] = NO_SELECT_COLOR;
            shipColors[ship - 1] = SELECT_COLOR;
            this.setState({
                selectShip: ship,
                shipColors: shipColors
            })
        }
    }
    async start() {
        let { myBoard } = this.state
        if (checkIfAllShips(myBoard)) {
            var _username = await AsyncStorage.getItem('username');
            var _accessToken = await AsyncStorage.getItem('userToken');
            var _gameId = await AsyncStorage.getItem('gameId');
            startGame(_username, _accessToken, _gameId, myBoard);
            this.props.navigation.navigate('Game');
        }
        else
            ToastAndroid.show("Coloque todos los barcos", ToastAndroid.SHORT);
    }
    render() {
        let { myBoard, shipDirection, shipColors } = this.state;
        const getMyBox = (box, row, col) => {
            var color = getBoardColor();
            console.log("BOARD COLOR"+color);
            if (box != NO_ATACK_BOX) {
                let boxStyle = { width: 26, height: 26, backgroundColor: 'transparent', borderRadius: 0, borderColor: color, borderWidth: 0.2, alignSelf: 'center' };
                if (box != OCEAN_BOX)
                    boxStyle = { width: 26, height: 26, backgroundColor: getShipColor(), borderRadius: 0, borderColor: color, borderWidth: 0.2 };
                return (<TouchableWithoutFeedback onPress={() => this.onClick(row, col)}>
                    <View style={boxStyle}>
                    </View>
                </TouchableWithoutFeedback>);
            }
        };
        const ShipButton = (props) => {
            let { shipDirection, shipColors } = this.state;
            let imageStyle = styles.image;
            var color = getShipColor();
            if (shipDirection[props.ship - 1] == HORIZONTAL && shipColors[props.ship - 1] == NO_SELECT_COLOR)
                imageStyle = styles.rotateImage;
            else if (shipDirection[props.ship - 1] == HORIZONTAL && shipColors[props.ship - 1] == SELECT_COLOR)
                imageStyle = styles.rotateSelectImage;
            else if (shipDirection[props.ship - 1] == VERTICAL && shipColors[props.ship - 1] == SELECT_COLOR)
                imageStyle = styles.selectImage;
            return (
                <View style={{}}>
                    <TouchableHighlight onPress={() => this.placeShip(props.ship)}>
                        <Image source={props.src} style={imageStyle} tintColor={color} />
                    </TouchableHighlight>
                </View>
            );
        }

        return (<View style={styles.container}>
            <View style={styles.cuadroGrande}>
                <View style={styles.cuadroGrande1}>
                    <View style={styles.shipContainer}>
                        <View style={styles.shipContainer1}>
                            <ShipButton ship={CARRIER} src={require("_assets/images/carrier.png")} />
                            <ShipButton ship={SUBMARINE1} src={require("_assets/images/submarine.png")} />
                            <ShipButton ship={CRUISER} src={require("_assets/images/cruiser.png")} />
                        </View>
                        <View style={styles.shipContainer1}>
                            <ShipButton ship={BATTLESHIP} src={require("_assets/images/battleship.png")} />
                            <ShipButton ship={SUBMARINE2} src={require("_assets/images/submarine.png")} />
                        </View>
                    </View>
                    <View style={styles.boardContainer}>
                        <ImageBackground style={styles.boardImageContainer} source={getBoardImage()} >
                        <Table borderStyle={{ borderColor: 'transparent' }}>
                            {
                                myBoard.board.map((rowData, index) => (
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
                        <TouchableHighlight style={styles.button} onPress={() => this.props.navigation.navigate("OngoingGame")}>
                            <Text style={styles.btnText}> Volver </Text>
                        </TouchableHighlight>
                    </View>
                    <View style={{ flex: 1 }}>
                    <TouchableHighlight style={styles.button} onPress={() => this.start()}>
                            <Text style={styles.btnText}> Comenzar</Text>
                        </TouchableHighlight>
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
        backgroundColor:'white'
    },
    cuadroGrande1: {
        flex:6,
        flexDirection: 'row',
        alignContent: 'center',
        bottom: -20,
    },
    startButtonContainer: {
        flex: 1,
        flexDirection: 'row',

    },
    button: { alignSelf: 'center', width: 100, height: 30, backgroundColor: PRIMARY, borderRadius: 50, top: '30%' },

    image: {
        width: 90, height: 90, alignSelf: 'center', borderWidth: 1, borderColor: 'white', resizeMode:'center'
    },
    rotateImage: {
        width: 90, height: 90, alignSelf: 'center', transform: [{ rotate: '90deg' }], resizeMode: 'center'
    },
    selectImage: {
        width: 90, height: 90, alignSelf: 'center', backgroundColor: '#E0FFFF', resizeMode:'center'
    },
    rotateSelectImage: {
        width: 90, height: 90, alignSelf: 'center', transform: [{ rotate: '90deg' }], backgroundColor: '#E0FFFF', resizeMode: 'center'
    },
    head: { height: 30, backgroundColor: '#808B97' },
    text: { margin: 6 },
    boardContainer: { flex: 1, width: 260, height: 260, backgroundColor: 'white' },
    boardImageContainer: { width: 260, height: 260 },

    shipContainer: {
        flex: 1, width: 260, height: 260, flexDirection: 'column'
    },
    shipContainer1: {
        flex: 1, width: 270, height: 260, backgroundColor: 'white', flexDirection: 'row'
    },
    row: {
        flexDirection: 'row', backgroundColor: 'transparent'
    },
    btnText: { textAlign: 'center', color: 'white', paddingTop: 5 },
    oceanBox: { width: 26, height: 26, backgroundColor: getShipColor(), borderRadius: 0, borderColor: 'blue', borderWidth: 0.2, alignSelf: 'center' },
    touchedBox: { width: 26, height: 26, backgroundColor: 'red', borderRadius: 0, borderColor: 'blue', borderWidth: 0.2 },
    sunkenBox: { width: 26, height: 26, backgroundColor: 'grey', borderRadius: 0, borderColor: 'blue', borderWidth: 0.2 },
    startButton: { alignSelf: 'center', width: 100, height: 30, bottom: -10, backgroundColor: PRIMARY, borderRadius: 50 },

});


