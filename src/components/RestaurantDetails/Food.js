import React from 'react';

import {View, Text, ScrollView, Image, TouchableOpacity} from 'react-native';
import {Divider} from "react-native-elements/dist/divider/Divider";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import {useDispatch, useSelector} from "react-redux";

const menu = [
    {
        image_url: 'https://healthyrecipesblogs.com/wp-content/uploads/2020/09/baked-drumsticks-featured-2021.jpg',
        title: 'Crispy-Skinned Baked Chicken Drumsticks',
        price: '22.70'
    },
    {
        image_url: 'https://www.jessicagavin.com/wp-content/uploads/2017/07/meat-lasagna-1200.jpg',
        title: 'Lasagna with Meat Sauce',
        price: '16.50'
    },
    {
        image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Espaguetis_carbonara.jpg/1200px-Espaguetis_carbonara.jpg',
        title: 'Carbonara',
        price: '18'
    },
    {
        image_url: 'https://realfood.tesco.com/media/images/RFO-1400x919-classic-chocolate-mousse-69ef9c9c-5bfb-4750-80e1-31aafbd80821-0-1400x919.jpg',
        title: 'Classic chocolate mousse',
        price: '11.50'
    },
    {
        image_url: 'https://cdn-rdb.arla.com/Files/arla-se/1776727224/0ec3cb10-58e6-4a3f-99de-193e9c1e5bb9.jpg?mode=crop&w=1200&h=630&scale=both&format=jpg&quality=80&ak=f525e733&hm=35af1404',
        title: 'Grekisk sallad',
        price: '10.50'
    },
    {
        image_url: 'https://food-images.files.bbci.co.uk/food/recipes/rib-eye_steak_with_61963_16x9.jpg',
        title: 'Rib-eye steak with bearnaise sauce',
        price: '32'
    }
]
export default function Food({restaurantName}) {
    const dispatch = useDispatch();
    const selectItem = (item, checkboxValue) => dispatch({
        type: 'ADD_TO_CART',
        payload: {...item, restaurantName:restaurantName, checkboxValue: checkboxValue}
    });
    const unselectItem = (item, checkboxValue) => dispatch({
        type: 'REMOVE_FROM_CART',
        payload: {...item, restaurantName:restaurantName, checkboxValue: checkboxValue}
    });

    const cartItems = useSelector((state) => state.cartReducer.selectedItems.items);
    const isFoodInCart = (food, cartItems) => Boolean(cartItems.find((item) => item.title === food.title))

    return (
        <>
            <ScrollView style={{padding: 15}} showsVerticalScrollIndicator={false}>
                {menu.map((food, index) => (
                    <View key={index}>
                        <View

                            style={{flexDirection: 'row',marginTop:10,paddingTop:7,paddingBottom:7,paddingLeft:7, backgroundColor:'rgb(255, 247, 253)'}}>
                            <FoodImage image={food.image_url}/>
                            <FoodDetails name={food.title} price={food.price} />
                            <BouncyCheckbox iconStyle={{borderColor: 'lightgray', borderRadius: 0}}
                                            onPress={(checkboxValue) => checkboxValue ? selectItem(food, checkboxValue)
                                            : unselectItem(food, checkboxValue)}
                                            isChecked={isFoodInCart(food, cartItems)}
                                            fillColor='purple'/>
                        </View>
                        <Divider style={{marginTop:10}} color='black'/>
                    </View>
                ))}
            </ScrollView>
        </>

    )
}
const FoodDetails = ({name, price}) => (
    <View style={{flexShrink:1,flex:1,padding:20, justifyContent: 'space-evenly', alignItems: 'center'}}>
        <Text style={{fontWeight:'bold', fontSize:15,textAlign:'center'}}>{name}</Text>
        <Text>${price}</Text>
    </View>
)
const FoodImage = ({image}) => (
    <View>
        <Image source={{
            uri: image
        }}
               style={{
                   borderColor: 'black',
                   borderRadius:10,
                   borderWidth: 2,
                   height: 135,
                   width: 135
               }}
        />
    </View>
)
