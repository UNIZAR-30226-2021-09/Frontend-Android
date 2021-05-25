import React, { Component } from 'react';
import { View, StyleSheet, TouchableHighlight, Text } from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';
import { WHITE, PRIMARY, SECONDARY, GRAY_MEDIUM, GRAY_LIGHT, TITLE } from '../../styles/colors';
import i18n from 'i18n-js';


export default class TutorialScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [
                require("_assets/images/tuto1en.jpg"),
                require("_assets/images/tuto1en.jpg"),
                require("_assets/images/tuto2en.jpg"),
                require("_assets/images/tuto3en.jpg"),
                require("_assets/images/tuto4en.jpg"),
                require("_assets/images/tuto5en.jpg"),
                require("_assets/images/tuto7en.jpg"),
                require("_assets/images/tuto8en.jpg"),
                require("_assets/images/tuto9en.jpg"),
            ],
            imagesEs: [
                require("_assets/images/tuto1es.jpg"),
                require("_assets/images/tuto1es.jpg"),
                require("_assets/images/tuto2es.jpg"),
                require("_assets/images/tuto3es.jpg"),
                require("_assets/images/tuto4es.jpg"),
                require("_assets/images/tuto5es.jpg"),
                require("_assets/images/tuto7es.jpg"),
                require("_assets/images/tuto8es.jpg"),
                require("_assets/images/tuto9es.jpg"),
            ]
        };
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={{flex:10}}>
                {i18n.t("Cerrar")=='Close'? 
                        <SliderBox images={this.state.images} 
                            disableOnPress={true}
                            circleLoop={true}
                            resizeMethod={'resize'}
                            resizeMode={'contain'}
                            sliderBoxHeight={'90%'}
                            style={{height:'92%', width:'100%'}}
                        />:
                        <SliderBox images={this.state.imagesEs} 
                            disableOnPress={true}
                            circleLoop={true}
                            resizeMethod={'resize'}
                            resizeMode={'cover'}
                            sliderBoxHeight={'90%'}
                            style={{height:'92%', width:'90%', justifyContent:'center'}}
                        />}
                </View>
                <View style={{flex:1, top:'-5%'}}>
                <TouchableHighlight style={styles.button} onPress={() => this.props.navigation.navigate('Home')}>
                        <Text style={styles.btnText}> {i18n.t('Cerrar')}</Text>
                    </TouchableHighlight>
                </View>
            </View>
        );

    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        paddingTop: 30,
    },
    btnText: { textAlign: 'center', color: 'white', paddingTop: 5 },
    button: { alignSelf: 'center', width: 100, height: 30, backgroundColor: PRIMARY, borderRadius: 50, top: '30%' },

})