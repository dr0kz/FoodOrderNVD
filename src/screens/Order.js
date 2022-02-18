import React from 'react';

import {View, Text, StatusBar, ScrollView, Image, TouchableOpacity} from 'react-native';



export default function Order({route, navigation}) {
    const cartItems = route.params.items;
    return (
        <View style={{backgroundColor:'rgb(255, 247, 253)',flex:1}}>
            <ScrollView style={{marginTop:StatusBar.currentHeight, padding:30}}>
                <OrderDetails restaurantName = {route.params.restaurantName} totalPrice={route.params.totalPrice} />
                <OrderedFood cartItems={cartItems}/>
            </ScrollView>
            <TouchableOpacity activeOpacity={1} style={{alignSelf:'center', backgroundColor:'pink',padding:10,
            borderWidth:2,borderColor:'black',borderRadius:15}}
            onPress={() => navigation.navigate('Home')}
            >
                <Text style={{fontWeight:'bold', fontSize:20}}>Back To Restaurants</Text>
            </TouchableOpacity>
        </View>

)
}

const OrderDetails = ({restaurantName, totalPrice}) => (
    <Text style={{fontSize:20,textAlign:'center', fontWeight:'bold'}}>Your order at {restaurantName}
        has been placed for {totalPrice}</Text>
)

const OrderedFood = ({cartItems}) => (
    <View style={{marginTop:10}}>
        {cartItems.map((item, index) => (
            <View key={index}>
                <View style={{flexDirection: 'row',marginTop:5,borderWidth:1,borderColor:'black',borderRadius:10, paddingTop:7,paddingBottom:7,paddingLeft:7,
                backgroundColor:'pink'}}>
                    <FoodImage image={item.image_url}/>
                    <FoodDetails name={item.title} price={item.price} />
                </View>
            </View>
        ))}
    </View>
)
export const FoodDetails = ({name, price}) => (
    <View style={{flexShrink:1,flex:1,padding:20, justifyContent: 'space-evenly', alignItems: 'center'}}>
        <Text style={{fontWeight:'bold', fontSize:15,textAlign:'center'}}>{name}</Text>
        <Text>${price}</Text>
    </View>
)
export const FoodImage = ({image}) => (
    <View>
        <Image source={{
            uri: image
        }}
               style={{
                   borderColor: 'black',
                   borderRadius:10,
                   borderWidth: 2,
                   height: 80,
                   width: 80
               }}
        />
    </View>
)
