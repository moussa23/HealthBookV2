import React, { Component } from 'react'
import { Text, StyleSheet, View,TouchableOpacity } from 'react-native'
import { Ionicons,Fontisto } from '@expo/vector-icons';

import AnalyModal from '../modal/analysisMod';

export default class analysis extends Component {
    constructor(){
        super();
        this.state={
            showModal:false,
        }
    }
    toggleModal = ()=>{
        this.setState({showModal:!showModal})
    } 
    render() {
        return (
            <View style={styles.container}>                 
                    <TouchableOpacity
                    onPress={()=>{this.toggleModal()}}     
                    style={styles.addBtn}>
                    <Fontisto style={{ paddingLeft: 10 }} name="test-tube" size={35} color={'black'} />
                    <Ionicons style={{ position: 'absolute',left:'5%'}} name="md-add" size={29} color="black" />
                    </TouchableOpacity>
            <AnalyModal
                visible={this.state.showModal}
                onBackdropPress={()=>this.toggleModal()}
            />
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
        backgroundColor: '#ff7539',
        justifyContent:'center',
        alignItems:'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
            
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 8,
    },
    title:{
        fontSize:25,
        fontWeight:'bold',
        marginTop:10,
    }
});