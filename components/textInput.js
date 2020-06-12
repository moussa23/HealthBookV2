import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';



const textInput = (props) => {
    return (
        <View >
            <TextInput
                
                returnKeyType='next'
                onSubmitEditing={props.submit}
                autoCapitalize='none'
                value={props.value}
                onChangeText={props.onTextChange}
                secureTextEntry={props.secure}
                keyboardType={props.type}
                style={{ fontSize: 20, fontWeight: props.weight, paddingLeft: props.padding, marginTop: 30, height: props.height }}
                theme={{
                    colors: { primary: '#ff7539', background: 'rgba(0,0,0,0.1)', placeholder: 'rgba(0,0,0,0.3)' },
                    animation: { scale: 2 },
                }}
                label={props.label}
                placeholder={props.placeholder}
                mode='flat'

            />
        </View>
    )
}

export default textInput

const styles = StyleSheet.create({})
