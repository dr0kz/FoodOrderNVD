import React, {useState} from 'react';

import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import MapView from 'react-native-maps';
import { Marker } from "react-native-maps";

export default function About({restaurant}) {

    const [mapVisibility, setMapVisibility] = useState(false);
    const region = {
        latitude: restaurant.coordinates.latitude,
        longitude: restaurant.coordinates.longitude,
        latitudeDelta: 0.025,
        longitudeDelta: 0.025,
    }
    return (
        <View>
            <RestaurantImage image={restaurant.image_url}/>
            <RestaurantDetails mapVisibility={mapVisibility} setMapVisibility={setMapVisibility}
                               properties={restaurant}/>
            {mapVisibility ? (<Map region={region} />) : <></>}
        </View>
    )
}
const Map = ({region}) => (
    <View style={{padding:10,borderColor:'purple', borderWidth: 1,marginTop:5,borderRadius:10}}>
        <MapView style={{width:'100%',height:180}}
         initialRegion={region}
        >
            <Marker coordinate={region} />
        </MapView>
    </View>

)
const RestaurantImage = ({image}) => (
    <View style={{marginTop: 10, position: 'relative'}}>
        <Image source={{
            uri: image
        }}
               style={{
                   borderColor: 'black',
                   borderWidth: 2,
                   width: '100%',
                   height: 180,
               }}
        />
    </View>
)
const RestaurantDetails = ({properties, mapVisibility, setMapVisibility}) => (
    <>
        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10}}>
            <Text style={{fontWeight: 'bold', fontSize: 20}}>{properties.name}</Text>
            <View>
                <TouchableOpacity activeOpacity={0.65}
                                  onPress={() => setMapVisibility(!mapVisibility)}
                >
                    <Ionicons style={{color: mapVisibility ? 'rgb(157, 112, 196)' : 'black'}} name="map" size={30}/>
                </TouchableOpacity>

            </View>
        </View>
        <View style={styles.details}>
            <View style={{flexDirection: 'row', alignItems: 'center',}}>
                <Text>{properties.rating}</Text>
                <Ionicons name="star" size={17}/>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text>{properties.review_count}</Text>
                <Ionicons name="checkmark-circle-outline" size={17}/>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text>{properties.phone}</Text>
                <Ionicons name="call" size={17}/>
            </View>
        </View>
    </>
)
const styles = StyleSheet.create({
    details: {
        backgroundColor: 'pink',
        borderWidth: 1,
        borderColor: 'black',
        padding: 2,
        flexDirection: 'row',
        marginTop: 5,
        justifyContent: 'space-evenly'
    }
})
