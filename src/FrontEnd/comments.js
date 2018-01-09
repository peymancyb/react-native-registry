import React ,{Component} from 'react';
import {Text,View,TextInput, TouchableOpacity,FlatList } from 'react-native';
import styles from './style';
import FB from '../BackEnd/firebase';
import {StackNavigator , TabNavigator} from 'react-navigation';
import Register from './Register';
import {fbDatabaseNodeName} from './Classes';
import {MaterialCommunityIcons,EvilIcons} from '@expo/vector-icons';
import { Hoshi } from 'react-native-textinput-effects';
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
  SwipeRow,
} from 'native-base';


export default class Comments extends Component {
    constructor(props){
    super(props);
    this.state = {
      students_array: [],
      text:''
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
          <CardItem
            style={{borderColor:"transparent",borderWidth:0}}>
              <Body
                style={{flexDirection:"row",alignItems:"center",justifyContent:"center",paddingLeft:10}}>
                   <Hoshi
                      style={{width:"80%",backgroundColor:"white"}}
                      label={item.name+" "+item.last_name}
                      labelStyle={{ color: '#5067FF' }}
                      borderColor={'#5067FF'}
                      inputStyle={{ color: '#5067FF' }}
                      onChangeText={(txt)=>this.setState({text:txt})}
                    />

                   <TouchableOpacity
                      style={{flex:1,alignItems:"center",justifyContent:"center",borderWidth:1,borderColor:"#5067FF",paddingBottom:0,marginTop:5}}
                      onPress={() => console.log(item.name+" "+this.state.text)}>
                     <EvilIcons name="comment" size={32} color={"#5067FF"} />
                   </TouchableOpacity>
                 </Body>
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
