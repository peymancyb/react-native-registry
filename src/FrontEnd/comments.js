import React ,{Component} from 'react';
import {Text,View,TextInput, TouchableHighligh,FlatList } from 'react-native';
import styles from './style';
import FB from '../BackEnd/firebase';
import {StackNavigator , TabNavigator} from 'react-navigation';
import Register from './Register';
import {fbDatabaseNodeName} from './Classes';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Icon,
  Card,
  CardItem,
  Footer,
  FooterTab,
  Button,
} from 'native-base';


export default class Comments extends Component {
    constructor(props){
    super(props);
    this.state = {
      students_array: [],
    };

    // this.currentUserUid = FB.auth().currentUser.uid;
    // this.itemsRef = FB.database().ref('user_classes/'+this.currentUserUid+'/class_list/'+fbDatabaseNodeName+'/studet_list');
    this.itemsRef = FB.database().ref('user_classes/'+"xuKDcv8itdPnUGhLHjvaWfVEptm2"+'/class_list/'+"First Class"+'/studet_list');
    this._renderItem = this._renderItem.bind(this);
    this.listenForItems = this.listenForItems.bind(this);
  }

  componentDidMount() {
    this.listenForItems(this.itemsRef);
  }
  // Fetch Students referance
  listenForItems(itemsRef) {
    itemsRef.on('value', (snap) => {
      var items = [];
      snap.forEach((child) => {
        items.push({
          id: child.key,
          name: child.val().name,
          last_name: child.val().last_name,
        });
      });
      this.setState({students_array: items });
    });
  }

  _renderItem({item}){
      return(
        <CardItem>
           <Body>
             <Text
               onPress={()=>console.log(`you have clicked on ${item.name}`)}
               style={{justifyContent:"center",alignItems:"center"}}>{item.name} {item.last_name}</Text>
           </Body>
           <Right>
             <Icon name="arrow-forward" />
           </Right>
         </CardItem>
      );
    }
  render() {
    return (
      <Container>
       <Content>
         <Card>
               <FlatList
                 style={styles.flatListStyle}
                 data = {this.state.students_array}
                 renderItem = {this._renderItem}
                 keyExtractor={item => item.name}
               />
        </Card>
       </Content>
     </Container>
    );
  }
}
