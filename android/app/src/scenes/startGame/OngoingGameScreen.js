import React, { Component } from 'react';
import { View, Text, TouchableHighlight, TouchableOpacity, StyleSheet, Image, Alert, FlatList, ScrollView, AsyncStorage } from 'react-native';
import { PRIMARY, SECONDARY, BLACK } from '../../styles/colors';
import { BarraLateral } from '_organisms';
import DropDownPicker from 'react-native-dropdown-picker';
import { getGameInProgess } from '_api/game';

export default class OngoingGameScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFriend: null,
            username: "user 1",
            estado:null,
            gameList:
                ["cheerful", "sweet", "natured"],
            show: false,
        }
    }
    async componentDidMount() {
        var _username = await AsyncStorage.getItem('username');
        var accessToken = await AsyncStorage.getItem('userToken');
        var user = {
            Username: _username,
            AccessToken: accessToken
        };
        console.log(user);
        await getGameInProgess(user).then(data => {
            console.log("Data de getProgress: " + data);
            if (data != "error") {
                this.setState(
                    { gameList: data }
                )
            } else {
                alert('Error de getProgress');
            }
        }).catch(err => {
            console.log("error getProgress")
            console.log(err)
            return "error"
        });        
    }

    render() {
        return (<View style={styles.container}>
            <View style={styles.cuadroGrande}>
                <View style={styles.cuadroPequeno}>
                    <Text style={styles.title} > Partido en curso</Text>
                </View>
                <View style={styles.cuadroAmigos}>
                    <FlatList
                        data={this.state.gameList}
                        extraData={this.state.showItemIndex}
                        renderItem={({ item, index }) => {
                            return (
                                <View style={styles.friend}>
                                    <TouchableOpacity style={styles.gameButton} onPress={() => Alert.alert("Funcionalidad futura")}>
                                        <Text style={styles.friendText}>
                                            Partido contra {item}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            );
                        }}
                        keyExtractor={(item, index) => index.toString()}
                        style={styles.friendContainer}
                    /> 
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
        borderColor: BLACK,
        flexDirection: 'column',
        alignSelf: 'center'
    },
    cuadroAmigos: {
        flex: 3,
        borderColor: BLACK,
        flexDirection: 'column',
        alignSelf: 'center',
        paddingTop:10,
        paddingBottom:20
    },
    friendContainer: {
        paddingTop: 5,
    },
    friend: {
        paddingTop: 1,
    },
    gameButton: {
        width: 200,
        height: 30,
        backgroundColor: SECONDARY,
        borderRadius: 50,
        borderWidth: 1,
        alignSelf: 'center',
    },
    confirmButton: {
        top: 30, 
        width: 180,
        height: 40,
        backgroundColor: PRIMARY,
        borderRadius: 50,
        borderWidth: 1,
        alignSelf:'center'
    },
    title: {
        textAlign: 'center',
        color: 'black',
        paddingTop: 20,
        fontSize: 38,
        fontWeight: 'bold',
    },
    buttonText: {
        textAlign: 'center',
        color: 'black',
        fontSize: 20,
    },
    text: {    
        fontSize: 25,
        textAlign: 'center'
    },
    friendText: {
        fontSize: 15,
        textAlign: 'center',
        color: PRIMARY
    },
    messageText: {
        fontSize: 17,
        textAlign: 'center',
        color: 'grey'
    },
    listContainer: {
        height: 50, width: 260, alignSelf: 'center'
    },
    listText: {
        fontSize: 18, justifyContent: 'center', color: 'black'
    },
});


