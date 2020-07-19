import React, { Component } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

//screens
import Doctores from './doctors';
import Ambulance from './ambulance';
import Labs from './labs';
import Urgent from './urgent';

//icons for tabs
import { Fontisto,FontAwesome5 } from '@expo/vector-icons';

const tabs = createMaterialTopTabNavigator();

export default class _FavTabs extends Component {

    getTabLabel(tab) {
        switch (tab) {
            case 'Doctores':
                return 'Doctores';
            case 'Ambulance':
                return 'Ambulances';
            case 'Labs':
                return 'Laboratoires';
            case 'Urgences':
                return 'Urgences';
        }
    }

    render() {
        return (
            <tabs.Navigator
                
                screenOptions={({ route }) =>
                    ({
                        
                        tabBarIcon: ({ focused }) => {
                            let color;
                            focused ? color = '#ff7539' : color = '#28696d'
                            switch (route.name) {
                                case 'Doctores':
                                    return <Fontisto name="doctor" size={25} color={color} />
                                case 'Ambulance':
                                    return <FontAwesome5 name="ambulance" size={21} color={color} />
                                case 'Labs':
                                    return <Fontisto name="laboratory" size={24} color={color} />
                                case 'Urgences':
                                    return <FontAwesome5 name="hospital-alt" size={24} color={color} />
                            }
                        },

                        title: this.getTabLabel(route.name)


                    })
                }
                tabBarOptions={
                    {
                        
                        pressColor: '#55efc4',
                        indicatorStyle: { backgroundColor: '#ff7539' },
                        labelStyle: {
                            textTransform: 'capitalize',
                            width: 100
                        },
                        showIcon: true,
                        iconStyle:{
                            width:50,
                            alignItems:'center'
                        }
                    }
                }
            >
                <tabs.Screen name='Doctores' component={Doctores} />
                <tabs.Screen name='Ambulance' component={Ambulance} />
                <tabs.Screen name='Labs' component={Labs} />
                <tabs.Screen name='Urgences' component={Urgent} />
            </tabs.Navigator>
        )
    }
}

