import React ,{Component} from 'react';
import { View,TextInput, TouchableHighlight } from 'react-native';
import styles from './style';
import FB from '../BackEnd/firebase';
import {StackNavigator , TabNavigator} from 'react-navigation';
import MainPage from './MainPage';
import History from './History';
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

export default class HomePage extends Component{
  render(){
    return(
      <Container>
        <Tabs initialPage={0}>
            <Tab
              heading={ <TabHeading><Feather name="user-check" size={22}/></TabHeading>}
              >
              <MainPage />
            </Tab>
            <Tab
              heading={ <TabHeading><MaterialCommunityIcons name="numeric" size={22}/></TabHeading>}
              >
              <History />
            </Tab>
            <Tab
              heading={ <TabHeading><FontAwesome name="commenting-o" size={22}/></TabHeading>}
              >
              <History />
            </Tab>
            <Tab
              heading={ <TabHeading><MaterialCommunityIcons name="history" size={22}/></TabHeading>}
              >
              <History />
            </Tab>
        </Tabs>
      </Container>
    );
  }
} ;
