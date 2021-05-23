import { Audio } from 'expo-av';
var sound;
export const playBomb = async () => {
    sound = new Audio.Sound();
    try {
        await sound.loadAsync(require('./src_assets_bomb.mp3'));
        await sound.playAsync();
        // Your sound is playing!

        // Don't forget to unload the sound from memory
        // when you are done using the Sound object
        //await sound.unloadAsync();
    } catch (error) {
        // An error occurred!
        console.log("ERROR sound bomb")

    }
}

export const playDrop = async () => {
    sound = new Audio.Sound();
    try {
        await sound.loadAsync(require('./src_assets_drop.mp3'));
        await sound.playAsync();
        // Your sound is playing!

        // Don't forget to unload the sound from memory
        // when you are done using the Sound object
        //await sound.unloadAsync();
    } catch (error) {
        // An error occurred!
        console.log("ERROR sound drop")
    }
}

export const playWater = async () => {
    sound = new Audio.Sound();
    try {
        await sound.loadAsync(require('./src_assets_water.mp3'));
        await sound.playAsync();
        // Your sound is playing!

        // Don't forget to unload the sound from memory
        // when you are done using the Sound object
        //await sound.unloadAsync();
    } catch (error) {
        // An error occurred!
        console.log("ERROR sound water")

    }
}

export const playHit = async () => {
    sound = new Audio.Sound();
    try {
        await sound.loadAsync(require('./src_assets_hit.mp3'));
        await sound.playAsync();
        // Your sound is playing!

        // Don't forget to unload the sound from memory
        // when you are done using the Sound object
        //await sound.unloadAsync();
    } catch (error) {
        console.log("ERROR sound hit")

        // An error occurred!
    }
}

export const stop = async () => {
    try {

        await sound.unloadAsync();
    } catch (error) {
        console.log("ERROR sound h")
    }
}