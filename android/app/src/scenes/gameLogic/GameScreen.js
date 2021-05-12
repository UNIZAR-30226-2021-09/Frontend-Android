import React, { Component } from 'react';
import { View, Text, TouchableHighlight, TouchableWithoutFeedback, StyleSheet, Image, Alert } from 'react-native';
import { PRIMARY, SECONDARY, BLACK } from '../../styles/colors';
import { BarraLateral } from '_organisms'
import { checkBox, OCEAN_BOX, TOUCHED_BOX, SUNKEN_BOX, NO_ATACK_BOX, OCEAN_NOT_ATTACK, OCEAN_ATTACK, SHIP_NOT_ATTACK, SHIP_ATTACK } from '_api/gameLogic';
import { Table, TableWrapper, Cell } from 'react-native-table-component'
import { initBoard, getBox, attack, getSolution, initAttack, initShip, initCoord, IAmove, getCoord } from '../../api/gameLogic';
export default class GameScreen extends Component {
    constructor(props) {
        super(props);
        let params = this.props.route.params;
        let boardSolution = params.boardSolution;
        this.state = {
            myBoard: {
                board: initAttack(),
                solution: getSolution(),
                attack: initAttack(),
                noDetectedShip: initShip(),
                coordShips: getCoord(),
                victory: false
            },
            IABoard: {
                board: boardSolution.solution,
                solution: [...boardSolution.solution],
                attack: initAttack(),
                noDetectedShip: initShip(),
                coordShips: boardSolution.coordShips,
                victory: false
            },
        }
        console.log('board________-' + boardSolution.board);
        console.log('boardSolution________-' + boardSolution.solution);

    }
    onClick(row, col) {
        const { myBoard, IABoard } = this.state
       this.setState({
           myBoard: attack(row, col, myBoard),
           IABoard: IAmove(IABoard)
       })
        if (this.state.myBoard.victory) {
            this.props.navigation.navigate('Result', { result: true })
            //Alert.alert("Has ganado la partida");
        }
        //console.log("Victoria:::::::::"+this.state.myBoard.victory);
    }

    _alertIndex(index, col) {
        Alert.alert(`This is row ${index + 1} + ${col + 1}`);
    }
 /*   restart() {
        this.state = {
            myBoard: {
                board: initAttack(),
                solution: getSolution(),
                attack: initAttack(),
                noDetectedShip: initShip(),
                coordShips: getCoord(),
            },
            IABoard: {
                board: initAttack(),
                solution: boardSolution.board,
                attack: initAttack(),
                noDetectedShip: initShip(),
                coordShips: boardSolution.coordShips,
            },
        }
    }*/
    render() {
        let { myBoard, IABoard } = this.state;
        const getMyBox = (box, row, col) => {
            if (box != NO_ATACK_BOX) {
                let boxStyle = styles.oceanBox;
                switch (box) {
                    case OCEAN_BOX:
                        boxStyle = styles.oceanBox;
                        break;
                    case TOUCHED_BOX:
                        boxStyle = styles.touchedBox;
                        break;
                    case SUNKEN_BOX:
                        boxStyle = styles.sunkenBox;
                        break;
                }
                return (<View style={boxStyle}>
                    <Image source={require("_assets/images/redX2.png")} style={styles.image} />
                </View>);
            } 
            else 
                return (<TouchableWithoutFeedback onPress={() => this.onClick(row, col)}>
                    <View style={styles.oceanBox}>
                    </View>
                </TouchableWithoutFeedback>);
        };
        const getIABox = (box, row, col) => {
            
            let boxStyle = styles.oceanBox;
            if (box == OCEAN_NOT_ATTACK || box == SHIP_NOT_ATTACK) {
                if (box == OCEAN_NOT_ATTACK)
                    boxStyle = styles.oceanBox;
                else
                    boxStyle = styles.shipBox;
                return (<View style={boxStyle} />);
            } else {
                if (box == OCEAN_ATTACK)
                    boxStyle = styles.touchedOcean;
                else
                    boxStyle = styles.touchedShip;
                return (<View style={boxStyle}>
                    <Image source={require("_assets/images/redX2.png")} style={styles.image} />
                </View>);
            }
        };
        return (<View style={styles.container}>
            <View style={styles.cuadroGrande}>
                <View style={styles.cuadroGrande1}>
                    
                    <View style={styles.boardContainer}>
                        <Table borderStyle={{ borderColor: 'transparent' }}>
                            {
                                IABoard.board.map((rowData, index) => (
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
                <View style={styles.startButtonContainer}>
                    <TouchableHighlight style={styles.button} onPress={() => this.props.navigation.navigate('Home')}>
                            <Text style={styles.btnText}> Rendirse</Text>
                    </TouchableHighlight>
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
    cuadroGrande1: {
        flex: 4,
        flexDirection: 'row',
        alignContent: 'center',
    },
    head: { height: 30, backgroundColor: '#808B97' },
    text: { margin: 6 },
    boardContainer: { flex: 1, width: 260, height: 260, padding: 5, paddingBottom: 40, backgroundColor: '#fff' },

    row: {
        flexDirection: 'row', backgroundColor: 'blue', borderColor: 'black'
    },
    startButtonContainer: {
        flex: 1
    },
    button: { alignSelf: 'center', width: 100, height: 30, backgroundColor: PRIMARY, borderRadius: 50, top:'30%' },

    btnText: { textAlign: 'center', color: 'white', paddingTop: 5 },
    oceanBox: { width: 26, height: 26, backgroundColor: 'cyan', borderRadius: 0, borderColor: 'blue', borderWidth: 0.18 },
    shipBox: { width: 26, height: 26, backgroundColor: 'grey', borderRadius: 0, borderColor: 'blue', borderWidth: 0.2 },

    touchedBox: { width: 26, height: 26, backgroundColor: 'grey', borderRadius: 0, borderColor: 'blue', borderWidth: 0.2 },
    sunkenBox: { width: 26, height: 26, backgroundColor: 'grey', borderRadius: 0, borderColor: 'red', borderWidth: 1 },
    noAttackBox: { width: 26, height: 26, backgroundColor: 'white', borderRadius: 0, borderColor: 'blue', borderWidth: 0.2 },
    touchedOcean: { width: 26, height: 26, backgroundColor: 'cyan', borderRadius: 0, borderColor: 'blue', borderWidth: 0.2 },
    touchedShip: { width: 26, height: 26, backgroundColor: 'grey', borderRadius: 0, borderColor: 'blue', borderWidth: 0.2 },
    image: {
        width: 20, height: 20, alignSelf: 'center', resizeMode: 'center',
    },
});


