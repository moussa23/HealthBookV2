import React, { Component } from 'react'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

//screens
import Doctores from './doctors';
import Ambulance from './ambulance';
import Labs from './labs';
import Urgent from './urgent';

const tabs = createMaterialTopTabNavigator();

export default class _FavTabs extends Component {
    render() {
        return (
            <tabs.Navigator>
                <tabs.Screen name='Doctores' component={Doctores}/>
                <tabs.Screen name='Ambulance' component={Ambulance}/>
                <tabs.Screen name='Labs' component={Labs}/>
                <tabs.Screen name='Urgences' component={Urgent}/>
            </tabs.Navigator>
        )
    }
}

