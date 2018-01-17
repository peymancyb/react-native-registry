import React ,{Component,PureComponent} from 'react';
import {StackNavigator} from 'react-navigation';
import {useStrict} from 'mobx';
import Login from './src/FrontEnd/Login';
import Register from './src/FrontEnd/Register';
import HomePage from './src/FrontEnd/Main';
import ListClasses from './src/FrontEnd/Classes';

import { Root } from "native-base";

console.disableYellowBox = true;
useStrict(true);

const App = StackNavigator({
    Login : { screen: Login },
    Register : { screen: Register },
    ListClasses : {
      screen: ListClasses,
      navigationOptions:{
        title: "List of classes",
        headerBackTitle:"Classes",
        headerStyle:{
          backgroundColor: "#0f6abc",
        },
        headerTintColor: "white",
        gesturesEnabled: false,
        headerLeft: null,
      },
    },
    HomePage : {
      screen: HomePage,
      navigationOptions:{
        title:"Attendance",
        headerTintColor:"white",
        headerBackTitle:"Attendance",
        gesturesEnabled: false,
        headerStyle: {
           backgroundColor:"#0f6abc",
        },
      },
    },

},{
  mode: 'card',
  navigationOptions: {
    gesturesEnabled: false,
  },
});
//this page is all fine
export default () => {
  return(
  <Root>
   <App />
 </Root>
);
}
