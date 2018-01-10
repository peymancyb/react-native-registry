import React ,{Component} from 'react';
import { View,TextInput, TouchableHighlight } from 'react-native';
import styles from './style';
import FB from '../BackEnd/firebase';
import {StackNavigator , TabNavigator, TabBarTop} from 'react-navigation';
import MainPage from './MainPage';
import History from './History';
import Marks from './Marks';
import Comments from './comments';
import ProfileHistory from './profileHistory';
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


 const MainTabs = TabNavigator({
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
  tabBarComponent: TabBarTop,
  initialRouteName: 'Registery',
  tabBarPosition:"bottom",
  animationEnabled: true,
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
      backgroundColor:"#5067FF",
    },
    labelStyle:{
      color:"white",
    },
  },
});


const TabNavigatorScreens = StackNavigator({
  main:{
    screen:MainTabs,
    navigationOptions:{
      header:null,
    },
  },
  profile:{
    screen:ProfileHistory,
    navigationOptions:{
      header:null,
    },

  },
},{
  header:null,
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
