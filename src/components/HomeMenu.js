import Home from "../screens/Home";
import Profile from "../screens/Profile";
import NewPost from "../screens/NewPost";

import {Foundation, Ionicons} from '@expo/vector-icons'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

function HomeMenu() {
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
		</Tab.Navigator>
	);
}

export default HomeMenu;
