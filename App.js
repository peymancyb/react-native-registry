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
    // Login : { screen: Login },
    // Register : { screen: Register },
    ListClasses : {screen: ListClasses},
    HomePage : {
      screen: HomePage,
      navigationOptions:{
        header:null,
      },
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
