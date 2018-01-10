import React ,{Component} from 'react';
import { View,TextInput, TouchableHighlight } from 'react-native';
import styles from './style';
import FB from '../BackEnd/firebase';
import {StackNavigator , TabNavigator} from 'react-navigation';
import MainPage from './MainPage';
import History from './History';
import Marks from './Marks';
import Comments from './comments';
import {fbDatabaseNodeName} from './Classes';
import {MaterialCommunityIcons,Feather,FontAwesome} from '@expo/vector-icons';
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Text,
  Body,
  Card,
  CardItem,
  Footer,
  FooterTab,
  Button,
  Tab,
  Tabs,
  TabHeading,
} from 'native-base';

console.disableYellowBox = true;

 const TabNavigatorScreens = TabNavigator({
  Registery:{
    screen:MainPage,
  },
  Marks:{
    screen: Marks,
  },
  Comments:{
    screen: Comments,
  },
  History:{
    screen: History,
  },
},{
  tabBarPosition:"bottom",
  swipeEnabled:false,
  tabBarOptions:{
    showLabel: false,
    showIcon:true,
    style:{
      backgroundColor:"#5067FF",
    },
    labelStyle:{
      color:"white",
    },
  },

});
// export default HomePage;
//
export default class HomePage extends Component{
  static navigationOptions = {
    title:"Registery",
    headerTintColor:"white",
     headerTitleStyle: {
        textAlign: 'center',
        alignSelf: 'center',
      },
     headerStyle: {
        backgroundColor:"#5067FF",
     },
  };

  render(){
    return(
      <TabNavigatorScreens/>
    );
  }
} ;

//
// <Container>
//   <Tabs
//     tabBarPosition={"bottom"}
//     tabBarUnderlineStyle={{backgroundColor:"white"}}
//     locked={true}
//     initialPage={0}
//     >
//       <Tab
//         heading={
//         <TabHeading style={{backgroundColor:"#5067FF",borderColor:"#5067FF",borderWidth:0}}><Feather name="user-check" size={22} color={"white"}/></TabHeading>}
//         >
//         <MainPage />
//       </Tab>
//       <Tab
//         heading={ <TabHeading style={{backgroundColor:"#5067FF",borderColor:"#5067FF",borderWidth:0}}><MaterialCommunityIcons name="numeric" size={22} color={"white"}/></TabHeading>}
//         >
//         <Marks />
//       </Tab>
//       <Tab
//         heading={ <TabHeading style={{backgroundColor:"#5067FF",borderColor:"#5067FF",borderWidth:0}}><FontAwesome name="commenting-o" size={22} color={"white"}/></TabHeading>}
//         >
//         <Comments />
//       </Tab>
//       <Tab
//         heading={ <TabHeading style={{backgroundColor:"#5067FF",borderColor:"#5067FF",borderWidth:0}}><MaterialCommunityIcons name="history" size={22} color={"white"}/></TabHeading>}
//         >
//         <History />
//       </Tab>
//
//   </Tabs>
// </Container>
