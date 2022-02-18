import React, {useState} from 'react';

import {View, Text, StyleSheet, TouchableOpacity, Modal} from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import {FoodDetails, FoodImage} from "../../screens/Order";
import firebase from '../../firebase'
import {clear} from "react-native/Libraries/LogBox/Data/LogBoxData";
import { auth } from '../../firebase'
export default function Cart({navigation}) {
    const dispatch = useDispatch();
    const userName = auth.currentUser.email;

    const clearCart = () => dispatch({
        type: 'CLEAR_CART',
        payload: {}
    });

    const [modalVisible, setModalVisible] = useState(false);

    const {items, restaurantName} = useSelector((state) => state.cartReducer.selectedItems)

    const calculateTotalPrice = () => items
        .map((item) => Number(item.price))
        .reduce((prev, cur) => prev + cur, 0);
    const totalPriceFormatted = '$' + calculateTotalPrice();

    const addOrderToFirebase = () => {

        const db = firebase.firestore();

        db.collection('orders').add({
            userEmail: userName,
            items:items,
            restaurantName: restaurantName,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        })
        setModalVisible(false);
        navigation.navigate('Order', {
            navigation: navigation,
            items: items,
            restaurantName: restaurantName,
            totalPrice: totalPriceFormatted
        })
        clearCart();

    }

    const checkout = () => {
        return (
            <>
                <View style={{backgroundColor: 'rgba(0,0,0,0.7)', flex: 1}}>
                    <View style={{padding: 30, alignItems: 'center'}}>
                        <Text style={{color: 'white', fontSize: 25}}>{restaurantName}</Text>
                        {items.map((item, index) => (
                            <View key={index} style={{
                                flexDirection: 'row',
                                marginTop: 5,
                                borderWidth: 1,
                                borderColor: 'black',
                                borderRadius: 10,
                                paddingTop: 7,
                                paddingBottom: 7,
                                paddingLeft: 7,
                                backgroundColor: 'pink'
                            }}>
                                <FoodImage image={item.image_url}/>
                                <FoodDetails name={item.title} price={item.price}/>
                            </View>
                        ))}
                    </View>
                    <TouchableOpacity activeOpacity={1}
                                      style={{
                                          alignSelf: 'center',
                                          padding: 10,
                                          borderRadius: 10,
                                          backgroundColor: 'rgb(255, 247, 253)'
                                      }}
                                      onPress={() => addOrderToFirebase()}
                    >
                        <Text style={{
                            color: 'black',
                            fontWeight: 'bold',
                            fontSize: 20
                        }}>Checkout {totalPriceFormatted}</Text>
                    </TouchableOpacity>
                </View>
            </>
        )
    }
    return (
        <>
            <Modal animationType='slide' visible={modalVisible}
                   transparent={true}
                   onRequestClose={() => setModalVisible(false)}
            >
                {(checkout())}
            </Modal>
            {calculateTotalPrice() ?
                (<TouchableOpacity
                    activeOpacity={1} style={styles.cart}
                    onPress={() => setModalVisible(true)}
                >

                    <Text style={{color: 'black', textAlign: 'center', fontSize: 20, fontWeight: 'bold'}}>Cart</Text>
                    <Text style={{fontSize: 15}}>{totalPriceFormatted}</Text>
                </TouchableOpacity>) : (<></>)}
        </>
    )
}


const styles = StyleSheet.create({
    cart: {
        position: 'absolute',
        bottom: 0,
        alignSelf: 'center',
        width: 150,
        padding: 5,
        backgroundColor: 'pink',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderColor: 'black',
        borderRadius: 15,
        borderWidth: 2
    }
})
