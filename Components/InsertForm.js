import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { React, useState, useRef } from 'react'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { addDoc, collection, getDoc, doc } from 'firebase/firestore';
import { db } from "../firebase-config";


const InsertForm = ({ navigation }) => {
    const ref_input2 = useRef();
    const ref_input3 = useRef();
    const ref_input4 = useRef();
    const ref_input5 = useRef();
    const [firstName, setFirstName] = useState("");
    const [secondName, setSecondName] = useState("");
    const [birthDate, setBirthDate] = useState("Select Date");
    const [occupation, setOccupation] = useState("");
    const [company, setCompany] = useState("");
    const studentsCollectionReff = collection(db, "students");

    const submitForm = () => {
        if (firstName === "" || secondName === "" || birthDate === "Select Date" || occupation === "" || company === "") {
            alert("Empty Field");
        }
        else {


            createUser();

        }
    }

    const createUser = async () => {
        let employee = { firstName: firstName, secondName: secondName, birthDate: birthDate, occupation: occupation, company: company }
        const { id } = await addDoc(studentsCollectionReff, employee);

        const userreff = doc(db, "students", id);

        getDoc(userreff).then((dat) => {

            setFirstName(dat.data().firstName);
            setSecondName(dat.data().secondName);
            setBirthDate(dat.data().birthDate);
            setOccupation(dat.data().occupation);
            setCompany(dat.data().company);
            
            navigation.navigate('Details', { firstName: firstName, secondName: secondName, birthDate: birthDate, occupation: occupation, company: company });
        })


    }
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        const dt = new Date(date);
        const x = dt.toISOString().split("T");
        const x1 = x[0].split("-");
        setBirthDate(x1[0] + '-' + x1[1] + '-' + x1[2]);
        hideDatePicker();
        ref_input4.current.focus();
    };
    return (
        <View style={styles.mainContainer}>
            <Text style={styles.mainHeader}>Enter Your Details</Text>

            <View style={styles.inputContainer}>
                <Text style={styles.labels}>Enter Your First Name</Text>
                <TextInput style={styles.inputStyle}
                    autoCapitalize="words"
                    returnKeyType="next"
                    onSubmitEditing={() => ref_input2.current.focus()}
                    onChangeText={(data) => setFirstName(data)}
                />
                <Text style={styles.labels}>Enter Your Second Name</Text>
                <TextInput style={styles.inputStyle}
                    autoCapitalize="words"
                    returnKeyType="next"
                    ref={ref_input2}
                    onSubmitEditing={() => showDatePicker()}
                    onChangeText={(data) => setSecondName(data)}
                />
                <Text style={styles.labels}>Enter Your Date of Birth</Text>


                <TouchableOpacity style={styles.inputStyle}
                    returnKeyType="next"
                    onPress={() => { showDatePicker() }}
                    ref={ref_input3}
                >
                    <Text style={styles.dateText}>{birthDate}</Text>
                </TouchableOpacity>
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                    maximumDate={new Date()} />



                <Text style={styles.labels}>Enter Your Occupation</Text>
                <TextInput style={styles.inputStyle}
                    autoCapitalize="words"
                    returnKeyType="next"
                    ref={ref_input4}
                    onSubmitEditing={() => ref_input5.current.focus()}
                    onChangeText={(data) => setOccupation(data)}
                />
                <Text style={styles.labels}>Enter Your Company Name</Text>
                <TextInput style={styles.inputStyle}
                    autoCapitalize="words"
                    returnKeyType="next"
                    ref={ref_input5}
                    onChangeText={(data) => setCompany(data)}
                />
            </View>
            <TouchableOpacity style={styles.buttonStyle} onPress={submitForm} >
                <Text style={styles.buttonText}>Submit Details</Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    mainContainer: {

        height: "100%",
        paddingHorizontal: 30,
        paddingTop: 30,
        backgroundColor: "#fff"
    },
    mainHeader: {
        fontSize: 28,
    },
    inputContainer: {
        marginTop: 20
    },
    labels: {
        fontSize: 18,
        color: "#7d7d7d",
        lineHeight: 25,
        marginTop: 10,
        marginBottom: 5,
    },
    inputStyle: {
        borderWidth: 1,
        borderColor: "rgba(0,0,0,0.3)",
        paddingHorizontal: 15,
        paddingVertical: 7,
        borderRadius: 3,
        fontSize: 18
    },
    buttonStyle: {
        marginTop: 30,
        borderWidth: 1,
        borderColor: "grey",
        paddingHorizontal: 15,
        paddingVertical: 7,
        borderRadius: 3,
        backgroundColor: "grey"
    },
    buttonText: {
        borderColor: "grey",
        paddingHorizontal: 15,
        paddingVertical: 7,
        fontSize: 18,
        textAlign: "center",
        color: "white",
    },
    dateText: {
        fontSize: 18,
        color: "#7d7d7d",
        lineHeight: 25,
        marginTop: 3,
        marginBottom: 1,
        textAlign: "center"
    }
});
export default InsertForm