import React from 'react';
import { StyleSheet, Text, View } from "react-native";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import Constant from 'expo-constants'
import { useNavigation, useTheme } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";



export default function Header() {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const {colors} = useTheme()
    const currentTheme = useSelector(state => {
        return state.MyDarkMode
    })
    const mycolor = colors.iconColor
    return (
        <View style={{
            marginTop: Constant.statusBarHeight,
            height:40,
            backgroundColor: colors.headerColor,
            flexDirection: "row",
            justifyContent: "space-between",
            elevation: 4,
            shadowOffset: {width: 10, height: 10},
            shadowColor: "black",
            shadowOpacity: 1.0
        }}>
            <View style={{
                flexDirection: 'row',
                margin: 5
            }}>
                <AntDesign 
                    style={{ marginLeft: 20}}
                    name="youtube" size={28} color="red" />
                <Text style={{
                    fontSize: 22,
                    marginLeft: 5,
                    color: mycolor,
                    fontWeight: "bold"
                }}>YouTube</Text>
            </View>
            <View style={{
                flexDirection: "row",
                justifyContent: "space-around",
                width: 150,
                margin: 5
            }}>
                <Ionicons name="md-videocam" size={32} color={mycolor} />
                <Ionicons name="md-search" size={32} color={mycolor} onPress={() => navigation.navigate('search')} />
                <MaterialIcons name="account-circle" size={32} color={mycolor} 
                    onPress={() => dispatch({type: "change_theme", payload:!currentTheme })}

                />
            </View>
        
        </View>
    )
}