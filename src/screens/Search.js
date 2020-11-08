import React, { useState } from "react";
import { StyleSheet, Text, ActivityIndicator, View, TextInput, ScrollView, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MiniCard from "../components/MiniCard";
import { useSelector, useDispatch } from "react-redux";
import Constant from 'expo-constants'
import { useTheme } from "@react-navigation/native";

const SearchScreen = ({navigation}) => {
  const [value, setValue] = useState("");
 const [loading, setLoading] = useState(false)
  const {colors} = useTheme()
    const mycolor = colors.iconColor
  const dispatch = useDispatch()
  const MiniCardData = useSelector(state => {
    return state.cardData
  })  

  const fetchData = () => {
    setLoading(true)
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${value}&type=video&key=AIzaSyCGkjt-SpumzuH-xVfck80899jKYgLbL1k`)
    .then(res => res.json())
    .then(data => {
      setLoading(false)
      dispatch({type: "add", payload: data.items})
    })
  }
  return (
    <View style={{ flex: 1, marginTop: Constant.statusBarHeight }}>
      <View
        style={{
          padding: 5,
          flexDirection: "row",
          justifyContent: "space-around",
          elevation: 5,
          backgroundColor: colors.headerColor,
        }}
      >
        <Ionicons name="md-arrow-back" size={32} 
          onPress={() => navigation.goBack()}
          style= {{color: mycolor}}
        />
        <TextInput
          style={{ width: "70%", backgroundColor: "#e6e6e6" }}
          value={value}
          onChangeText={(text) => setValue(text)}
        />
        <Ionicons name="md-send" size={32} onPress={()=> fetchData()} style= {{color: mycolor}}/>
      </View>
      {loading ? <ActivityIndicator style={{marginTop: 10}} size="large" color="red"  /> : null}
      <FlatList 
        data={MiniCardData}
        renderItem={({item}) => {
          return <MiniCard 
            videoId={item.id.videoId}
            title={item.snippet.title}
            channel={item.snippet.channelTitle}
          
          />
        }}
      keyExtractor={item =>item.id.videoId}
      />
    </View>
  );
};

export default SearchScreen;
