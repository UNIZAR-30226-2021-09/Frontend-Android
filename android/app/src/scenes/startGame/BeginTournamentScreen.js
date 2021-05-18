import React, { Component } from 'react';
import { View, Text, TouchableHighlight, TouchableWithoutFeedback, StyleSheet, Image, Alert,  AsyncStorage} from 'react-native';
import { PRIMARY, SECONDARY, BLACK } from '../../styles/colors';
import { BarraLateral } from '_organisms'
import DropDownPicker from 'react-native-dropdown-picker';
import { getFriendList } from '_api/user';
import {Picker} from '@react-native-picker/picker';


export default class BeginTournamentScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Amigo1: "",
            TokenAmigo1: "",
            Amigo2: "",
            TokenAmigo2: "",
            Amigo3: "",
            TokenAmigo3: "",
            listaAmigos: [],
            //listaAmigosDDP: [{label:"", nombre:""}],
        }
    }
    /*async crearLabels(){
        for(const elemento in this.state.listaAmigos){
            this.state.listaAmigosDDP.push({label: elemento,nombre: elemento});
            console.log("Nueva lista cread: " + this.state.listaAmigosDDP);
        }
    }*/
    


    async componentDidMount() {
        var _username = await AsyncStorage.getItem('username');
        var accessToken = await AsyncStorage.getItem('userToken');
        var user = {
            Username: _username,
            AccessToken: accessToken
        };
        console.log(user);
        await getFriendList(user).then(data => {
            console.log("Data de getFriendList: " + data);
            if (data != "error") {
                this.setState(
                    { listaAmigos: data }
                )
                this.crearLabels();
            } else {
                alert('Error de getFriendList');
            }
        }).catch(err => {
            console.log("error getFriendList")
            console.log(err)
            return "error"
        });        
    }

    
/*
<Text style={styles.title} > Torneo</Text>
                <DropDownPicker
                    items={this.state.tourList}
                    defaultValue={this.state.selectedTour}
                    containerStyle={styles.listContainer}
                    labelStyle={styles.listText}
                    onChangeItem={item => this.setState({
                        selectedTour: item.value
                    })}
                    placeholder="  Selecciona un torneo"
                    placeholderStyle={styles.text}
                />
            </View>
*/
    render() {
        return (<View style={styles.container}>
            <View style={styles.cuadroGrande}>
            <Text style={styles.title}>
                Selecciona 3 amigos
            </Text>
            
            <Picker
                style={styles.dp1}
                labelStyle={styles.listText}
                placeholderStyle={styles.text}
                mode="dropdown"
                selectedValue={this.state.Amigo1}
                itemStyle={{ backgroundColor: "grey", color: "blue", fontFamily:"Ebrima", fontSize:17 }}
                onValueChange={()=>{}}> 
                {this.state.listaAmigos.map((item, index) => {
                    return (<Picker.Item label={item} value={index} key={index}/>) 
                })}
                
            </Picker>
            
            <Picker
                style={styles.dp2}
                mode="dropdown"
                selectedValue={this.state.Amigo2}
                onValueChange={()=>{}}> 
                {this.state.listaAmigos.map((item, index) => {
                    return (<Picker.Item label={item} value={index} key={index}/>) 
                })}
            </Picker>
            
            <Picker
                style={styles.dp3}
                mode="dropdown"
                selectedValue={this.state.Amigo2}
                onValueChange={()=>{}}> 
                {this.state.listaAmigos.map((item, index) => {
                    return (<Picker.Item label={item} value={index} key={index}/>) 
                })}
            </Picker>

            </View>
            <BarraLateral navigation={this.props.navigation} />

        </View>);
    }
};
const styles = StyleSheet.create({
    dp1:{
        
        height: 50, width: 260, alignSelf: 'center',
        paddingTop: 20,
        paddingBottom: 20,
        
       
    },
    dp2:{
        
        height: 100, width: 260, alignSelf: 'center',
        paddingTop: 20,
        paddingBottom: 20,

    },
    dp3:{
        height: 60, width: 260, alignSelf: 'center',
        paddingTop: 20,
        paddingBottom: 20,
        borderColor: 'red', borderRadius: 4,
        
    },
    

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
        fontSize: 18, justifyContent: 'center', color:'black'
    },
    text: {
        fontSize: 18
    }
});


