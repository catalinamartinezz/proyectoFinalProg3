import Home from "../screens/Home";
import Profile from "../screens/Profile";
import NewPost from "../screens/NewPost";
import React, { Component } from 'react';

import {Foundation, Ionicons, AntDesign} from '@expo/vector-icons'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Search from "../screens/Search";

const Tab = createBottomTabNavigator();

export default class HomeMenu extends Component {
	constructor(props){
		super(props);
	}
	render(){
		console.log(this.props.route.params);
	return (
		<Tab.Navigator>
			<Tab.Screen 
				name="Home" 
				component={Home} 
				options={{tabBarIcon:()=> <Foundation name="home" size={24} color="#98A8F8"/>}}
			/>
			<Tab.Screen 
				name="Profile" 
				component={Profile} 
				options={{tabBarIcon:()=> <Ionicons name="person" size={24} color="#98A8F8" />}}
			/>
			<Tab.Screen 
				name="NewPost" 
				component={NewPost} 
				options={{ tabBarIcon: () => <Foundation name="photo" size={24} color="#98A8F8" /> }}
			/>
			<Tab.Screen 
				name="Search" 
				component={Search} 
				options={{ tabBarIcon: () => <AntDesign name="search1" size={24} color="#98A8F8" />}}
			/>
		</Tab.Navigator>
	);
	}
}


