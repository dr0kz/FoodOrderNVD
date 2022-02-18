import React from 'react';

import {View, Text, TouchableOpacity, StyleSheet, Image, ScrollView} from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";

export const localRestaurants = [
    {
        name: "Test1",
        image_url: "https://media-cdn.tripadvisor.com/media/photo-s/1a/18/3a/cb/restaurant-le-47.jpg",
        categories: ["Cafe", "Bar"],
        price: "$$",
        reviews: 1244,
        rating: 4.5
    },
    {
        name: "Test2",
        image_url: "data:image/jpeg;base64,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",
        categories: ["Cafe", "Bar"],
        price: "$$",
        reviews: 554,
        rating: 4.1
    },
    {
        name: "Test3",
        image_url: "https://media-cdn.tripadvisor.com/media/photo-s/1a/b8/46/6d/london-stock.jpg",
        categories: ["Cafe", "Bar"],
        price: "$$",
        reviews: 3000,
        rating: 4.9
    }
]
export default function Restaurants({restaurants, navigation}) {
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            {restaurants.map((restaurant, index) => (
                <TouchableOpacity
                    key={index}
                    activeOpacity={0.65}
                    style={{marginBottom:20}}
                    onPress={() => navigation.navigate('RestaurantDetails',{restaurant:restaurant})}
                >
                    <View style={{padding:15, backgroundColor:'rgb(255, 247, 253)'}}>
                        <RestaurantInfo name={restaurant.name}
                                        rating={restaurant.rating}
                                        review_count={restaurant.review_count}/>
                        <RestaurantImage image={restaurant.image_url}/>
                    </View>
                </TouchableOpacity>

            ))}
        </ScrollView>
    )
}
const RestaurantInfo = ({name, rating, review_count}) => (
    <>
    <View style={{
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'pink',
        borderRadius:10,
    }}>
        <Text style={{fontSize:18, fontWeight:'bold'}}>{name}</Text>
    </View>
    <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text>{rating}</Text>
            <Ionicons name="star" size={17}/>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text>{review_count}</Text>
            <Ionicons name="checkmark-circle-outline" size={17}/>
        </View>
    </View>
    </>
)
    const RestaurantImage = ({image}) => (
    <View style={{marginTop:10}}>
        <Image source={{
            uri: image
        }}
               style={{
                   borderRadius:15,
                   borderColor:'black',
                   borderWidth:2,
                   width:'100%',
                   height:180,
               }}
        />
    </View>
)

