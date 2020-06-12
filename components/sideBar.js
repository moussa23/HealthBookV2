import React, { Component } from 'react'
import { Text, StyleSheet, View, Image } from 'react-native';
import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem
} from '@react-navigation/drawer';
import { Entypo } from '@expo/vector-icons'; 
import user from '../assets/user.png';
import {auth} from '../API/firebase'

export default class sideBar extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    logOut=()=>{
        auth.signOut();
    }
    render() {
        return (
            <DrawerContentScrollView  >
                <View style={styles.sideBarConatainer}>
                    <View style={styles.sideBar}>
                        <View style={styles.userInfo}>
                            <Text style={styles.sideBarTxt} > Bonjour, {this.state.userName}!</Text>
                            <Image source={user} style={styles.img} />
                            <Text style={styles.sideBarTxt}> {this.state.email}  </Text>
                        </View>
                    </View>
                </View>
                <DrawerItemList {...this.props} />
                <DrawerItem
                style={{borderWidth:1,borderRadius:20,backgroundColor:'rgba(67,150,136,0.3)'}}
                label='Deconnexion'
                icon={()=><Entypo name="log-out" size={28} color="black"/>}
                labelStyle={{color:'#000',fontSize:20}}
                onPress={()=>this.logOut()}
                />
            </DrawerContentScrollView>
        )
    }
}

const styles = StyleSheet.create({
    sideBarConatainer: {
        marginTop: -8,
    },
    sideBar: {
        height: 250,
        paddingTop: 20,
        borderWidth: 1,
        backgroundColor: '#ff7539',
    },
    userInfo: {
        alignItems: "center",
        justifyContent: 'center',

    },
    img: {
        borderRadius: 60,
        borderWidth: 2,
        borderColor: "#fff",
    },
    sideBarTxt: {
        fontSize: 25,
        fontWeight: 'bold',
        margin: 10
    }
})
