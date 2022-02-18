import React from 'react';

import {View, Text, TouchableOpacity} from 'react-native';

export const sortingOption = ['review_count', 'rating']

export default function Sorting({sortOption, setSortOption}) {
    return (
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginTop:15}}>
            <SortButton sortOption={sortOption} setSortOption={setSortOption} text='Reviews' sortOptionName={'review_count'} />
            <SortButton sortOption={sortOption} setSortOption={setSortOption} text='Ratings' sortOptionName={'rating'} />
        </View>
    )
}
const SortButton = ({sortOptionName, setSortOption, sortOption, text}) => (
    <TouchableOpacity
        style={{backgroundColor: sortOptionName===sortOption ? 'black' : 'white', padding:8, borderRadius:10}}
    onPress={() => setSortOption(sortOptionName)}
    >
        <Text style={{color:sortOptionName===sortOption ? 'white' : 'black', fontSize:14, fontWeight: 'bold'}}>{text}</Text>
    </TouchableOpacity>
)
