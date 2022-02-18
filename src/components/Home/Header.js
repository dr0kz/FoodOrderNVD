import React, {useEffect, useState} from 'react';

import {View, Text, StyleSheet, StatusBar, TouchableOpacity, Modal, Image, ScrollView} from 'react-native';
import {auth} from '../../firebase'
import {useNavigation} from "@react-navigation/core";

import firebase from '../../firebase';
import {Divider} from "react-native-elements/dist/divider/Divider";

export default function Header() {

    const userEmail = auth.currentUser?.email;
    const navigation = useNavigation()
    const [myOrdersVisible, setMyOrdersVisible] = useState(false);
    const [ordersArray, setOrdersArray] = useState([])

    //read orders
    firebase.firestore()
        .collection('orders')
        .where("userEmail","==",userEmail===undefined ? "" : userEmail)
        .get()
        .then(querySnapshot => {
            let array = [];
            querySnapshot.forEach(documentSnapshot => {
                array.push(documentSnapshot.data());
            });
            setOrdersArray(array);
        });

    const handleSignOut = () => {
        auth
            .signOut()
            .then(() => {
                navigation.replace("Login")
            })
            .catch(error => alert(error.message))
    }

    const myOrders = () => {
        return (
            <>
                <View style={{backgroundColor: 'rgba(0,0,0,0.7)', flex: 1}}>
                    <View style={{padding: 30, alignItems: 'center'}}>
                        <Text style={{textShadowColor: 'rgba(0, 0, 0, 0.75)',
                            textShadowOffset: {width: -1, height: 1},
                            textShadowRadius: 10,color: 'pink', fontSize: 27}}>My Orders</Text>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            {ordersArray.map((order, index) => (
                                <View style={{
                                    backgroundColor: 'pink', padding: 20, borderColor: 'white',
                                    borderWidth: 2,
                                    borderRadius: 10,
                                    marginTop: 20,
                                }}>
                                    <Text style={{alignSelf: 'center', color: 'black', fontSize: 17,}}>Order
                                        at {order.restaurantName}</Text>
                                    <View style={{marginTop: 10}}>
                                        {order.items.map((item, index) => (
                                            <View style={{marginTop: 10, flexDirection: 'row',}}>
                                                <Image source={{
                                                    uri: item.image_url
                                                }}
                                                       style={{
                                                           borderColor: 'black',
                                                           borderRadius: 10,
                                                           borderWidth: 2,
                                                           height: 55,
                                                           width: 55
                                                       }}
                                                />
                                                <Text style={{
                                                    width: 200,
                                                    padding: 10,
                                                    alignSelf: 'center',
                                                    justifySelf: 'center',
                                                    textAlign: 'center'
                                                }}>{item.title} ${item.price}</Text>
                                            </View>
                                        ))}
                                    </View>
                                    <Text style={{alignSelf: 'center', fontSize: 17, fontWeight: 'bold'}}>Total:
                                        ${order.items
                                            .map((item) => Number(item.price))
                                            .reduce((prev, cur) => prev + cur, 0)}</Text>
                                </View>

                            ))}
                        </ScrollView>


                    </View>
                </View>
            </>
        )
    }

    return (
        <>
            <Modal animationType='slide' visible={myOrdersVisible}
                   transparent={true}
                   onRequestClose={() => setMyOrdersVisible(false)}
            >
                {(myOrders())}
            </Modal>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => handleSignOut()}
                >
                    <Text style={styles.title}>Log out</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{borderWidth: 2, borderColor: 'black', padding: 5, borderRadius: 10}}
                    onPress={() => setMyOrdersVisible(true)}
                >
                    <Text style={{fontSize: 15, color: 'purple', alignSelf: 'center', fontWeight: 'bold'}}>My
                        orders</Text>
                </TouchableOpacity>
            </View>
        </>

    )
}
const styles = StyleSheet.create({
    header: {
        paddingTop: 10,
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: StatusBar.currentHeight,
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        fontSize: 15,
        color: 'purple',
        fontWeight: 'bold'
    }
})
