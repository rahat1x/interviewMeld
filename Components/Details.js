import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const Details = ({ route }) => {


    const { firstName } = route.params;
    const { secondName } = route.params;
    const { birthDate } = route.params;
    const { occupation } = route.params;
    const { company } = route.params;

    const age = (birth) => {
        const dt = new Date(birth);
        const x = dt.toISOString().split("-");
        const thisYear = new Date().getFullYear();

        return thisYear-x[0];
    }
    const agee= age(birthDate);
    return (
        <View style={styles.container}>
            <Text style={styles.containerText}>{firstName} {secondName} is {agee} years old and working as a {occupation} in {company}.</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        justifyContent:'center',
        alignItems:'center',
        height: "100%",
        paddingHorizontal: 20,
        backgroundColor: "#fff"
    },
    containerText:{
        textAlign:'center'
    }
})

export default Details