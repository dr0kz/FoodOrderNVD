import React from 'react';

import {View, Text, StyleSheet} from 'react-native';
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import {GooglePlacesAutocomplete} from "react-native-google-places-autocomplete";


export default function SearchBar({cityHandler}) {
    return (
        <View style={{marginTop: 15, flexDirection: "row"}}>
            <GooglePlacesAutocomplete
                query={{key: 'AIzaSyChCFS2wgGhYeKW7s2SF0hQ0tJv29eOAvI'}}
                onPress={(data, details = null) => {
                    const city = data.description.split(',')[0];
                    cityHandler(city);
                }}
                placeholder="Search"
                styles={{
                    textInput: {
                        backgroundColor: "#eee",
                        borderRadius: 20,
                        fontWeight: "700",
                        marginTop: 10
                    },
                    textInputContainer: {
                        backgroundColor: "#eee",
                        borderRadius: 50,
                        flexDirection: "row",
                        alignItems: "center",
                        marginRight: 10
                    }
                }}
                renderLeftButton={()=>(
                    <View style={{marginLeft: 10}}>
                        <Ionicons name="location" size={24} />
                    </View>
                )}
                renderRightButton={() =>(
                    <View style={styles.rightButton}>
                        <Text>Search</Text>
                    </View>
                )}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    rightButton:{
        marginRight: 8,
        flexDirection:"row",
        backgroundColor: "white",
        padding: 9,
        borderRadius:30,
        alignItems:"center"
    }
})
