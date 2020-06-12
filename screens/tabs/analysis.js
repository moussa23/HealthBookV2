import React, { Component } from 'react'
import { Text, StyleSheet, View,TouchableOpacity } from 'react-native'
import { Ionicons,Fontisto } from '@expo/vector-icons';

export default class analysis extends Component {
    render() {
        return (
            <View style={styles.container}>                 
                    <TouchableOpacity 
                    style={styles.addBtn}
                    >
                    <Fontisto style={{ paddingLeft: 10 }} name="test-tube" size={35} color={'black'} />
                    <Ionicons style={{ position: 'absolute',left:'5%'}} name="md-add" size={29} color="black" />
                    </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',

    },
    addBtn: {
        width: 70,
        height: 70,
        borderColor:'powderblue',
        borderWidth: 2,
        borderRadius: 50,
        flexDirection: 'row',
        position: 'absolute',
        bottom: 20,
        right: 13,
        backgroundColor: '#ff3d00',
        justifyContent:'center',
        alignItems:'center'
    },
    title:{
        fontSize:25,
        fontWeight:'bold',
        marginTop:10,
    }
});