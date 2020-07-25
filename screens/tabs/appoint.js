import React, { useState,useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Swipeout from 'react-native-swipeout';

import { db } from '../../API/firebase';

import { Ionicons, FontAwesome } from '@expo/vector-icons';

export default function appoint({ navigation }) {
    const [data, setData] = useState([])
    const appointRef = db.ref('users/UID/Appointment')

    useEffect(() => {
        appointRef.on('value', snap => {
            var items = []
            snap.forEach(c => {
                items.push({
                    ...c.val(),
                    key: c.key
                })

            })
           
            setData(items)
        })

        return () => {
            appointRef.off()
            console.log('leaved');
        }
    },
        []);

        const removeItem = (key)=>{
            Alert.alert('Warning','Êtes-vous sûr?',[
                {
                    text:'Annuler',
                    style:'cancel',
                },
                {
                    text:'Supprimer',
                    onPress:()=> db.ref('users/UID/Appointment/'+key).remove()
                }
            ])
           
        }
   
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.addBtn}
                onPress={() => navigation.push('Appoint')}
            >
                <FontAwesome style={{ paddingLeft: 10 }} name='calendar' size={38} color='black' />
                <Ionicons style={{ position: 'absolute', left: '0%' }} name="md-add" size={29} color="black" />
            </TouchableOpacity>
            <FlatList
                data={data}
                keyExtractor={item => item.key}
                renderItem={({ item }) => (
                    <Swipeout
                    style={{flex:1,marginBottom:8,paddingHorizontal:3,borderRadius:9}} 
                    right={[
                        {
                        text: 'Supprimer',
                        backgroundColor: 'red',
                        onPress:()=>{removeItem(item.key)}
                     }
                        ,{ text: 'Modifier', backgroundColor: 'green' }
                
                    ]} >
                        <TouchableOpacity>
                            <Text style={{fontSize:20,fontWeight:"bold",alignSelf:'center'}} > {item.title} </Text>
                            <Text style={{fontSize:16}}> Docteur: {item.doc} </Text>
                            <Text style={{fontSize:16}}> Spécialité: {item.specialite} </Text>
                            <Text style={{fontSize:16}}> Endroit: {item.place} </Text>
                            <Text style={{fontSize:16,position:'absolute',bottom:2,right:2}}>{item.date}</Text>
                            <Text style={{fontSize:16,position:'absolute',right:2}}>{item.time}</Text>
                        </TouchableOpacity>
                    </Swipeout>
                )}
            />
        </View>
    )

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 9
    },
    addBtn: {
        width: 70,
        height: 70,
        borderColor: 'powderblue',
        borderWidth: 2,
        borderRadius: 50,
        flexDirection: 'row',
        position: 'absolute',
        right: '5%',
        bottom: '5%',
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
        zIndex:10
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: 10,
    }
});
