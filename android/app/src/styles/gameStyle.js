import React, { Component } from 'react';
import { View, Text, TouchableHighlight, TouchableWithoutFeedback, StyleSheet, Image, Alert, ImageBackground, AsyncStorage } from 'react-native';
var boardColor = 'white';
var shipColor = 'blue';
var boardImage = require("_assets/images/oceano.jpg");
var boardImageName = 'Oceano';

export const setBoardImage = (image) => {
    //console.log("SELECT Board " + shipColor)
    var path = "", color = '';
    switch (image) {
        case "Oceano":
            path = require("_assets/images/oceano.jpg");
            color = 'white';
            break;
        case "Desierto":
            path = require("_assets/images/desierto.jpg");
            color = 'black';
            break;
        case "Cesped":
            path = require("_assets/images/cesped.jpg");
            color = 'white';
            break;
        case "Espacio":
            path = require("_assets/images/espacio.jpg");
            color = 'white';
            break;
        case "Lava":
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
    shipColor = select;
}

export const getShipColor = () => {
    //console.log("SELECT Ship --" + shipColor)
    return shipColor;
}

export const getBoardImage = () => {
    //console.log("SELECT Board --" + shipColor)
    return boardImage;
}

export const getBoardImageName = () => {
    //console.log("SELECT Board --" + shipColor)
    return boardImageName;
}