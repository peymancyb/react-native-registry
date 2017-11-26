import {StackNavigator} from 'react-navigation';

import {useStrict} from 'mobx';

import Login from './src/FrontEnd/Login';
import Register from './src/FrontEnd/Register';
import HomePage from './src/FrontEnd/Main';
import ListClasses from './src/FrontEnd/Classes';


console.disableYellowBox = true;
useStrict(true);

export default StackNavigator({
    Login : { screen: Login },
    Register : { screen: Register },
    ListClasses : {screen: ListClasses},
    HomePage : { screen: HomePage },
});
//this page is all fine
