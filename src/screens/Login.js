import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import {Image, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native'
import { auth } from '../firebase'

const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigation = useNavigation()

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                navigation.replace("Home")
            }
        })

        return unsubscribe
    }, [])

    const handleSignUp = () => {
        auth
            .createUserWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log('Registered with:', user.email);
            })
            .catch(error => alert(error.message))
    }

    const handleLogin = () => {
        auth
            .signInWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log('Logged in with:', user.email);
            })
            .catch(error => alert(error.message))
    }

    return (
        <View style={{flex:1, backgroundColor:'rgb(255, 247, 253)'}}>
            <View style={{marginTop:50}}>
                <Image source={require('../assets/images/logo.png')}
                       style={{
                           width:180,
                           height:180,
                           alignSelf:'center',
                       }}
                />
                <Text style={{  textShadowColor: 'rgba(0, 0, 0, 0.75)',
                    textShadowOffset: {width: -1, height: 1},
                    textShadowRadius: 10,
                    fontSize:37,color:'pink', fontWeight:'bold', alignSelf:'center', paddingTop:10,
                fontFamily:'sans-serif-condensed', textAlign:'center'}}>My Lovely Interface</Text>
            </View>
            <KeyboardAvoidingView
                style={styles.container}

            >
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Email"
                        value={email}
                        onChangeText={text => setEmail(text)}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="Password"
                        value={password}
                        onChangeText={text => setPassword(text)}
                        style={styles.input}
                        secureTextEntry
                    />
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={handleLogin}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={handleSignUp}
                        style={[styles.button, styles.buttonOutline]}
                    >
                        <Text style={styles.buttonOutlineText}>Register</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>

    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        marginTop:25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        width: '80%'
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    button: {
        backgroundColor: 'pink',
        width: '100%',
        padding: 15,
        borderColor:'white',
        borderWidth:2,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonOutline: {
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: 'pink',
        borderWidth: 2,
    },
    buttonText: {
        color: 'black',
        fontWeight: '700',
        fontSize: 16,
        fontFamily:'sans-serif-condensed'
    },
    buttonOutlineText: {
        color: 'black',
        fontWeight: '700',
        fontSize: 16,
        fontFamily:'sans-serif-condensed'
    },
})
