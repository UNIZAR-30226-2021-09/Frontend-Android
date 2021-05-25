import React, { Component } from 'react';
import { View, Text, TouchableHighlight, TouchableWithoutFeedback, StyleSheet, Image, Alert, ImageBackground, AsyncStorage } from 'react-native';
var boardColor = 'white';
var shipColor = 'blue';
var boardImage = require("_assets/images/oceano.jpg");
var boardImageName = '';
import i18n from 'i18n-js';

export const setBoardImage = (image) => {
    //console.log("SELECT Board " + shipColor)
    var path = "", color = '';
    switch (image) {
        case i18n.t("Oceano"):
            path = require("_assets/images/oceano.jpg");
            color = 'white';
            break;
        case i18n.t("Desierto"):
            path = require("_assets/images/desierto.jpg");
            color = 'black';
            break;
        case i18n.t("Cesped"):
            path = require("_assets/images/cesped.jpg");
            color = 'white';
            break;
        case i18n.t("Espacio"):
            path = require("_assets/images/espacio.jpg");
            color = 'white';
            break;
        case i18n.t("Lava"):
            path = require("_assets/images/lava.jpg");
            color = 'black';
            break;
    }
    boardImage = path;
    boardColor = color;
    boardImageName = image;
}

export const getBoardColor = () => {

    return boardColor;
}

export const setShipColor = (select) => {
    //console.log("SELECT Ship --" + shipColor)
    switch (select) {
        case i18n.t("Azul"):
            shipColor = 'blue';
            break;
        case i18n.t("Rojo"):
            shipColor = 'red';
            break;
        case i18n.t("Verde"):
            shipColor = 'green';
            break;
    }
}

export const getShipColor = () => {
    //console.log("SELECT Ship --" + shipColor)
    return shipColor;
}
export const getShipColorName = () => {
    //console.log("SELECT Ship --" + shipColor)
    var ship;
    switch (shipColor) {
        case 'blue' :
            ship = i18n.t("Azul");
            break;
        case 'red':
            ship = i18n.t("Rojo") ;
            break;
        case 'green' :
            ship = i18n.t("Verde");
            break;
    }
    return ship;
}
export const getBoardImage = () => {
    //console.log("SELECT Board --" + shipColor)
    return boardImage;
}

export const getBoardImageName = () => {
    //console.log("SELECT Board --" + shipColor)
    return boardImageName;
}