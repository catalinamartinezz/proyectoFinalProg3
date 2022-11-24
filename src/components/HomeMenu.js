import React from 'react'

import Home from "../screens/Home";
import Profile from "../screens/Profile";
import NewPost from "../screens/NewPost";
import Search from "../screens/Search";


import {Foundation, Ionicons, AntDesign} from '@expo/vector-icons'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const Tab = createBottomTabNavigator();

export default function HomeMenu() {
  return (

	<Tab.Navigator>
			<Tab.Screen 
				name="Home" 
				component={Home} 
				options={{tabBarIcon:()=> <Foundation name="home" size={24} color="#FF884B"/>}}
			/>
			<Tab.Screen 
				name="Profile" 
				component={Profile} 
				options={{tabBarIcon:()=> <Ionicons name="person" size={24} color="#FF884B" />}}
			/>
			<Tab.Screen 
				name="NewPost" 
				component={NewPost} 
				options={{ tabBarIcon: () => <Foundation name="photo" size={24} color="#FF884B" /> }}
			/>
			<Tab.Screen 
				name="Search" 
				component={Search} 
				options={{ tabBarIcon: () => <AntDesign name="search1" size={24} color="#FF884B" />}}
			/>
		</Tab.Navigator>
  )
}
