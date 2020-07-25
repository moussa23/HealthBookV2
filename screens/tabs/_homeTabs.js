import React, { Component } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

//tabs
import Appoint from './appoint';
import Analysis from './analysis';
import Radiology from './radiology';
import Surgey from './surgey';

import {
    MaterialCommunityIcons,
    FontAwesome,
    Fontisto,
    SimpleLineIcons,
    FontAwesome5,
    Entypo
} from '@expo/vector-icons';

const tabs = createMaterialTopTabNavigator();

export default class _homeTabs extends Component {
    getTabLabel(tab) {
        switch (tab) {
            case 'appoint':
                return 'Rendez-vous';
            case 'analy':
                return 'Analyses';
            case 'radio':
                return 'Radiologie';
            case 'suregey':
                return 'Chirurgie';
        }
    }
    render() {
        return(
            <tabs.Navigator
                initialRouteName='appoint'
                swipeEnabled={false}
                screenOptions={({ route }) =>
                    ({
                        tabBarIcon: ({ focused }) => {
                            let color
                            focused ? color = '#ff7539' : color = '#28696d'
                            switch (route.name) {
                                case 'appoint':
                                    return <FontAwesome name='calendar' size={25} color={color} />
                                case 'analy':
                                    return <Fontisto name="test-tube" size={24} color={color} />
                                case 'radio':
                                    return <FontAwesome5 name="x-ray" size={20} color={color} />
                                case 'suregey':
                                    return <Fontisto name="surgical-knife" size={24} color={color} />
                            }
                        },

                        title: this.getTabLabel(route.name)


                    })
                }
                tabBarOptions={
                    {
                        pressColor:'#55efc4',
                        indicatorStyle: { backgroundColor: '#ff7539' },
                        labelStyle: {
                            textTransform: 'capitalize',
                            width: 100
                        },
                        showIcon: true,

                    }
                }
            >
                <tabs.Screen name='appoint' component={Appoint} />
                <tabs.Screen name='analy' component={Analysis} />
                <tabs.Screen name='radio' component={Radiology} />
                <tabs.Screen name='suregey' component={Surgey} />
            </tabs.Navigator>

        );

    }
}
