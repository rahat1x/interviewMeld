import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useLayoutEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ActivityIndicator, StyleSheet, ScrollView, Platform, Button } from "react-native";
import useAuth, { AuthContext } from './hooks/useAuth';
import ChatScreen from './screens/ChatScreen';
import HomeScreen from './screens/HomeScreen';
import MobileNumberVerification from './screens/MobileNumberVerification';
import LoginScreen from './screens/LoginScreen';
import OtpEnterPage from './screens/OtpEnterPage';
import NamePage from './screens/NamePage';
import BdayDatePage from './screens/BdayDatePage';
import GenderPage from './screens/GenderPage';
import GenderPreference from './screens/GenderPreference';
import FoodProfile from './screens/FoodProfile';
import PetZodiacSigns from './screens/PetZodiacSigns'
import AddPictures from './screens/AddPictures';
import Match from './screens/MatchScreen'
import getMatchedUserInfo from './lib/getMatchedUserInfo'
import MatchScreen from './screens/MatchScreen';
import MessageScreen from './screens/MessageScreen';
import IntroScreen from './screens/IntroScreen';
import LivesIn from './screens/LivesIn'
import ProfilePage from './screens/ProfilePage';
import IncludePage from './screens/IncludePage'
import SettingReusableLayout from './components/SettingReusableLayout';
import Prompts from './screens/Prompts';
import Smoking from './screens/Smoking'
import SettingPreference from './screens/SettingPreference';
import EditProfile from './screens/EditProfile';
import SettingsPage from './screens/SettingsPage';
import PreferencesPage from './screens/PreferencesPage';
import Work from './screens/Work'
import Drinking from './screens/Drinking'
import Prompt1 from './screens/Prompt1';
import Prompt2 from './screens/Prompt2'
import Prompt3 from './screens/Prompt3';
import Prompt4 from './screens/Prompt4';
import Prompt5 from './screens/Prompt5';
import Prompt6 from './screens/Prompt6';
import Prompt7 from './screens/Prompt7';
import Prompt8 from './screens/Prompt8';
import Prompt9 from './screens/Prompt9';
import Prompt10 from './screens/Prompt10';
import Prompt11 from './screens/Prompt11';
import Profile from './screens/Profile';
import Contact from './screens/Contact';
import PromptReusableComponent from './components/PromptReusableComponent';
import Gender from './screens/Gender'
import Legal from './screens/Legal';
import Help from './screens/Help';
import { db, app } from './firebase';
import { getFirestore, setDoc, doc, getDocs, collection, getDoc, addDoc, Timestamp, query, onSnapshot, updateDoc } from 'firebase/firestore';
import { useEffect } from 'react';
import firebase from './firebase';
import "firebase/firestore";
import { async } from '@firebase/util';
//! must delete after testing
import Hometown from "./screens/Hometown"
import LookingFor from './screens/LookingFor';
import Education from './screens/Education';
import Pronouns from './screens/Pronouns';
import Height from './screens/Height';
import DrinkingProfile from './screens/DrinkingProfile';
import { useNavigation, useRoute } from '@react-navigation/native';
import HomeScreenTest from './screens/HomeScreenTest';
import ChatScreenMenu from './screens/ChatScreenMenu';
import GeneralProfile from './screens/GeneralProfile';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ScaledSheet, moderateVerticalScale } from 'react-native-size-matters';
import { useFonts, Montserrat_500Medium, } from '@expo-google-fonts/montserrat'
import { Righteous_400Regular } from '@expo-google-fonts/righteous'
import AppLoading from "expo-app-loading";
import { useRef } from 'react';
import UserProfile from './screens/UserProfile';
import { useContext } from 'react';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import * as Device from 'expo-device';
import ProgressLoader from 'rn-progress-loader';
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const StackNavigator = () => {
    const { user, userData, CurrentData } = useAuth();
    const [isLoginJourneyCompleted, setisLoginJourneyCompleted] = useState(false)
    const [tasks, setTasks] = useState([]);
    const [name, setName] = useState();
    const [dob, setDob] = useState();
    const [gender, setGender] = useState();
    const [otherGender, setOtherGender] = useState();
    const [genderpref, setGenderpref] = useState();
    const [foodProfile, setfoodProfile] = useState();
    const [petZodiacSigns, setPetZodiacSigns] = useState();
    const [addPictures, setaddPictures] = useState();
    const [isEditProfileCompleted, setisEditProfileCompleted] = useState(false)
    var LandToHome = false;
    let continueLoginJourney = "";
    const [Loading, setLoading] = useState(true);
    const navigation = useNavigation();
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();


    const FirebaseCall = async () => {
        setLoading(true)
        try {
            const pagesCompleted = doc(db, `/users/${user.uid}`);
            const test = await getDoc(pagesCompleted);
            setName(test.data().name)
            setDob(test.data().dateOfBirth)
            setGender(test.data().gender)
            setGenderpref(test.data().genderPreference)
            setfoodProfile(test.data().FoodieProfile)
            setPetZodiacSigns(test.data().PetZodiacSigns)
            setaddPictures(test.data().imageUrls)
            setOtherGender(test.data().includeGender)
            setisLoginJourneyCompleted(test.data().isLoginJourneyCompleted)
            setisEditProfileCompleted(test.data().isEditProfileCompleted)
        }
        catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        FirebaseCall()
            .then(() => {
                setLoading(false)
            })
            .catch((error) => {
                console.log('Loading Screen:', error.message)
                setLoading(false)
            })

    }, [user])
    if (isEditProfileCompleted == true) {
        continueLoginJourney = 'HomeTabs'
    }
    else if (isLoginJourneyCompleted == true) {
        continueLoginJourney = 'EditProfile'
    }
    else if (name == undefined || name == null) {
        continueLoginJourney = 'NamePage'
    }
    else if (dob == undefined || dob == null) {
        continueLoginJourney = 'BdayDatePage'
    }
    else if (gender == undefined || gender == null) {
        continueLoginJourney = 'GenderPage'
    }
    else if (gender == 'Others' && (otherGender == null || otherGender == undefined)) {
        continueLoginJourney = 'IncludePage'
    }
    else if (genderpref == undefined || genderpref == null) {
        continueLoginJourney = 'GenderPreference'
    }
    else if (GeneralProfile == undefined) {
        continueLoginJourney = 'GeneralProfile'
    }
    else if (addPictures == undefined || addPictures == null) {
        continueLoginJourney = 'AddPictures'
    }
    else {
        continueLoginJourney = 'HomeTabs'
        LandToHome = true
    }
    useEffect(() => {
        console.log("Push notifications Token started generating on Stack navigator ======================>")
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);

    async function registerForPushNotificationsAsync() {
        let token;

        if (Platform.OS === 'android') {
            await Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }

        if (Device.isDevice) {

            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!');
                return;
            }
            token = (await Notifications.getDevicePushTokenAsync()).data;
            console.log("The token is :", token)

            if (CurrentData.get("Device_Token") != token) {
                CurrentData.set("Device_Token", token);
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    updateDoc(doc(db, 'users', user.uid), {
                        Device_Token: token
                    })
                    console.log("Device tokenn updated to FIREBASE")
                    console.log("Device Token has been set in the local storage")
                }
            }


        } else {
            alert('Must use physical device for Push Notifications');
        }
        return token;

    }


    if (user && Loading) {
        return (
            <View>
                <View>
                    <ActivityIndicator />
                </View>
            </View>
        )
    }



    function HomeTabs() {

        let [fontsLoaded] = useFonts({
            Montserrat_500Medium,
            Righteous_400Regular,
        });


        if (!fontsLoaded) {
            return (
                <AppLoading />
            );
        }

        return (
            <Tab.Navigator initialRouteName='HomeScreen' screenOptions={{
                tabBarStyle: {
                    position: 'absolute',
                    elevation: -1,
                    backgroundColor: "#F9F9F9",
                    borderTopWidth: 1,
                    borderTopColor: "#00000030",
                    ...styles.navigator,
                    ...styles.shadow
                },
                tabBarShowLabel: false,
            }}>
                <Tab.Screen name="ProfilePage" component={ProfilePage} options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                            <Image source={require("./assets/Icons/profileIcon.png")}
                                resizeMode='contain'
                                style={{
                                    tintColor: focused ? "#674389" : "#D1CAD8", ...styles.icon
                                }} />
                        </View>
                    ),
                }

                }
                />
                <Tab.Screen name="HomeScreen" component={HomeScreen} options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                            <Image source={require("./assets/Icons/Home-unselected.png")}
                                resizeMode='contain'
                                style={{
                                    tintColor: focused ? "#674389" : "#D1CAD8", ...styles.icon
                                }} />
                        </View>
                    ),
                    // headerShown: true,
                    // title: 'meld.',
                    // headerStyle: {
                    //     backgroundColor: "#674389",
                    //     height: moderateVerticalScale(90, 0.9)
                    // },
                    // headerTitlStyle: {
                    //     fontFamily: "Righteous_400Regular",
                    //     color: "#F0D5ED",
                    //     fontSize: moderateVerticalScale(38, 0.2)
                    // },
                    // headerTitleAlign: 'center'
                }} />
                <Tab.Screen name="ChatScreen" component={ChatScreen} options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                            <Image source={require("./assets/Icons/chatIcon1.png")}
                                resizeMode='contain'
                                style={{
                                    tintColor: focused ? "#674389" : "#D1CAD8", ...styles.icon
                                }} />
                        </View>
                    ),
                    headerShown: true,
                    title: 'meld.',
                    headerStyle: {
                        backgroundColor: "#674389",
                    },
                    headerTitleStyle: {
                        fontFamily: "Righteous_400Regular",
                        color: "#F0D5ED",
                        fontSize: moderateVerticalScale(38, 0.2)
                    },
                    headerTitleAlign: 'center'
                }

                }
                />
            </Tab.Navigator>
        );
    }

    if (isEditProfileCompleted == true) {
        continueLoginJourney = 'HomeTabs'
    }
    else if (isLoginJourneyCompleted == true) {

        continueLoginJourney = 'EditProfile'
    }
    else if (name == undefined || name == null) {
        continueLoginJourney = 'NamePage'
    }
    else if (dob == undefined || dob == null) {
        continueLoginJourney = 'BdayDatePage'
    }
    else if (gender == undefined || gender == null) {
        continueLoginJourney = 'GenderPage'
    }
    else if (gender == 'Others' && (otherGender == null || otherGender == undefined)) {
        continueLoginJourney = 'IncludePage'
    }
    else if (genderpref == undefined || genderpref == null) {
        continueLoginJourney = 'GenderPreference'
    }
    else if (foodProfile == undefined) {
        continueLoginJourney = 'FoodProfile'
    }
    else if (petZodiacSigns == undefined) {
        continueLoginJourney = 'PetZodiacSigns'
    }
    else if (addPictures == undefined || addPictures == null) {
        continueLoginJourney = 'AddPictures'
    }
    else {
        continueLoginJourney = 'HomeTabs'
        LandToHome = true
    }

    if (user && Loading) {
        return (
            <View>
                <View>
                    <ActivityIndicator />
                </View>
            </View>
        )
    }

    return (
        <>
            <ProgressLoader visible={Loading} isModal={false} />
            <Stack.Navigator initialRouteName={continueLoginJourney}
                screenOptions={{
                    headerShown: false,
                    animation: 'slide_from_right'
                }}
            >
                {user ? (
                    <Stack.Group>
                        
                        <Stack.Screen name='NamePage' component={NamePage} />
                        <Stack.Screen name="BdayDatePage" component={BdayDatePage} />
                        <Stack.Screen name="GenderPage" component={GenderPage} />
                        <Stack.Screen name="IncludePage" component={IncludePage} />
                        <Stack.Screen name="GenderPreference" component={GenderPreference} />
                        <Stack.Screen name="GeneralProfile" component={GeneralProfile} />
                        <Stack.Screen name="AddPictures" component={AddPictures} />
                        <Stack.Screen name="HomeTabs" component={HomeTabs} />
                        <Stack.Screen name="MessageScreen" component={MessageScreen} />
                        <Stack.Screen name="UserProfile" component={UserProfile} />
                        <Stack.Screen name="EditProfile" component={EditProfile} />
                        <Stack.Screen name="FoodProfile" component={FoodProfile} />
                        <Stack.Screen name="PetZodiacSigns" component={PetZodiacSigns} />
                        <Stack.Screen name="Prompt1" component={Prompt1} />
                        <Stack.Screen name="Prompts" component={Prompts} />
                        <Stack.Screen name="Prompt2" component={Prompt2} />
                        <Stack.Screen name="Prompt3" component={Prompt3} />
                        <Stack.Screen name="Prompt4" component={Prompt4} />
                        <Stack.Screen name="Prompt5" component={Prompt5} />
                        <Stack.Screen name="Prompt6" component={Prompt6} />
                        <Stack.Screen name="Prompt7" component={Prompt7} />
                        <Stack.Screen name="Prompt8" component={Prompt8} />
                        <Stack.Screen name="Prompt9" component={Prompt9} />
                        <Stack.Screen name="Prompt10" component={Prompt10} />
                        <Stack.Screen name="Prompt11" component={Prompt11} />
                        <Stack.Screen name="PreferencesPage" component={PreferencesPage} />
                        <Stack.Screen name="SettingsPage" component={SettingsPage} />
                        <Stack.Screen name="SettingPreference" component={SettingPreference} />
                        <Stack.Screen name="LivesIn" component={LivesIn} />
                        <Stack.Screen name="Hometown" component={Hometown} />
                        <Stack.Screen name="Smoking" component={Smoking} />
                        <Stack.Screen name="LookingFor" component={LookingFor} />
                        <Stack.Screen name="Education" component={Education} />
                        <Stack.Screen name="Work" component={Work} />
                        <Stack.Screen name="Pronouns" component={Pronouns} />
                        <Stack.Screen name="Gender" component={Gender} />
                        <Stack.Screen name="Height" component={Height} />
                        <Stack.Screen name="Drinking" component={Drinking} />
                        <Stack.Screen name="DrinkingProfile" component={DrinkingProfile} />
                        <Stack.Screen name="Help" component={Help} />
                        <Stack.Screen name="Contact" component={Contact} />
                        <Stack.Screen name="Legal" component={Legal} />
                        <Stack.Screen name="ChatScreenMenu" component={ChatScreenMenu} />
                        <Stack.Screen options={{ presentation: 'transparentModal' }} name='Match' component={MatchScreen} />
                        <Stack.Screen name='Profile' component={Profile} />
                    </Stack.Group>
                ) : (
                    <Stack.Group key={3}>
                        <Stack.Screen name="IntroScreen" component={IntroScreen} />
                        <Stack.Screen name="LoginScreen" component={LoginScreen} />
                        <Stack.Screen name="MobileNumberVerification" component={MobileNumberVerification} />
                        <Stack.Screen name="OtpEnterPage" component={OtpEnterPage} />
                    </Stack.Group>
                )}


            </Stack.Navigator>



        </>
    );
};

export default StackNavigator;

const styles = ScaledSheet.create({
    shadow: {
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: -1,
        },
        shadowOpacity: 0.4,
        shadowRadius: 3.5,
        elevation: 2
    },
    navigator: {
        height: Platform.OS === 'ios' ? '70@vs' : '50@vs'
    },
    icon: {
        height: "35@s",
        width: "35@s",
    }
})