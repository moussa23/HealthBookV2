import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';

const button = (props) => {
    return (
        <Button
            onPress={props.onPress}
            loading={props.loading}
            style={{
                marginTop:25,
                width: props.width, justifyContent: 'center', shadowColor: "#000",alignSelf:'center',
                shadowOffset: {
                    width: 0,
                    height: 10,
                },
                shadowOpacity: 0.58,
                shadowRadius: 16.00,

                elevation: 8,
            }}
            mode='contained'
            theme={{
                colors: { primary: '#ff7539' },
                fonts: { medium: { fontWeight: 'bold' } }
            }}
            disabled={props.disabled}
        >
            {props.title}
        </Button>
    )
}

export default button

