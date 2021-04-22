import React, { Component } from 'react';
import { View, Text, TouchableHighlight, TouchableWithoutFeedback, StyleSheet, Image, Alert } from 'react-native';
import { PRIMARY, SECONDARY, BLACK } from '../../styles/colors';
import { BarraLateral } from '_organisms'
import { checkBox, OCEAN_BOX, TOUCHED_BOX, SUNKEN_BOX, NO_ATACK_BOX } from '_api/gameLogic';
import { Table, TableWrapper, Cell } from 'react-native-table-component'
import {
    initBoard, getBox, attack, getSolution, initAttack, initShip, IAmove,
    placeShip, initCoord
} from '../../api/gameLogic';
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
    onClick(row, col) {
        const { myBoard, IABoard, selectShip, shipDirection } = this.state

        console.log(selectShip +'DIR' + shipDirection[selectShip - 1] )

        if (selectShip != OCEAN) {
            this.setState({
                myBoard: placeShip(row, col, selectShip, shipDirection[selectShip - 1], myBoard),
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
    render() {
        let { myBoard, shipDirection, shipColors } = this.state;
        const getMyBox = (box, row, col) => {
            if (box != NO_ATACK_BOX) {
                let boxStyle = styles.oceanBox;
                switch (box) {
                    case OCEAN_BOX:
                        boxStyle = styles.oceanBox;
                        break;
                    default:
                        boxStyle = styles.sunkenBox;
                        break;
                }
                return (<TouchableWithoutFeedback onPress={() => this.onClick(row, col)}>
                    <View style={boxStyle}>
                    </View>
                </TouchableWithoutFeedback>);
            }
            else
                return (<TouchableWithoutFeedback onPress={() => this.onClick(row, col)}>
                    <View style={styles.noAttackBox}>
                    </View>
                </TouchableWithoutFeedback>);
        };
        const ShipButton = (props) => {
            let { shipDirection, shipColors } = this.state;
            let imageStyle = styles.image;
            if (shipDirection[props.ship - 1] == HORIZONTAL && shipColors[props.ship - 1] == NO_SELECT_COLOR)
                imageStyle = styles.rotateImage;
            else if (shipDirection[props.ship - 1] == HORIZONTAL && shipColors[props.ship - 1] == SELECT_COLOR)
                imageStyle = styles.rotateSelectImage;
            else if (shipDirection[props.ship - 1] == VERTICAL && shipColors[props.ship - 1] == SELECT_COLOR)
                imageStyle = styles.selectImage;
            return (
                <TouchableHighlight onPress={() => this.placeShip(props.ship)}>
                    <Image source={props.src} style={imageStyle} />
                </TouchableHighlight>);
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
                    </View>
                </View>
                <TouchableHighlight onPress={() => this.props.navigation.navigate('Game', { boardSolution: myBoard })}>
                    <View style={styles.button}>
                        <Text style={styles.btnText}> Comenzar </Text>
                    </View>
                </TouchableHighlight>
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
    cuadroGrande1: {
        flex: 4,
        flexDirection: 'row',
        alignContent: 'center',
    },
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
    boardContainer: { flex: 1, width: 260, height: 260, padding: 5, paddingBottom: 40, backgroundColor: '#fff' },
    shipContainer: {
        flex: 1, width: 260, height: 260, padding: 5, paddingBottom: 40, backgroundColor: '#fff', flexDirection: 'column'
    },
    shipContainer1: {
        flex: 1, width: 260, height: 260, padding: 5, paddingBottom: 40, backgroundColor: '#fff', flexDirection: 'row'
    },
    row: {
        flexDirection: 'row', backgroundColor: 'blue', borderColor: 'black'
    },
    button: { alignSelf: 'center', width: 100, height: 30, bottom: 15, backgroundColor: 'blue', borderRadius: 0, borderWidth: 0.2 },
    btnText: { textAlign: 'center', color: 'white', paddingTop: 5 },
    oceanBox: { width: 26, height: 26, backgroundColor: 'cyan', borderRadius: 0, borderColor: 'blue', borderWidth: 0.2 },
    touchedBox: { width: 26, height: 26, backgroundColor: 'red', borderRadius: 0, borderColor: 'blue', borderWidth: 0.2 },
    sunkenBox: { width: 26, height: 26, backgroundColor: 'grey', borderRadius: 0, borderColor: 'blue', borderWidth: 0.2 },
    noAttackBox: { width: 26, height: 26, backgroundColor: 'white', borderRadius: 0, borderColor: 'blue', borderWidth: 0.2 },
});


