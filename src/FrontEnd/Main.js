import React ,{Component} from 'react';
import {Text, View,TextInput, TouchableHighlight } from 'react-native';
import styles from './style';
import FB from '../BackEnd/firebase';
import {StackNavigator , TabNavigator} from 'react-navigation';
import MainPage from './MainPage';
import History from './History';
import {fbDatabaseNodeName} from './Classes';


console.disableYellowBox = true;


const HomePage = TabNavigator({
  MainPage: { screen: MainPage },
  History: { screen: History },
},
  {
      tabBarPosition: 'top',
      swipeEnabled:true,
      animationEnabled:true,
      tabBarOptions: {
        tabStyle: {
            padding: 0, margin:0,
        },
      labelStyle: {
        fontSize:16,
        margin:0,
        padding:0,
        color: "#01b4df",
      },
      showLabel:true,
    },
  }
);



export default HomePage;
