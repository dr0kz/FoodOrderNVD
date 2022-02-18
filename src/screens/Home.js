import React, {useEffect, useState} from 'react';

import {View, Text, ScrollView, SafeAreaView} from 'react-native';
import Header from "../components/Home/Header";
import SearchBar from "../components/Home/SearchBar";
import {Divider} from "react-native-elements/dist/divider/Divider";
import Restaurants, {localRestaurants} from "../components/Home/Restaurants";
import Sorting from "../components/Home/Sorting";
import {sortingOption} from "../components/Home/Sorting";

export default function Home({navigation}) {

    const YELP_API_KEY = "2MmWWDWz6hPE7WYxtmfRDbaHJSu7zfCWq9lBKo-KGULdtn6zvf4N_7E1TavbZYNCdo5RKXHUl_kvAWMn3W6hfCgysgBYlvMlrD_HAKMjVdg1l3PhEHMjXOrFth7sYXYx";
    const [restaurantData, setRestaurantData] = useState(localRestaurants);
    const [city, setCity] = useState('Hollywood');

    const [sortOption, setSortOption] = useState(sortingOption[0]);

    const getRestaurantData = () => {
        const yelpUrl = `https://api.yelp.com/v3/businesses/search?term=restaurants&location=${city}`;
        const apiOptions = {
            headers: {
                Authorization: `Bearer ${YELP_API_KEY}`
            },
        }
        return fetch(yelpUrl, apiOptions)
            .then((res) => res.json())
            .then((json) => setRestaurantData(json.businesses.sort(function (a,b){
                return parseFloat(b[sortOption]) - parseFloat(a[sortOption]);
            })));

    }
    //call getRestaurantData() when the variable city is changed
    useEffect(() => {
        getRestaurantData();
    }, [city, sortOption])


    return (
        <SafeAreaView style={{flex: 1,  backgroundColor:'white'}}>
            <Header/>
            <SearchBar cityHandler={setCity}/>
            <Sorting sortOption={sortOption} setSortOption={setSortOption}/>
            <Divider style={{marginTop: 15}}/>
            <Restaurants restaurants={restaurantData} navigation={navigation}/>
        </SafeAreaView>
    )
}
