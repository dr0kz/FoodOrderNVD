import React from 'react';

import {View, Text, StatusBar} from 'react-native';
import About from "../components/RestaurantDetails/About";
import Food from "../components/RestaurantDetails/Food";
import Cart from "../components/RestaurantDetails/Cart";


export default function RestaurantDetails({route, navigation}) {
    return (
        <View style={{flex:1, marginTop:StatusBar.currentHeight, backgroundColor:'white'}}>
            <About restaurant={route.params.restaurant}/>
            <Food restaurantName={route.params.restaurant.name} />
            <Cart navigation={navigation}/>
        </View>
    )
}
