/*import React, { Component } from 'react';
import io from "socket.io-client";
import { SafeAreaView, View, Text, TouchableHighlight, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { WHITE, PRIMARY, SECONDARY } from './styles/colors';


export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chatMessage: "",
            chatMessages: [],
            username: ""
        };
    }
    componentDidMount() {
        this.socket = io("https://proyecto-software-09.herokuapp.com");
        this.socket.on("chat message", msg => {
            console.log("MESSAGE"+msg)
            this.setState({
                chatMessages: [...this.state.chatMessages, msg]
            });
        });
    }
    submitChatMessage() {
        console.log("EMIT")

        this.socket.emit('chat message', this.state.chatMessage);
        this.setState({ chatMessage: '' });
        this.socket.emit('disconnect');

    }
    handleSubmitButton() {
        var user = {
            Username: "user",
        }
        var user2 = {
            Username: "user2",
        }
        /*

        console.log(this.socket.id)

        this.socket.emit('logMe', { nombreUsuario: user.Username });
        this.socket.emit('friendPetition', { nombreUsuario: user2.Username });
        this.socket.on('llegaInvitacion', message => {
            console.log("Socket llegaInvitacion----1")
        });
    };
    handleSubmitButton2() {
        var user = {
            Username: "user",
        }
        var user2 = {
            Username: "user2",
        }
        /*

        console.log(this.socket.id)

        this.socket.emit('logMe', { nombreUsuario: user2.Username });
        this.socket.emit('friendPetition', { nombreUsuario: user.Username });
        this.socket.on('llegaInvitacion', message => {
            console.log("Socket llegaInvitacion--2")
        });
    };
    render() {
        const chatMessages = this.state.chatMessages.map(chatMessage => (
            <Text style={{ borderWidth: 2, top: 50 }}>{chatMessage}</Text>
        ));
        return (
            <View style={styles.container}>
                {chatMessages}
                <View style={styles.checkboxContainer}>
                    <TextInput
                        style={{ height: 40, width: 180, borderWidth: 2, top: 60 }}
                        autoCorrect={false}
                        value={this.state.chatMessage}
                        onSubmitEditing={() => this.submitChatMessage()}
                        onChangeText={chatMessage => {
                            this.setState({ chatMessage });
                        }}
                        />
                </View>

                <View style={styles.checkboxContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => this.handleSubmitButton()}>
                        <Text style={styles.text}>
                            Next
                    </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.checkboxContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => this.handleSubmitButton2()}>
                        <Text style={styles.text}>
                            Next 2
                    </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    button: {
        height: 46,
        width: 120,
        backgroundColor: PRIMARY,
        flexDirection: "row",
        justifyContent: 'center',
        borderRadius: 50,
    },
    checkboxContainer: {
        flexDirection: "row",
        marginBottom: 40,
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center'
    },
});*/


import React from 'react';

import Navigator from '_navigations';

const App = () => <Navigator />;

export default App;

/*import React from 'react';

import App from '_components/App';



export default App;*/