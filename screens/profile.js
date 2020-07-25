import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import FieldSet from 'react-native-fieldset';

export default class profile extends Component {
    render() {

        return (

            <View style={styles.container} >
                <View>
                    <FieldSet label="Profile basique"> <Text>Nom Prenom : </Text>
                        <Text>Telephone: </Text>
                        <Text>Date de naissance: </Text>
                        <Text>Genre: </Text>
                        <Text>Email: </Text>
                    </FieldSet> 
                 </View>
            
            <View> <FieldSet label="Profie etendu">
                <AppButton
                    height={40}
                    onPress={() => this.anteced()}
                    loading={this.state.loading}
                    title='Antecedents medicaux'
                    width='60%'
                />
                <AppButton
                    height={40}
                    onPress={() => this.famil()}
                    loading={this.state.loading}
                    title='Antecedents familiaux'
                    width='60%'
                />
                <AppButton
                    height={40}
                    onPress={() => this.habitudes()}
                    loading={this.state.loading}
                    title='Habitudes alcolo-tabagiques'
                    width='60%'
                />
                <AppButton
                    height={40}
                    onPress={() => this.chirur()}
                    loading={this.state.loading}
                    title='Chirurgie'
                    width='60%'
                />
            </FieldSet>
            </View>
         </View >
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    }

})
