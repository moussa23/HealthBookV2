import React, { Component } from 'react'
import {
    createDrawerNavigator,

} from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { FontAwesome5,Entypo } from '@expo/vector-icons';

import Tabs from '../screens/tabs/_homeTabs';
import FavTabs from '../screens/tabs/_FavTabs'
import SideBar from '../components/sideBar';
import Add from '../screens/add';
import Map from '../screens/map'

import Appointments from '../screens/appointmets';
import { Text, TouchableOpacity } from 'react-native'

const Appdrawer = createDrawerNavigator();
const stack = createStackNavigator();
export default class drawer extends Component {

    render() {
        return (
            <Appdrawer.Navigator
                initialRouteName="dtabs"
                drawerContent={(props) => <SideBar {...props} />}
                drawerContentOptions={{
                    itemStyle: { borderRadius: 20, marginVertical: 10, justifyContent: 'center' },
                    labelStyle: { fontSize: 20, color: '#000', fontWeight: '800' },
                    activeBackgroundColor: '#439688',
                    inactiveBackgroundColor: 'rgba(67,150,136,0.3)'
                }}
            >
                <Appdrawer.Screen name='dtabs' component={homeTabsStack}
                    options={{
                        title: 'Accuiel',
                        drawerIcon: () => <FontAwesome5 name="home" size={30} color="black" />
                    }} />
                <Appdrawer.Screen name='add' component={addStack}
                    options={{
                        title: 'Ajouter',
                        drawerIcon: () => <FontAwesome5 name="plus-circle" size={30} color="black" />
                    }} />
                <Appdrawer.Screen name='dFav' component={favTabsStack}
                    options={{
                        title: 'Favoris',
                        drawerIcon: () => <FontAwesome5 name="heart" size={30} color="black" />
                    }} />
                <Appdrawer.Screen name='map' component={Map}
                    options={{
                        title: 'Location',
                        drawerIcon: () => <FontAwesome5 name="search" size={30} color="black" />
                    }} />

            </Appdrawer.Navigator>
        )
    }
}


export class homeTabsStack extends Component {
    render() {
        return (
            <stack.Navigator
                screenOptions={{
                    gestureDirection: 'horizontal',
                    headerStyle: {
                        backgroundColor: '#00695c',
                    },
                    headerTitleAlign: 'center',
                    headerTintColor: '#fff',
                    headerTitleStyle: { fontWeight: '100' },
                    headerLeft: () =>
                        (
                            <TouchableOpacity style={{marginHorizontal:10}} onPress={this.props.navigation.openDrawer} >
                                <Entypo name="menu" size={45} color="#fff" />
                            </TouchableOpacity>
                        )
                }}
            >
                <stack.Screen name='tabs' component={Tabs} options={{ title: 'Accueil' }} />
                <stack.Screen name='Appoint' component={Appointments} options={{ title: 'Rendez-vous' }} />
                <stack.Screen name='map' component={Map} options={{ title: 'Location' }} />
            </stack.Navigator>
        )
    }
}
export class favTabsStack extends Component {
    render() {
        return (
            <stack.Navigator
                screenOptions={{
                    gestureDirection: 'horizontal',
                    headerStyle: {
                        backgroundColor: '#00695c',
                    },
                    headerTitleAlign: 'center',
                    headerTintColor: '#fff',
                    headerTitleStyle: { fontWeight: '100' },
                    headerLeft: () =>
                    (
                        <TouchableOpacity style={{marginHorizontal:10}} onPress={this.props.navigation.openDrawer} >
                            <Entypo name="menu" size={45} color="#fff" />
                        </TouchableOpacity>
                    )
                }}
            >
                <stack.Screen name='fav' component={FavTabs} options={{ title: 'Favoris' }} />
            </stack.Navigator>
        )
    }
}

export class addStack extends Component {
    render() {
        return (
            <stack.Navigator
                screenOptions={{
                    gestureDirection: 'horizontal',
                    headerStyle: {
                        backgroundColor: '#00695c',
                    },
                    headerTitleAlign: 'center',
                    headerTintColor: '#fff',
                    headerTitleStyle: { fontWeight: '100' },
                    headerLeft: () =>
                    (
                        <TouchableOpacity style={{marginHorizontal:10}} onPress={this.props.navigation.openDrawer} >
                            <Entypo name="menu" size={45} color="#fff" />
                        </TouchableOpacity>
                    )
                }}
            >
                <stack.Screen name='add' component={Add} options={{ title: 'Ajouter' }} />
                <stack.Screen name='Appoint' component={Appointments} options={{ title: 'Rendez-vous' }} />

            </stack.Navigator>
        )
    }
}