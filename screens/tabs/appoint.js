import React, { Component } from 'react'
import { StyleSheet,Text, View,TouchableOpacity } from 'react-native'

import { Ionicons, FontAwesome } from '@expo/vector-icons';

export default class appoint extends Component {
    render() {
        return (
<View style={styles.container}>

    <TouchableOpacity 
    style={styles.addBtn}
    onPress={()=>this.props.navigation.push('Appoint')}
    >
        <FontAwesome style={{ paddingLeft: 10 }} name='calendar' size={38} color='black' />
        <Ionicons style={{ position: 'absolute', left: '0%' }} name="md-add" size={29} color="black" />
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
        borderColor: 'powderblue',
        borderWidth: 2,
        borderRadius: 50,
        flexDirection: 'row',
        position: 'absolute',
        right:'5%',
        bottom:'5%',
        backgroundColor: '#ff7539',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
            
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 8,
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: 10,
    }
});
