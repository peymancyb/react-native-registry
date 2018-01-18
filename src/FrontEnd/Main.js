import React ,{Component} from 'react';
import { View,TextInput, TouchableHighlight } from 'react-native';
import styles from './style';
import {StackNavigator , TabNavigator, TabBarTop} from 'react-navigation';
import MainPage from './MainPage';
import History from './History';
import Marks from './Marks';
import Comments from './comments';
import ProfileHistory from './profileHistory';
import {fbDatabaseNodeName} from './Classes';
import {MaterialCommunityIcons,Feather,FontAwesome} from '@expo/vector-icons';
import {
  Root
} from 'native-base';


 const MainTabs = TabNavigator({
  Registery:{
    screen:MainPage,
    paths:"/Registery",
    navigationOptions:{
      tabBarIcon: () => (<Feather name="user-check" size={22} color={"white"}/>),
    }
  },
  Marks:{
    screen: Marks,
    paths:"/Marks",
    navigationOptions:{
      tabBarIcon: ()=>(<MaterialCommunityIcons name="numeric" size={22} color={"white"}/>),
    }
  },
  Comments:{
    screen: Comments,
    paths:"/Comments",
    navigationOptions:{
      tabBarIcon: ()=>(<FontAwesome name="commenting-o" size={22} color={"white"}/>),
    }
  },
  History:{
    screen: History,
    paths:"/History",
    navigationOptions:{
      tabBarIcon: ()=>(<FontAwesome name="commenting-o" size={22} color={"white"}/>),
    }
  },
},{
  backBehavior:"none",
  tabBarComponent: TabBarTop,
  initialRouteName: 'Registery',
  tabBarPosition:"bottom",
  animationEnabled: false,
  swipeEnabled:false,
  tabStyle: {
      borderBottomWidth: 3,
      borderColor: 'white',
  },
  tabBarOptions:{
    showLabel: false,
    showIcon:true,
    indicatorStyle:{
      height:3,
      backgroundColor:"white",
    },
    style:{
      backgroundColor:"#0f6abc",
    },
    labelStyle:{
      color:"white",
    },
  },
});


const HomePage = StackNavigator({
  main:{
    screen:MainTabs,
  },
  profile:{
    screen:ProfileHistory,
    navigationOptions:{
      title:"history",
      headerTintColor:"white",
      headerTitleStyle: {
         textAlign: 'center',
         alignSelf: 'center',
       },
      headerStyle: {
         backgroundColor:"#0f6abc",
      },
    },
  },
},{
  headerMode: "none",
});

export default HomePage;
